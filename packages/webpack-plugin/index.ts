
import { manifestFileName, PLUGIN_NAME } from '../common/constant'

declare namespace NameSpaceRouteResourcePreloadPlugin {
	type Pattern = string[];
	type Filter<T> = T | false | void | null;

	interface Asset {
		type: string;
		href: string;
	}

	type FileMap = Record<string, Asset[]>;

	interface Options {
		modulePreloadMap?: Record<string, Pattern>
		mfPreloadMap?: Record<string, Pattern>
		assetPreloadMap?: Record<string, Pattern>
		routes?: Record<string, Pattern> | ((input: string) => Filter<string>);
		assets?: Record<string, string> | ((filepath: string) => Filter<string>);
		headers?: true | ((files: Asset[], pattern: Pattern, filemap: FileMap) => any[]);
		filename?: string;
		minify?: boolean;
		publicPath?: string
		inline?: boolean
		exclude?: RegExp
	}
}

interface IRouteResourcePreloadPlugin {
	run(compilation: any): void;
	apply(compiler: any): void;
}

function toAsset(str: string) {
	if (/\.js$/i.test(str)) return 'script';
	if (/\.(svg|jpe?g|png|webp)$/i.test(str)) return 'image';
	if (/\.(woff2?|otf|ttf|eot)$/i.test(str)) return 'font';
	if (/\.css$/i.test(str)) return 'style';
	return false;
}

function toLink(
	assets: {href: string, type: string}[],
	//  _pattern, _filemap
	) {
	let value = '';
	assets.forEach(obj => {
		if (value) value += ', ';
		value += `<${obj.href}>; rel=preload; as=${obj.type}`;
		if (/^(font|script)$/.test(obj.type)) value += '; crossorigin=anonymous';
	});
	return [{ key: 'Link', value }];
}

function toFunction(val: boolean | Function | Record<string, any>) {
	if (typeof val === 'function') return val;
	if (typeof val === 'object') return (key: string) => val[key];
}

class RouteResourcePreloadPlugin implements IRouteResourcePreloadPlugin  {
	run: (compilation: any) => void;

	constructor(opts: NameSpaceRouteResourcePreloadPlugin.Options) {
		const { assets, headers, modulePreloadMap, mfPreloadMap, assetPreloadMap, exclude  } = opts || {};
		const { filename = manifestFileName, minify = true,  publicPath = '', inline = true } = opts || {};
		let { routes } = opts || {}

		if (!routes && !modulePreloadMap && !mfPreloadMap && !assetPreloadMap) {
			throw new Error('One of routes/modulePreloadMap/mfPreloadMap/assetPreloadMap mapping is required');
		}

		const modulePreloadKeys = modulePreloadMap ? Object.keys(modulePreloadMap) : []
		const mfPreloadKeys = mfPreloadMap ? Object.keys(mfPreloadMap) : []
		const assetsPreloadKeys = assetPreloadMap ? Object.keys(assetPreloadMap) : []

		try{
			if(!routes && modulePreloadKeys.length){
				routes =  (str) => {
					for(var index = 0; index < modulePreloadKeys.length; index++){
						const route = modulePreloadKeys[index]
						if(!(modulePreloadMap[route])){
							throw new Error(`404: ${route} Not Found， please check your router.`)
						}
						if(modulePreloadMap[route].includes(str)){
							return route
						}
					}
					return str
				}
			}
		} catch (e){
			throw new Error(e)
		}

		if(!routes){
			routes = (str) => str
		}

		const toRoute = toFunction(routes);
		const toHeaders = toFunction(headers) || headers === true && toLink;
		const toType = toFunction(assets) || toAsset;

		

		this.run = bundle => {
			const Pages = new Map();
			const Manifest: Record<string, any> = {};
			const Files: Record<string, {type: string, href: string}[]> = {};
			// const logger = bundle.getLogger(NAME);

			try{
				const bundleJson = bundle.getStats().toJson()
				const { chunks, modules } = bundleJson;

				chunks.forEach((chunk: any) => {
					const { id, files, origins, entry } = chunk;
					const origin = origins[0].request;
					const route = origin && !entry ? toRoute(origin) : '*';
					if (route) {
						Pages.set(id, {
							assets: new Set(files),
							pattern: route
						});
					}
				});

				modules.forEach((mod: {
					assets: string[]
					chunks: string[]
				}) => {
					mod.assets.forEach((asset: any) => {
						mod.chunks.forEach(id => {
							const tmp = Pages.get(id);
							if (tmp) {
								tmp.assets.add(asset);
								Pages.set(id, tmp);
							}
						});
					});
				});

				Pages.forEach(obj => {
					let tmp = Files[obj.pattern] = Files[obj.pattern] || [];

					obj.assets.forEach((str: string) => {
						let type = toType(str);
						let href = publicPath.endsWith('/') ? publicPath + str : `${publicPath}/${str}`
						if (type && (!exclude || !exclude.test(href))) tmp.push({ type, href });
					});
				});

				function write(data: Record<string, any>) {

					if(inline){
						const script = Files['*'].find(x => x.type === 'script');
						const assetPrefix = publicPath ? publicPath : '/'
						const assetKey = script.href.replace(assetPrefix, '')
						const asset = bundle.assets[assetKey]
						if(asset){
							let nxt = `window.__routerResourcePreloadManifest=${JSON.stringify(data)};`;
							nxt += asset.source();
							bundle.assets[assetKey] = {
								size: () => nxt.length,
								source: () => nxt
							};
						}
					}

					const str = JSON.stringify(data, null, minify ? 0 : 2);
					bundle.assets[filename] = {
						size: () => str.length,
						source: () => str
					};
				}


				const routes = Object.keys(Files);


				if(mfPreloadKeys.length && routes.length){
					mfPreloadKeys.forEach(key=>{
						routes.forEach(route=>{
							if(mfPreloadMap[key].includes(route) && (!exclude || !exclude.test(route))){
								if(! (Files[key] instanceof Array)){
									Files[key] = []
								}
								Files[key].push({type: 'mf', href: route})
								delete Files[route]
							}
						})
					})
				}

				if(assetsPreloadKeys.length && routes.length){
					assetsPreloadKeys.forEach(key=>{
						const preloadAssets = assetPreloadMap[key]?.filter(href=> (!exclude || !exclude.test(href)))?.map(href=>({type: toType(href), href}))
						if(Files[key] && preloadAssets instanceof Array){
							Files[key] = Files[key].concat(preloadAssets)
						}else{
							Files[key] = preloadAssets
						}
					})
				}
				

				if (!toHeaders) {
					write(Files)
				}else{
					routes.forEach(pattern => {
						const files = Files[pattern];
						const headers = toHeaders(files, pattern, Files) || [];
						Manifest[pattern] = { files, headers };
					});
					write(Manifest);
				}
			}catch(e){
				bundle.errors.push(new Error(e))
			}
		};
	}


	apply(compiler: any) {
		if (compiler.hooks !== void 0) {
			compiler.hooks.emit.tap(PLUGIN_NAME, this.run);
		} else {
			compiler.plugin('emit', this.run);
		}
	}
}

export default RouteResourcePreloadPlugin;
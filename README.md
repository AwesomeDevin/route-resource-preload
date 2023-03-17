# route-resource-preload 

🚀 Focus on improving the first screen loading speed of applications and providing the best user experience, like [the preloading of NextJS](https://web.dev/route-prefetching-in-nextjs/) . 

## Why do you need route-resource-preload ?
- Split modules, improving the first screen loading experience of your App. 
- Minimize dynamic component loading time and providing the best user experience.
- Support manually to preloading.
- Support automatic the preloading of resources ( JS / Component /  Module-Federation / UMD / Svg / Png , Etc) by route and providing the best user experience.
- Support typescript.

## [DEMO TEST](https://route-resource-preload.netlify.app/)
Component | Normal Load(ms) | Preload (ms)
--- | --- | ---
Simple Component (single-resource) | 100 | 1
Complex component (multi-resource) | 300 | 8

> It can be seen from the table that preloading significantly improves the loading speed of components, especially for complex components, the improvement of loading speed is more obvious. This shows that in complex business scenarios, `preloading can significantly improve page loading speed and user experience`.

## Install
```shell
npm install @route-resource-preload/webpack-plugin @route-resource-preload/react
```

## Using in react
#### Method 1 - Manual Preloading
```js
import { dynamic } from '@route-resource-preload/react'

const Image = dynamic({
  loader: () => import('Components'),
  loading: (props) => <>loading...</>,
})

const handleClick = () => {
  // Manual Preloading
  Image.preload()
}

export default function Main(props){
  return <div onClick={handleClick}>
    <Image {...props} />
  </div>
}
```

#### Method 2 - Automatic preloading by route.
Step 1: First, you need add **plugin** in your build config.
```js
const RouteResourcePreloadPlugin = require('@route-resource-preload/webpack-plugin')

webpack: {
  plugins: {
    add: [
      new RouteResourcePreloadPlugin({
        // project's components(modules), the key is route path
        modulePreloadMap: {
          "/A": ["../components/A"]
        },
        
        // module-federation's components(modules), the key is route path
        mfPreloadMap: {
          "/MF": ["ling_core/Components"]
        },
        
        // static assets (just like js/css/png/jpg/font, etc.), the key is route path
        assetPreloadMap: {
          "/A": ['https://domain.com/xxx.png']
        }
      })
    ]
  },
}
```

Step 2: **Dynamic** import component and render **PreloadLink** 
```js
import { dynamic, PreloadLink } from '@route-resource-preload/react'

// project's component
const ComponentA = dynamic({
  loader: ()=>import('../components/A'),
  loading: () => <>loading...</>
})

// module-federation's component
const Image = dynamic({
  loader: ()=>import('your_lib/Components'),
  loading: () => <>loading...</>,
  submodule: 'Image' // may be you didn't export default, just like " export { Image, ...Others } " in js.
})

export default function Main(props){
  return <>
    <PreloadLink to="/A"  onClick={()=>{navigate('/A')}} className="App-link">
      Preload Component A
    </PreloadLink>
    <PreloadLink to="/MF" className="App-link">
      <Link to="/MF" >Preload MF</Link>
    </PreloadLink>
  </>
}
```

## API

#### dynamic
Param | Description | Type | Default Value | necessary
---- | ---- | ---- | ---- | ---
loader | dynamic import module | () => Promise<FunctionComponent<any> / Record<string, FunctionComponent<any>>> | - | ✅
loading | A spinner for displaying loading state | FunctionComponent<any> | - | 
submodule | maybe you didn't export default, you need it | string | - | ❎

#### PreloadLink
> PreloadLink's publicPath param is the same as RouteResourcePreloadPlugin's publicPath param

Param | Description | Type | Default Value | necessary
---- | ---- | ---- | ---- | ---
to | route path to preload | string | - | ✅
children | children ReactNode | ReactNode | - | ✅
action | trigger preload action | <a href="#init--inview">string (init / inview)</a> | hover | ❎
onClick | PreloadLink click event | () => void | - | ❎
className | PreloadLink classname | string | - | ❎
publicPath | server publicPath | string | - | ❎


## Plugin

#### RouteResourcePreloadPlugin
> RouteResourcePreloadPlugin's publicPath param is the same as PreloadLink's publicPath param

Param | Description | Type | Default Value | necessary
---- | ---- | ---- | ---- | ---
modulePreloadMap | project's components(modules) | <a href="#modulepreloadmap-object">modulePreloadMap Object</a> | - | ❎
mfPreloadMap | module-federation's components(modules) | <a href="#mfpreloadmap-object">mfPreloadMap Object</a> | - | ❎
assetPreloadMap | static assets | <a href="#assetPreloadMap-object">assetPreloadMap Object</a> | - | ❎
publicPath | server publicPath | string | - | ❎


## Others

#### init / inview
Value | Description
--- | ---
init | Trigger preload after PreloadLink rendering 
inview | Trigger preload after PreloadLink in the view


#### modulePreloadMap Object
```js
{
  "/A": ["../components/A"],
  // [route-path]: ['your components path']
}
```

#### mfPreloadMap Object
```js
{
  "/MF": ["ling_core/Components"]
  // [route-path]: ['your components path']
}
```

#### assetPreloadMap Object
```js
{
  "/A": ['https://domain.com/xxx.png']
  // [route-path]: ['your assets link']
}
```



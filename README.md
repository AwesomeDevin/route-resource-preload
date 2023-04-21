# route-resource-preload - Any code can be split 

🚀 Focus on improving the first screen loading speed of applications and providing the best user experience, inspiration comes from [the preloading of NextJS](https://web.dev/route-prefetching-in-nextjs/). 

#### [中文文档](https://github.com/AwesomeDevin/route-resource-preload/blob/main/CHINESE-README.md)

## Comparison
<details>
<summary>Based-on-react.lazy-normal-loading-effect.gif</summary>
  
<br />
  
![](https://github.com/AwesomeDevin/route-resource-preload/blob/main/static/nornal-load.gif?raw=true)
</details>

<details open>
<summary>Based-on-route-resource-preload-effect.gif</summary>
  
<br />
  
![](https://github.com/AwesomeDevin/route-resource-preload/blob/main/static/preload.gif?raw=true)
</details>

As we can see from the gif, the display time of the loading component is greatly reduced by `route-resource-preload` relative to `react.lazy`.

## Why do you need route-resource-preload ?
- <a href="#dynamic---split-your-component-code-and-load-it-dynamically">`Split modules loads as needed`</a>, improving the first screen loading experience of your App. 
- `Minimize dynamic component loading time` and providing the best user experience.
- Support <a href="#preloadlink--automatic-the-preloading-of-resources">`automatic the preloading of resources`</a> ( JS / Component /  Module-Federation / UMD / Svg / Png , Etc) and providing the best user experience. 
- Support <a href="#method-1---manual-preloading">`manually to preload`</a>.
- Support `typescript`.
- Support <a href="#dynamic---split-your-component-code-and-load-it-dynamically">`React <Suspense>`</a>.

## Why route-resoure-preload over [react.lazy](https://react.dev/reference/react/lazy#lazy)?
`route-resource-preload` support `code splitting` of components, and support `automatic preloading` and `manual preloading` of components to avoid poor component interaction experience due to component rendering delays.
## Why route-resource-preload over [webpack-prefetch/preload and loadable-components-prefetch/preload](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules)?
- Control <a href="#init--inview">`when to preload in more detail`</a>
- Support preload <a href="#webpack-routeresourcepreloadplugin">`Module-Federation`</a>
- Support <a href="#webpack-routeresourcepreloadplugin">`More types`</a> of resource (image/font/svg/css/js/...)

## [Online Demo Test](https://route-resource-preload.netlify.app/)
Component | Normal Lazy Load(ms) | Preload (ms)
--- | --- | ---
Simple Component (one-resource) | 150 | 1
Complex Component (six-resource) | 350 | 10

> It can be seen from the table that preloading significantly improves the loading speed of components, especially for complex components, the improvement of loading speed is more obvious. This shows that in complex business scenarios, `preloading can significantly improve component loading speed and user experience`.

## [React Demo Source](https://github.com/AwesomeDevin/route-resource-preload/blob/main/demo/react-demo/src/router/index.tsx) 

## Install
```shell
npm install @route-resource-preload/webpack-plugin @route-resource-preload/react
```

## Using in react
#### Method 1 -  Manually To Preload Single Component Based on `**Dynamic**`
```js
import { dynamic } from '@route-resource-preload/react'

const Image = dynamic({
  loader: () => import('Components'),
  loading: (props) => <>loading...</>,
})

const handleClick = () => {
  // execute preloading
  Image.preload()
}

export default function Main(props){
  return <div onClick={handleClick}>
    <Image {...props} />
  </div>
}
```

#### Method 2 -  Manually To Preload Multiple Components
Step 1: First, you need add `**plugin**` in your build config.
```js
const RouteResourcePreloadPlugin = require('@route-resource-preload/webpack-plugin')

webpack: {
  plugins: {
    add: [
      new RouteResourcePreloadPlugin({
        // [the-preloading-flag]: ['path']

        // project's components(modules)
        modulePreloadMap: {
          "flagA": ["../components/A"]
        },
        
        // module-federation's components(modules)
        mfPreloadMap: {
          "flagMF": ["ling_core/Components"]
        },
        
        // static assets (just like js/css/png/jpg/font, etc.)
        assetPreloadMap: {
          "flagA": ['https://domain.com/xxx.png']
        }
      })
    ]
  },
}
```

Step 2: Create a `**Preloader**` and `**run**`
```js
import { Preloader } from '@route-resource-preload/react'

const preloader = new Preloader()

// execute preloading
preloader.run('flagA')
```

#### Method 3 - Automatic Preloading.
Step 1: First, you need add `**plugin**` in your build config.
```js
const RouteResourcePreloadPlugin = require('@route-resource-preload/webpack-plugin')

webpack: {
  plugins: {
    add: [
      new RouteResourcePreloadPlugin({
        // [the-preloading-flag]: ['path']

        // project's components(modules)
        modulePreloadMap: {
          "flagA": ["../components/A"]
        },
        
        // module-federation's components(modules)
        mfPreloadMap: {
          "flagMF": ["ling_core/Components"]
        },
        
        // static assets (just like js/css/png/jpg/font, etc.)
        assetPreloadMap: {
          "flagA": ['https://domain.com/xxx.png']
        }
      })
    ]
  },
}
```

Step 2: `**Dynamic**` import component and render `**PreloadLink**`
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
    <PreloadLink flag="flagA"  onClick={()=>{
      navigate('/A')   // navigate comes from react-router-dom, you can custom your code.
      }} 
    >
      Preload Component A
    </PreloadLink>
    <PreloadLink flag="flagMF">
      {/* Link comes from react-router-dom, you can custom your code. */}
      <Link to="flagMF" >Preload MF</Link>
    </PreloadLink>
  </>
}
```

## API

#### dynamic - Split your component code and load it dynamically

```js
const Modal = dynamic({
  loader: () => import('xxx/Modal'),
  // loading: () => <>loading...</>,
  // suspense: true,
  // submodule: 'submodule',
  // visible: true,
})
```

Param | Description | Type | Default Value | necessary
---- | ---- | ---- | ---- | ---
loader | dynamic import module | () => Promise<Record<string, T extends ComponentType<unknown>>>| - | ✅
loading | A spinner for displaying loading state | ComponentType<unknown> | - | ❌
submodule | maybe you didn't export default, you need it | string | - | ❌
visible | whether to render immediately after the components in the view are preloaded | boolean | true | ❌
suspense |  use react `<Suspense>` for displaying loading state | boolean | - | ❌

> `dynamic` will return a HOC with `onEnd` prop, which will call back after the component is dynamically rendered to adapt to complex and changeable business scenarios, such as custom loading package elements/or computing component rendering time-consuming, etc.

```js
function CommonLoading (props: { moduleName: string }) {
  const { moduleName } = props
  const [loading, setLoading] = useState(true)
  const Com = useMemo(()=>dynamic({ loader: () => import(`${moduleName}`)}),[moduleName])

  // custom loading
  return <Spin spinning={loading}>
    <Com onEnd={()=>{ setLoading(false)}}  />
  </Spin>
}

<CommonLoading moduleName={moduleName} />
```

#### Preloader - Manually to preload based on `flag`
```js
const preload = new Preloader(options)
preload.run('flag') 
```




#### PreloadLink - Automatic the preloading of resources based on `flag`
```js
<PreloadLink  flag="flagA"  >
  Preload Component
</PreloadLink>
```

Param | Description | Type | Default Value | necessary
---- | ---- | ---- | ---- | ---
flag | the preloading flag | string | - | ✅
children | children ReactNode | ReactNode | - | ✅
action | trigger preload action | <a href="#init--inview">string (init / inview / hover)</a> | hover | ❌
onClick | PreloadLink click event | () => void | - | ❌
className | PreloadLink classname | string | - | ❌
publicPath | yout server publicPath | string | - | ❌

> PreloadLink's `publicPath` is the same as RouteResourcePreloadPlugin's `publicPath`

## Plugin

#### Webpack-RouteResourcePreloadPlugin
> RouteResourcePreloadPlugin's `publicPath` is the same as PreloadLink's `publicPath`
```js
new RouteResourcePreloadPlugin({
  // [the-preloading-flag]: ['path']

  // project's components(modules)
  modulePreloadMap: {
    "flagA": ["../components/A"]
  },

  // module-federation's components(modules)
  mfPreloadMap: {
    "flagMF": ["xxx/Components"]
  },

  // static assets (just like js/css/png/jpg/font, etc.)
  assetPreloadMap: {
    "flagA": ['https://domain.com/xxx.png']
  }
})
```

Param | Description | Type | Default Value | necessary
---- | ---- | ---- | ---- | ---
modulePreloadMap | project's components(modules) | <a href="#modulepreloadmap-object">modulePreloadMap Object</a> | - | ❌
mfPreloadMap | module-federation's components(modules) | <a href="#mfpreloadmap-object">mfPreloadMap Object</a> | - | ❌
assetPreloadMap | static assets | <a href="#assetPreloadMap-object">assetPreloadMap Object</a> | - | ❌
publicPath | your server publicPath | string | - | ❌


## Others

#### init / inview
Value | Description
--- | ---
init | Trigger preload after PreloadLink rendering 
inview | Trigger preload after PreloadLink in the view
hover | Trigger preload after your mouse hover in the PreloadLink


#### modulePreloadMap Object
```js
{
  "flagA": ["../components/A"],
  // [the-preloading-flag]: ['your project's components path']
}
```

#### mfPreloadMap Object
```js
{
  "flagMF": ["ling_core/Components"]
  // [the-preloading-flag]: ['your module-federation's components path']
}
```

#### assetPreloadMap Object
```js
{
  "flagA": ['https://domain.com/xxx.png']
  // [the-preloading-flag]: ['your static assets link'] (image/font/svg/css/js/...)
}
```



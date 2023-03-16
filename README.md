# route-resource-preload 
[![Build Size](https://img.shields.io/bundlephobia/minzip/route-resource-preload?label=bundle%20size)](https://bundlephobia.com/result?p=route-resource-preload)
[![Version](https://img.shields.io/npm/v/route-resource-preload?style=flat)](https://www.npmjs.com/package/route-resource-preload)

🚀 Focus on improving the first screen loading speed of applications and providing the best user experience. 

## Why do you need route-resource-preload ?
- Split modules, improving the first screen loading experience of your App. 
- Minimize dynamic component loading time and improve user experience.
- Supports manually to preloading.
- Supports automatic the preloading of resources ( JS / Component / Module-Federation / Svg / Png , Etc) by route and providing the best user experience.
- Supports typescript.

## [DEMO](https://route-resource-preload.netlify.app/)

## Install
```shell
npm install route-resource-preload
```

## Using in react
#### Method 1 - Manual Preloading
```js
import { dynamic } from 'route-resource-preload/react'

const Image = dynamic({
  loader: () => import('Components'),
  loading: (props) => <>loading...</>,
})

// Manual Preloading
Image.preload()

export default function Main(props){
  return <Image {...props} />
}
```

#### Method 2 - Automatic preloading by route.
Step 1: first, you need add plugin in webpack
```js
const RouteResourcePreloadPlugin = require('route-resource-preload/webpack-plugin')

webpack: {
  plugins: {
    add: [
      new RouteResourcePreloadPlugin({
        // project's components, the key is route path
        modulePreloadMap: {
          "/A": ["../components/A"]
        },
        
        // module-federation's components, the key is route path
        mfPreloadMap: {
          "/MF": ["ling_core/Components"]
        },
        
        // static assets (just like js/css/png/jpg/font, etc.), the key is route path
        assetsPreloadMap: {
          "/A": ['https://img20.360buyimg.com/img/jfs/t1/86699/27/29562/39551/62bec631E155c7e41/55d63c89279226f0.png']
        }
      })
    ]
  },
}
```

Step 2
```js
import { dynamic, PreloadLink } from 'route-resource-preload/react'

// project's component
const ComponentA = dynamic({
  loader: ()=>import('../components/A'),
  loading: () => <>loading...</>
})

// module-federation's component
const Image = dynamic({
  loader: ()=>import('your_lib/Components'),
  loading: () => <>loading...</>,
  submodule: 'Image' // may be you export a object, just like " export { Image, ...Others } " in js.
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

#### PreloadLink


## Plugin

#### RouteResourcePreloadPlugin


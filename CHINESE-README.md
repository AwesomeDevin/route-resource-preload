# route-resource-preload 

🚀 专注于提升应用首屏加载速度，提供最佳用户体验，灵感来自[NextJS的预加载](https://web.dev/route-prefetching-in-nextjs/). 

## 为什么你需要 route-resource-preload ?
- 拆分模块按需加载，提升应用首屏加载体验.
- 尽最大努力地去缩短动态导入组件的加载时间以提供最佳交互体验.
- 支持自动预加载资源（JS / Component / Module-Federation / UMD / Svg / Png 等）.
- 支持手动调用预加载.
- 完备的 typescript 支持.

## [测试 DEMO](https://route-resource-preload.netlify.app/)
资源 | 正常加载(ms) | 预加载 (ms)
--- | --- | ---
简单组件 (单个资源文件) | 150 | 1
复杂组件 (6个资源文件) | 350 | 10

> 从表中可以看出，预加载显着提升了组件的加载速度，尤其是对于复杂的组件，加载速度的提升更为明显。 这说明在复杂的业务场景下，`预加载可以显着提升页面加载速度和用户体验`.

## Install
```shell
npm install @route-resource-preload/webpack-plugin @route-resource-preload/react
```

## 在 React 中使用，计划支持 Vue 中
#### 方法 1 - 手动调用预加载
```js
import { dynamic } from '@route-resource-preload/react'

const Image = dynamic({
  loader: () => import('Components'),
  loading: (props) => <>loading...</>,
})

const handleClick = () => {
  // 手动调用预加载
  Image.preload()
}

export default function Main(props){
  return <div onClick={handleClick}>
    <Image {...props} />
  </div>
}
```

#### Method 2 - 自动预加载.
Step 1: 首先，你需要添加 **plugin** 到你的构建配置中.
```js
const RouteResourcePreloadPlugin = require('@route-resource-preload/webpack-plugin')

webpack: {
  plugins: {
    add: [
      new RouteResourcePreloadPlugin({
        // [资源预加载唯一标志]: [你的资源路径]

        // 项目内组件
        modulePreloadMap: {
          "/A": ["../components/A"]
        },
        
        // module-federation 组件
        mfPreloadMap: {
          "/MF": ["ling_core/Components"]
        },
        
        // 静态资源 (例如 js/css/png/jpg/font, 等等)
        assetPreloadMap: {
          "/A": ['https://domain.com/xxx.png']
        }
      })
    ]
  },
}
```

Step 2: `dynamic` 导入组件并渲染 `<PreloadLink>`
```js
import { dynamic, PreloadLink } from '@route-resource-preload/react'

// 项目内组件
const ComponentA = dynamic({
  loader: ()=>import('../components/A'),
  loading: () => <>loading...</>
})

// 基于 module-federation 共享的组件
const Image = dynamic({
  loader: ()=>import('your_lib/Components'),
  loading: () => <>loading...</>,
  submodule: 'Image' // 也许你没有默认倒出模块, 就像这样的js " export { Image, ...Others } " .
})

export default function Main(props){
  return <>
    <PreloadLink flag="/A"  onClick={()=>{
      navigate('/A')   // navigate 来自 react-router-dom, 你可以自定义你的代码.
      }} 
    >
      Preload Component A
    </PreloadLink>
    <PreloadLink flag="/MF">
      {/* Link 来自 react-router-dom, 你可以自定义你的代码. */}
      <Link to="/MF" >Preload MF</Link>
    </PreloadLink>
  </>
}
```

## API

#### dynamic
参数 | 描述 | 类型 | 默认值 | 是否必须
---- | ---- | ---- | ---- | ---
loader | 动态加载组件 | () => Promise<FunctionComponent<any> / Record<string, FunctionComponent<any>>> | - | ✅
loading | 组件加载中状态时渲染 | FunctionComponent<any> | - | ❎
submodule | 如果你没有默认导出模块，你可能会需要它 | string | - | ❎
visible | 视图内组件预加载完成后是否立即渲染 (适用于 Modal、Popover 这一类预加载渲染完成但不需立即可见的组件) | boolean | true | ❎

#### PreloadLink
参数 | 描述 | 类型 | 默认值 | 是否必须
---- | ---- | ---- | ---- | ---
flag | 资源预加载唯一标志 | string | - | ✅
children | PreloadLink 组件子节点 | ReactNode | - | ✅
action | 触发预加载的时机 | <a href="#init--inview">string (init / inview)</a> | hover | ❎
onClick | PreloadLink 点击事件 | () => void | - | ❎
className | PreloadLink class | string | - | ❎
publicPath | 服务端的静态资源存储路径 | string | - | ❎

> PreloadLink 的 `publicPath` 参数与 RouteResourcePreloadPlugin's `publicPath` 参数报纸一致


## Plugin

#### Webpack-RouteResourcePreloadPlugin
参数 | 描述 | 类型 | 默认值 | 是否必须
---- | ---- | ---- | ---- | ---
modulePreloadMap | 预加载项目内组件映射 | <a href="#modulepreloadmap-object">modulePreloadMap Object</a> | - | ❎
mfPreloadMap | 预加载 module-federation 组件映射 | <a href="#mfpreloadmap-object">mfPreloadMap Object</a> | - | ❎
assetPreloadMap | 静态资源映射 | <a href="#assetPreloadMap-object">assetPreloadMap Object</a> | - | ❎
publicPath | 服务端的静态资源存储路径 | string | - | ❎

> PreloadLink 的 `publicPath` 参数与 RouteResourcePreloadPlugin's `publicPath` 参数报纸一致


## Others

#### init / inview
值 | 描述
--- | ---
init | PreloadLink 组件渲染后执行
inview | PreloadLink 出现在视图后执行


#### modulePreloadMap Object
```js
{
  "/A": ["../components/A"],
  // [预渲染唯一标志]: ['组件路径']
}
```

#### mfPreloadMap Object
```js
{
  "/MF": ["ling_core/Components"]
  // [预渲染唯一标志]: ['组件路径']
}
```

#### assetPreloadMap Object
```js
{
  "/A": ['https://domain.com/xxx.png']
  // [预渲染唯一标志]: ['资源路径']
}
```



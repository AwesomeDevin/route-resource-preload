# route-resource-preload - Any code can be split

🚀 route-resource-preload 目的是在不影响用户最佳体验的同时，提升应用首屏加载速度，灵感来自[NextJS的预加载](https://web.dev/route-prefetching-in-nextjs/). 


## 效果对比
<details>
<summary>基于 react.lazy 正常拆包并加载的效果.gif</summary> 
  
<br />
  
 
![](https://github.com/AwesomeDevin/route-resource-preload/blob/main/static/nornal-load.gif?raw=true)
</details>

<details open>
<summary>基于 route-resource-preload 组件拆包并预加载的效果.gif</summary>  

   
<br />
  
  
![](https://github.com/AwesomeDevin/route-resource-preload/blob/main/static/preload.gif?raw=true)
</details>

从 gif 中我们可以看到，相对于使用`react.lazy`，通过`route-resource-preload`预加载大大减少了组件加载时间。

## 为什么你需要 route-resource-preload ?
- <a href="#dynamic---拆分你的组件代码并进行动态加载">`拆分模块按需加载`</a>，提升应用首屏加载体验.
- `尽最大努力地去缩短动态导入组件的加载时间`（可以看作是 suspense loading 组件持续时间）以提供最佳交互体验.
- 支持<a href="#preloadlink---自动触发预加载">`自动预加载资源`</a>（JS / Component / Module-Federation / UMD / Svg / Png 等）.
- 支持<a href="#方法-1---手动调用预加载">`手动调用预加载`</a>.
- 支持`JS 函数拆包及预加载`.
- 支持`React <Suspense>`。
- 完备的 `typescript` 支持.

## 为什么选 route-resource-preload 而不是 [react.lazy](https://react.dev/reference/react/lazy#lazy)？
- `基于预加载，可以让 loading 持续时间降至最低，避免影响用户体验`:  `route-resource-preload` 在兼顾组件`代码分割`的同时，通过支持对组件的`自动预加载`及`手动预加载`，避免因为组件渲染延迟导致组件交互体验差(可以看作是 suspense loading 持续时间)。

## 为什么预加载要选 route-resource-preload 而不是 [webpack-prefetch/preload and loadable-components-prefetch/preload](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules)?

- 支持资源`分阶段预加载`（如基于路由按需加载）
- 可以<a href="#init--inview">`更细节(鼠标 hover 时加载、出现在视图内时加载、visible 时加载、页面初始化时加载)`</a>处控制何时进行资源预加载
- 支持预加载<a href="#webpack-routeresourcepreloadplugin">`Module-Federation`</a>
- 支持预加载更多<a href="#webpack-routeresourcepreloadplugint">`静态资源类型`</a>，你可以基于该方式（`assetPreloadMap`）控制 umd 等资源（js/css/font/image/...）预加载过程。

## [在线测试 DEMO](https://route-resource-preload.netlify.app/)
资源 | 正常加载(ms) | 预加载 (ms)
--- | --- | ---
简单组件 (单个资源文件) | 150 | 1
复杂组件 (6个资源文件) | 350 | 10

> 从表中可以看出，预加载显着提升了组件的加载速度，尤其是对于复杂的组件，加载速度的提升更为明显。 这说明在复杂的业务场景下，`预加载可以显着提升页面加载速度和用户体验`.

## [React Demo Source](https://github.com/AwesomeDevin/route-resource-preload/blob/main/demo/react-demo/src/router/index.tsx)

## Install
```shell
npm install @route-resource-preload/webpack-plugin @route-resource-preload/react
```

## 在 React 中使用
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


#### 方法 2 - 手动预加载多个组件
Step 1: 首先，你需要添加 **plugin** 到你的构建配置中.
  ```js
  const RouteResourcePreloadPlugin = require('@route-resource-preload/webpack-plugin')

  webpack: {
    plugins: {
      add: [
        new RouteResourcePreloadPlugin({
          // [资源预加载唯一标志]: [你的资源路径]

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

Step 2: 创建一个 `Preloader` 并 `run`
  ```js
  import { Preloader } from '@route-resource-preload/react'

  const preloader = new Preloader()

  // 执行预加载
  preloader.run('flagA')
  ```

#### 方法 3 - 自动预加载.
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

#### dynamic - 拆分你的组件代码，并进行动态加载
参数 | 描述 | 类型 | 默认值 | 是否必须
---- | ---- | ---- | ---- | ---
loader | 动态加载组件 | () => Promise<Record<string, T extends ComponentType<unknown>>> | - | ✅
loading | 组件加载中状态时渲染 | ComponentType<unknown> | - | ❌
submodule | 如果你没有默认导出模块，你可能会需要它 | string | - | ❌
visible | 视图内组件预加载完成后是否立即渲染 (适用于 Modal、Popover 这一类预加载渲染完成但不需立即可见的组件) | boolean | true | ❌
suspense | 是否使用 React `<Suspense>` 组件用于加载中状态渲染 | boolean | - | ❌

> `dynamic` 返回的高阶组件，携带了一个 `onEnd` prop，会在组件动态渲染完后进行回调，以适应复杂多变的业务场景，如自定义loading包裹元素/或计算组件渲染耗时等。

```js
function CommonLoading (props: { moduleName: string }) {
  const { moduleName } = props
  const [loading, setLoading] = useState(true)
  const Com = useMemo(()=>dynamic({ loader: () => import(`${moduleName}`)}),[moduleName])

  // 自定义loading包裹元素
  return <Spin spinning={loading}>
    <Com onEnd={()=>{ setLoading(false)}}  />
  </Spin>
}

<CommonLoading moduleName={moduleName} />
```

#### Preloader - 基于标识(flag)手动预加载
```js
const preload = new Preloader(options)

preload.run('flag') // webpack 插件中的预渲染唯一标识
```
参数 | 描述 | 类型 | 默认值 | 是否必须
---- | ---- | ---- | ---- | ---
publicPath |	服务端的静态资源存储路径 |	string |	-	 | ❌

> `Preloader` 的 `publicPath`参数与 `RouteResourcePreloadPlugin` 的 `publicPath` 参数往往一致

#### PreloadLink - 自动触发预加载
参数 | 描述 | 类型 | 默认值 | 是否必须
---- | ---- | ---- | ---- | ---
flag | 资源预加载唯一标志 | string | - | ✅
children | PreloadLink 组件子节点 | ReactNode | - | ✅
action | 触发预加载的时机 | <a href="#init--inview">string (init / inview / hover)</a> | hover | ❌
onClick | PreloadLink 点击事件 | () => void | - | ❌
className | PreloadLink class | string | - | ❌
publicPath | 服务端的静态资源存储路径 | string | - | ❌

> `PreloadLink` 的 `publicPath` 参数与 `RouteResourcePreloadPlugin` 的 `publicPath` 参数往往一致


## Plugin

#### Webpack-RouteResourcePreloadPlugin
参数 | 描述 | 类型 | 默认值 | 是否必须
---- | ---- | ---- | ---- | ---
modulePreloadMap | 预加载项目内组件映射 | <a href="#modulepreloadmap-object">modulePreloadMap Object</a> | - | ❌
mfPreloadMap | 预加载 module-federation 组件映射 | <a href="#mfpreloadmap-object">mfPreloadMap Object</a> | - | ❌
assetPreloadMap | 静态资源映射 | <a href="#assetPreloadMap-object">assetPreloadMap Object</a> | - | ❌
publicPath | 服务端的静态资源存储路径 | string | - | ❌

> PreloadLink 的 `publicPath` 参数与 RouteResourcePreloadPlugin's `publicPath` 参数报纸一致


## Others

#### init / inview
值 | 描述
--- | ---
init | PreloadLink 组件渲染后执行
inview | PreloadLink 出现在视图后执行
hover | 鼠标悬停在 PreloadLink 后触发预加载


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
  // [预渲染唯一标志]: ['资源路径'] (image/font/svg/css/js/...)
}
```


## 如果你有任何研发问题，可以加入此群进行技术交流 📖.
<img src="https://github.com/AwesomeDevin/AwesomeDevin/assets/22369504/d02c922a-1b3c-49ea-99de-d4891ff525d9" width="250" />


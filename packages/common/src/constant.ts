type TRoute = string

interface IModule {
  preload: ()=>Promise<unknown>
  loaded: boolean
}

interface ILoadMap {
  cache: Record<TRoute, boolean>
  module:  Record<string, IModule>
}

interface IGlobal {
  __routerResourcePreloadManifest?: Record<string, IFile[]>
}

export interface IFile {
  type: string
  href: string
}

export const loadMap: ILoadMap = {
  cache: {},
  module: {}
}

export const manifestFileName = 'route-resource-preload-manifest.json'

export const PLUGIN_NAME = 'webpack-route-resource-preload';

export const global: IGlobal = typeof window === 'undefined' ? {}  : window as IGlobal
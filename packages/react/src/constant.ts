type TRoute = string

interface IComponent {
  preload: ()=>Promise<unknown>
  loaded: boolean
}

interface ILoadMap {
  cache: Record<TRoute, boolean>
  component:  Record<string, IComponent>
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
  component: {}
}

export const manifestFileName = 'route-resource-preload-manifest.json'


export const global: IGlobal = typeof window === 'undefined' ? {}  : window as IGlobal
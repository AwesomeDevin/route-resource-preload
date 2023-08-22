

import { loadMap } from '../../common/constant'

interface IPrams<T, K> {
  loader: () => Promise<T>
  submodule?: K
  visible?: boolean
  suspense?: boolean
}

type TModule<T extends { default: any }, K extends keyof T = 'default'> = T extends Record<K, infer U> ? U : never


export default function dynamic<T extends { default: any },  K extends keyof T = 'default'>(params: IPrams<T, K>) {
  
  const { loader, submodule } = params


  let module: TModule<T, K>

  const functionStr = loader.toString()
  const matches = functionStr.match(/"([^"]*)"/)
  const id = matches ? matches[1].toLocaleLowerCase() : ''
  
  const load = () => {
    const promise = loader()
      .then((res) => {
        module = res[submodule] || res.default
        if(id && loadMap.module[id]){
          loadMap.module[id].loaded = true
        }
        return module
      })
      .catch((err: string) => {
        if(id && loadMap.module[id]){
          loadMap.module[id].loaded = true
        }
        return Promise.reject(err)
      })
    return promise
  }


  const preload = () => load()


  if(id && !['/','./'].includes(id)){
    loadMap.module[id] = {
      preload,
      loaded: loadMap.module[id]?.loaded || false
    }
  }  
  
  return Object.assign(load,{ preload })
}

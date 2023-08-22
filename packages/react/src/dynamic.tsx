
import { ComponentType, ComponentPropsWithRef, ReactElement, createElement, useEffect, useState } from 'react'

import { loadMap } from '../../common/constant'

interface ExoticComponent<P = {}> {
  /**
   * **NOTE**: Exotic components are not callable.
   */
  (props: P): (ReactElement|null);
}

interface IResMap<R> {
  component: ExoticComponent<ExoticComponent<R> & { onEnd?: ()=>void }> 
  util: () => Promise<R> 
}
interface IPrams<T, P, K> {
  loader: () => Promise<T>
  loading?: ComponentType<any>
  submodule?: K
  visible?: boolean
  suspense?: boolean
  type?: P
}

type TModule<T extends { default: any }, K extends keyof T = 'default'> = T extends Record<K, infer U> ? U : never


function resolve(obj: any) {
  return obj && obj.__esModule ? obj.default : obj
}

function render(target: ComponentType<any>, props: any) {
  return createElement(resolve(target), props)
}



export default function dynamic<T extends { default: any }, P extends keyof IResMap<T> = 'component', K extends keyof T = 'default'>(params: IPrams<T, P, K>) {
  
  const { loader, loading, submodule, visible = true, suspense} = params

  const type = (params.type || 'component') as P

  let module: TModule<T, K>

  const functionStr = loader.toString()
  const matches = functionStr.match(/"([^"]*)"/)
  const id = matches ? matches[1].toLocaleLowerCase() : ''

  function fetchData(): <F extends Promise<any>>(fn:F) => F extends Promise<infer U> ? U: never {
    let status = "pending"
    let data: any = null
    let promise: any = null
    return (fn) => {
      switch(status){
        case "pending": {
          const p = Promise.resolve(fn)
            .then(res => {
              status = "resolved"
              data = res
            })
            status = "loading"
            promise = p
            throw promise
        };
        case "loading": throw promise;
        case "resolved": return data;
        default: break;
      }
    }
  }
  
  const promiseFetch = fetchData()

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

  const suspenseDom = () => promiseFetch(load())

  if(id && !['/','./'].includes(id)){
    loadMap.module[id] = {
      preload,
      loaded: loadMap.module[id]?.loaded || false
    }
  }  

  const Component = (props: any) => {

    const { onEnd, ...rets } = props
    const [enable, setEnable] = useState( id && loadMap.module[id]?.loaded && module ? true : false)

    if(!visible){
      return <></>
    }


    useEffect(()=>{
      if(enable){
        onEnd && onEnd()
      }
    },[enable ])
    

    if(suspense && !enable){

      // @ts-ignore
      return render(suspenseDom(), rets)
    }
    
    useEffect(() => {
      if (!!loadMap.module[id]?.loaded && !!module && !enable) {
        setEnable(true)
      }else if(!enable){
        load().then(() => {
          setEnable(true)
        })
      }
    }, [])
    
    // @ts-ignore
    return enable ? render(module, rets) : loading ? createElement(loading, rets) : <></>
  }

  const res: IResMap<TModule<T, K>>= {
    component: Component,
    util: load
  }
  
  return Object.assign(res[type],{ preload })
}

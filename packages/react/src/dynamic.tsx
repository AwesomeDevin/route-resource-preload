
import { ComponentPropsWithRef, ComponentType, createElement, ReactElement, useEffect, useState } from 'react'

import { loadMap } from './constant'


interface IPrams<U extends string | number | symbol,  T extends unknown> {
  loader: () => Promise<{default: T }> | Promise<Record<U, unknown>>
  loading?: ComponentType<unknown>
  submodule?: U
  visible?: boolean
  suspense?: boolean
}

interface ExoticComponent<P = {}> {
  /**
   * **NOTE**: Exotic components are not callable.
   */
  (props: P): (ReactElement|null);
}

type TPreloadComponent<T extends ComponentType<any>> = ExoticComponent<ComponentPropsWithRef<T> & {onEnd?: ()=>void}> & { preload: () => Promise<T> } 

type TPreloadModule<T> = (() => Promise<T>) & { preload:  () => Promise<T> }

function resolve(obj: any) {
  return obj && obj.__esModule ? obj.default : obj
}

function render(target: ComponentType<any>, props: any) {
  return createElement(resolve(target), props)
}



export default function dynamic<U extends string | number | symbol, T extends unknown>(params: IPrams<U, T>): T extends ComponentType<any> ? TPreloadComponent<T> : TPreloadModule<T> {
  const { loader, loading, submodule, visible = true, suspense } = params

  let module: T 

  const functionStr = loader.toString()
  const matches = functionStr.match(/"([^"]*)"/)
  const id = matches ? matches[1].toLocaleLowerCase() : ''

  function fetchData(): <T extends Promise<any>>(fn:T) => T extends Promise<infer U> ? U: never {
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
        //@ts-ignore
        module = submodule ? resolve(res[submodule]) : resolve(res)
        if(id){
          loadMap.component[id].loaded = true
        }
        return module
      })
      .catch((err: string) => {
        if(id){
          loadMap.component[id].loaded = true
        }
        throw new Error(err)
      })
    return promise
  }


  const preload = () => load()

  const suspenseDom = () => promiseFetch(load())

  if(id){
    loadMap.component[id] = {
      preload,
      loaded: loadMap.component[id]?.loaded || false
    }
  }  


  const Component = (props: any) => {

    const { onEnd, ...rets } = props
    const [enable, setEnable] = useState( id && loadMap.component[id]?.loaded && module ? true : false)

    if(!visible){
      return <></>
    }


    useEffect(()=>{
      if(enable){
        onEnd && onEnd()
      }
    },[enable ])
    

    if(suspense && !enable){
      
      return render(suspenseDom as ComponentType<any>, rets)
    }
    
    useEffect(() => {
      if (!!loadMap.component[id]?.loaded && !!module && !enable) {
        setEnable(true)
      }else if(!enable){
        load().then(() => {
          setEnable(true)
        })
      }
    }, [])
    
    return enable ? render(module as ComponentType<any>, rets) : loading ? render(loading, rets) : <></>
  }

  return Object.assign(Component, { preload }) as T extends ComponentType<any> ? TPreloadComponent<T> : never
}

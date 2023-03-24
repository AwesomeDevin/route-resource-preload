
import { ComponentPropsWithRef, ComponentType, createElement, ReactElement, useCallback, useEffect, useState } from 'react'

import { loadMap } from './constant'


interface IPrams<T extends unknown> {
  loader: () => Promise<Record<string, T>>
  loading?: ComponentType<unknown>
  submodule?: string
  visible?: boolean
  suspense?: boolean
  type?: 'component' | 'js-lib'
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



export default function dynamic<T extends unknown>(params: IPrams<T>): T extends ComponentType<any> ? TPreloadComponent<T> : TPreloadModule<T> {
  const { loader, loading, submodule, visible = true, suspense, type = 'component' } = params

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
        module = submodule ? res[submodule] : res
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

  if(id){
    loadMap.component[id] = {
      preload,
      loaded: loadMap.component[id]?.loaded || false
    }
  }  

  // if(type === 'js-lib'){
  //   return Object.assign(load, { preload }) as T extends ComponentType<any> ? never : TPreloadModule<T>
  // }


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
    

    const suspenseDom = useCallback(()=>promiseFetch(load()),[]) as () => T extends ComponentType<any> ? ComponentType<any> : never
    if(suspense && !enable){
      return render(suspenseDom(), rets)
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
    return enable ? render(module as  ComponentType<any>, rets) : loading ? createElement(loading, rets) : <></>
  }
  return Object.assign(Component, { preload }) as T extends ComponentType<any> ? TPreloadComponent<T> : never
}

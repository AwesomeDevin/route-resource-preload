
import { ComponentPropsWithRef, ComponentType, createElement, ReactElement, useEffect, useState } from 'react'

import { loadMap } from './constant'

interface IPrams<T extends ComponentType<any>> {
  loader: () => Promise<Record<string, T>>
  loading?: ComponentType<any>
  submodule?: string
  visible?: boolean
  suspense?: boolean
}

interface ExoticComponent<P = {}> {
  /**
   * **NOTE**: Exotic components are not callable.
   */
  (props: P): (ReactElement|null);
}

function resolve(obj: any) {
  return obj && obj.__esModule ? obj.default : obj
}

function render(target: ComponentType<any>, props: any) {
  return createElement(resolve(target), props)
}



export default function dynamic<T extends ComponentType<any>>(params: IPrams<T>): ExoticComponent<ComponentPropsWithRef<T> & {onEnd?: ()=>void}> & { preload: () => void}  {
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
        module = submodule ? res[submodule] : res
        if(id && loadMap.component[id]){
          loadMap.component[id].loaded = true
        }
        return module
      })
      .catch((err: string) => {
        if(id && loadMap.component[id]){
          loadMap.component[id].loaded = true
        }
        throw new Error(err)
      })
    return promise
  }


  const preload = () => load()

  const suspenseDom = () => promiseFetch(load())

  if(id && !['/','./'].includes(id)){
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
    
    return enable ? render(module, rets) : loading ? createElement(loading, rets) : <></>
  }

  return Object.assign(Component, { preload })
}

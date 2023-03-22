
import { ComponentPropsWithRef, ComponentType, createElement, ReactElement, useEffect, useLayoutEffect, useState } from 'react'

import { loadMap } from './constant'

interface IPrams<T> {
  loader: () => Promise<{ default: T }>
  loading?: ComponentType<any>
  submodule?: string
  visible?: boolean
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

export default function dynamic<T extends ComponentType<any>>(params: IPrams<T>): ExoticComponent<ComponentPropsWithRef<T> & {onEnd: ()=>void}> & { preload: () => void}  {
  const { loader, loading, submodule, visible = true } = params

  let module: T

  const functionStr = loader.toString()
  const matches = functionStr.match(/"(\w*)"/)
  const id = matches ? matches[1].toLocaleLowerCase() : ''

  const load = () => {
    const promise = loader()
      .then((res) => {
        //@ts-ignore
        module = submodule ? res[submodule] : res
        if(id){
          loadMap.component[id].loaded = true
        }
        return res
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
      loaded: false
    }
  }  

  const Component = (props: any) => {

    const { onEnd, ...rets } = props
    const [enable, setEnable] = useState( id && loadMap.component[id]?.loaded ? true : false)

    if(!visible){
      return <></>
    }
    
    useEffect(() => {
      if (!loadMap.component[id]?.loaded || !module) {
        load().then(() => {
          setEnable(true)
        })
      } else if (!!loadMap.component[id]?.loaded && !!module && !enable) {
        setEnable(true)
      }
    }, [])


    useLayoutEffect(()=>{
      if(enable ){
        onEnd && onEnd()
      }
    },[enable ])
    
    return enable ? render(module, rets) : loading ? createElement(loading, rets) : <></>
  }

  return Object.assign(Component, { preload })
}

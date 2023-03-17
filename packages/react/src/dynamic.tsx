import { createElement, FunctionComponent, useEffect, useLayoutEffect, useMemo, useState } from 'react'

import { loadMap } from './constant'

interface IPrams {
  loader: () => Promise<FunctionComponent<any> | Record<string, FunctionComponent<any>>>
  loading?: FunctionComponent<any>
  submodule?: string
}

function resolve(obj: any) {
  return obj && obj.__esModule ? obj.default : obj
}

function render(target: FunctionComponent<any>, props: any) {
  return createElement(resolve(target), props)
}

export default function dynamic(params: IPrams) {
  const { loader, loading, submodule } = params

  let module: FunctionComponent<any>

  const functionStr = loader.toString()
  const matches = functionStr.match(/"(\w*)"/)
  const id = matches ? matches[1].toLocaleLowerCase() : ''

  

  const load = () => {
    console.log(id,'load')
    const promise = loader()
      .then((res: FunctionComponent<any> | Record<string, FunctionComponent<any>>) => {
        //@ts-ignore
        module = submodule ? res[submodule] : res 
        loadMap.component[id].loaded = true
        return res
      })
      .catch((err: string) => {
        loadMap.component[id].loaded = true
        throw new Error(err)
      })
    return promise
  }


  const preload: () => Promise<FunctionComponent<any> | Record<string, FunctionComponent<any>>> = () => load()

  if(id){
    loadMap.component[id] = {
      preload,
      loaded: false
    }
  }

  const Component = (props: any) => {
    const [enable, setEnable] = useState( id && loadMap.component[id].loaded ? true : false)

    const { onEnd, ...rets } = props

    useEffect(() => {
      if (!loadMap.component[id].loaded || !module) {
        load().then(() => {
          setEnable(true)
        })
      } else if (!!loadMap.component[id].loaded && !!module && !enable) {
        setEnable(true)
      }
    }, [])


    useLayoutEffect(()=>{
      if(enable ){
        onEnd && onEnd()
      }
    },[enable ])

    return enable ? render(module, rets) : loading ? createElement(loading, rets) : null
  }

  return Object.assign(Component, { preload })
}

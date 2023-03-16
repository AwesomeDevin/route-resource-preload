import { createElement, FunctionComponent, useEffect, useLayoutEffect, useState } from 'react'

import { loadMap } from '../constant'

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

  let loaded = false
  let module: FunctionComponent<any>

  const functionStr = loader.toString()
  const matches = functionStr.match(/"(\w*)"/)
  const id = matches ? matches[1] : ''

  const load = () => {
    const promise = loader()
      .then((res: FunctionComponent<any> | Record<string, FunctionComponent<any>>) => {
        loaded = true
        //@ts-ignore
        module = submodule ? res[submodule] : res 
        return res
      })
      .catch((err: string) => {
        loaded = true
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
    const [enable, setEnable] = useState( id ? loadMap.component[id] : false)

    const { onEnd, ...rets } = props

    useEffect(() => {
      if (!loaded) {
        load().then(() => {
          setEnable(true)
        })
      } else if (!!loaded && !!module) {
        setEnable(true)
      }
    }, [])

    useLayoutEffect(()=>{
      if(enable && module ){
        onEnd && onEnd()
      }
    },[enable && module ])

    return enable && module ? render(module, rets) : loading ? createElement(loading, rets) : null
  }

  return Object.assign(Component, { preload })
}

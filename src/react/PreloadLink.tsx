import { createElement, useCallback, useEffect, useRef, useState, FunctionComponent, useMemo } from 'react'

import { loadMap } from '../constant'
interface IProps {
  to: string
  children: React.ReactNode
  basename?: string
  onClick?: ()=>void
  filename?: string
  action?: 'init' | 'inview'
  className: string
}

interface IFile {
  type: string
  href: string
}


declare global{
  interface Window {
    routerResourceManifest: any
  }
}


export default function PreloadLink(props: IProps) {
  const { to, children,  basename = '', onClick, filename = 'route-resource-manifest.json', action, className } = props


  const [preload, setPreload] = useState(false)
  const [inview, setInview] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [preloadFiles, setPreloadFiles] = useState<IFile[]>([])
  const ref = useRef<HTMLAnchorElement>(null)

  const checkComponentKeys = (href: string, type: 'script' | 'mf')=>{
    const componentKeys = Object.keys(loadMap.component)
    if(type === 'script'){
      for(let index = 0;index < componentKeys.length; index++){
        const key = componentKeys[index]
        if(href.match(key)){
          loadMap.component[key].preload().then(()=>{
            loadMap.component[key].loaded = true
          })
          break
        }
      }
    }else if(type === 'mf'){
      for(let index = 0;index < componentKeys.length; index++){
        const key = componentKeys[index]
        if(key.match(href)){
          loadMap.component[key].preload().then(()=>{
            loadMap.component[key].loaded = true
          })
          break
        }
      }
    }
  }

  const init = useCallback(() => {
    if (!preloadFiles.length) return

    const appendLink = (href: string, type: string) => {
      if(loadMap.cache[href]) return
      loadMap.cache[href] = true
      const mfInfo = href.split('/')
      let dom
      switch (type) {
        case 'script':
          dom = document.createElement('script')
          dom.src = href
          checkComponentKeys(href, 'script')
          break
        case 'mf':
          // @ts-ignore
          mfInfo[0] && window[mfInfo[0]].get('./' + mfInfo[1])
          checkComponentKeys(mfInfo[1], 'mf')
          break
        default:
          dom = document.createElement('link')
          dom.as = type
          dom.rel = 'prefetch'
          dom.href = `${href}`
          break
      }
      dom && document.head.appendChild(dom)
    }

    preloadFiles.forEach(file => {
      appendLink(file.href, file.type)
    })

    setLoaded(true)
  }, [preloadFiles])

  const getPreloadFiles = useCallback((to: string) => {
    if (!to) return
    const files = window.routerResourceManifest && window.routerResourceManifest[to]
    if (files && files.length && files instanceof Array) {
      setPreloadFiles(files)
    }
  }, [])

  const load = () => {
    requestIdleCallback(init, { timeout: 1000 })
  }

  const handleMouseEnter = useCallback(() => {
    if (loaded) return
    load()
  }, [preload, load, loaded])

  useEffect(() => {
    if (!preload || loaded) return
    load()
  }, [preload, load, loaded])

  useEffect(() => {
    if (
      !inview ||
      loaded ||
      !ref.current ||
      typeof IntersectionObserver === 'undefined' ||
      !preloadFiles.length
    )
      return
    let observer = new IntersectionObserver(entries => {
      if (entries.length && entries[0].isIntersecting) {
        load()
      }
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [inview, preloadFiles, loaded])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.routerResourceManifest) {
      getPreloadFiles(to)
      return
    }
    fetch(basename + './' + filename)
      .then(res => res.json())
      .then(res => {
        window.routerResourceManifest = res
        getPreloadFiles(to)
      })
  }, [to])
  
  useEffect(()=>{
    if(action === 'init'){
      setPreload(true)
    }else if(action === 'inview'){
      setInview(true)
    }
  },[action])

  const commonProps = useMemo(()=>({
    onMouseEnter: handleMouseEnter,
    onClick: onClick,
    ref
  }),[handleMouseEnter, onClick, ref])


  return  <span {...commonProps} className={className}>
      {children}
    </span>
}

import { useCallback, useEffect, useRef, useState, useMemo } from 'react'

import { loadMap } from './constant'
interface IProps {
  flag: string
  children: React.ReactNode
  publicPath?: string
  onClick?: ()=>void
  filename?: string
  action?: 'init' | 'inview'
  className?: string
}

interface IFile {
  type: string
  href: string
}


declare global{
  interface Window {
    __routerResourcePreloadManifest: any
  }
}


export default function PreloadLink(props: IProps) {
  const { flag, children,  publicPath = '', onClick, filename = 'route-resource-preload-manifest.json', action, className } = props


  const [preload, setPreload] = useState(false)
  const [inview, setInview] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [preloadFiles, setPreloadFiles] = useState<IFile[]>([])
  const ref = useRef<HTMLAnchorElement>(null)

  const checkComponentLoaded = (href: string, type: 'script' | 'mf')=>{
    const componentKeys = Object.keys(loadMap.component)
    if(type === 'script'){
      for(let index = 0;index < componentKeys.length; index++){
        const key = componentKeys[index]
        if(href.match(key) || key.match(href)){
          if(loadMap.component[key].loaded) return true
          loadMap.component[key].preload()
          break
        }
      }
    }else if(type === 'mf'){
      for(let index = 0;index < componentKeys.length; index++){
        const key = componentKeys[index]
        if(key.match(href)){
          if(loadMap.component[key].loaded) return true
          loadMap.component[key].preload()
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
          if(!checkComponentLoaded(href.toLocaleLowerCase(), 'script')){
            dom = document.createElement('script')
            dom.src = href.startsWith('/') ? href : `/${href}`
          }
          break
        case 'mf':
          if(!checkComponentLoaded(`${mfInfo[0].toLocaleLowerCase()}_${mfInfo[1].toLocaleLowerCase()}`, 'mf')){
            // @ts-ignore
            mfInfo[0] && window[mfInfo[0]].get('./' + mfInfo[1])
          }
          break
        default:
          dom = document.createElement('link')
          dom.as = type
          dom.rel = 'prefetch'
          dom.href = `${href}`
          dom.crossOrigin = 'crossorigin'
          break
      }
      dom && document.head.appendChild(dom)
    }

    preloadFiles.forEach(file => {
      appendLink(file.href, file.type)
    })

    setLoaded(true)
  }, [preloadFiles])

  const getPreloadFiles = useCallback((key: string) => {
    if (!key) return
    const files = window.__routerResourcePreloadManifest && window.__routerResourcePreloadManifest[key]
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
    if (window.__routerResourcePreloadManifest) {
      getPreloadFiles(flag)
      return
    }
    let url = publicPath.endsWith('/') ? publicPath + filename : `${publicPath}/${filename}`

    fetch(url)
      .then(res => res.json())
      .then(res => {
        window.__routerResourcePreloadManifest = res
        getPreloadFiles(flag)
      })
  }, [flag])
  
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

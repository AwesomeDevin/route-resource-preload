import { useCallback, useEffect, useRef, useState, useMemo } from 'react'

import { IFile,  manifestFileName } from './constant'
import { fetchFiles, getPreloadFilesFromFlag } from './utils'
interface IProps {
  flag: string
  children: React.ReactNode
  publicPath?: string
  onClick?: ()=>void
  filename?: string
  action?: 'init' | 'inview'
  className?: string
}



export default function PreloadLink(props: IProps) {
  const { flag, children,  publicPath = '', onClick, filename = manifestFileName, action, className } = props

  const [preload, setPreload] = useState(false)
  const [inview, setInview] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [preloadFiles, setPreloadFiles] = useState<IFile[]>([])
  const ref = useRef<HTMLAnchorElement>(null)

  const fetch = useCallback(() => {
    fetchFiles(preloadFiles)
    setLoaded(true)
  }, [preloadFiles])

  const load = useCallback(() => {
    requestIdleCallback(fetch, { timeout: 1000 })
  },[fetch])

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
  }, [inview, preloadFiles, loaded, load])

  useEffect(() => {
    getPreloadFilesFromFlag(flag, { publicPath, filename }).then(files=>{
      setPreloadFiles(files)
    })
  }, [flag, publicPath, filename])
  
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

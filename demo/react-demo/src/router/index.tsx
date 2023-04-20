import { Route, Routes as Switch, Link, useNavigate } from 'react-router-dom'


import { dynamic, PreloadLink } from '@route-resource-preload/react'

import Hoc from '../components/TimerHoc'
import {  
  Suspense,
   useCallback, useMemo, useState } from 'react'



const ComponentA = dynamic({
  loader: () => import('../components/A'),
  loading: () => <>loading...</>,
  // suspense: true,
})

const Image = dynamic({
  loader: ()=>import('ling_core/Components'),
  loading: () => <>loading...</>,
  // suspense: true,
  submodule: 'Image'
})

// const lazyImage = lazy(()=>import('ling_core/Components'))

const TimerA = Hoc(ComponentA)

const TimerMF = Hoc(Image)



export default function Router(){

  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const [showPreload] = useState(!!window.location.search.match('tab'))

  const [timestamp, setTimestamp] = useState(0)

  const setVal = useCallback((val: number)=>{
    setTimestamp(val)
  },[])

  const Modal = useMemo(()=> dynamic({
    visible,
    // suspense: true,
    loader: () => import('antd/es/modal'),
    loading: () => <>loading...</>,
  }),[visible])

  const TimerModal = useMemo(()=>Hoc(Modal),[Modal]) 

  return <>
  <div className='tabs'>
    <p> ❗️correct data requires <strong className='trigger' style={{}}>disable browser cache</strong> ❗️</p>
      <a href='/'>Test Lazy-Load</a>
      <a href='/?tab=preload'>Test Preload</a>
  </div>    
  <Suspense fallback="suspense loading...">
  <div className='core'>
    <Switch>
      <Route path='*' element={<div style={{height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>This in Index</div>} />
      <Route path='/A' element={<div style={{height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><TimerA onEnd={setVal} /></div>} />
      <Route path='/MF' element={<>
        <TimerMF onEnd={setVal} height={250} src="https://img14.360buyimg.com/ling/s516x0_jfs/t1/97522/12/25179/1393762/622aa4c9E4ff1c9d2/3de6b0ab3c754b8d.png" />
        </>} />
        {/* <ImageA /> */}
    </Switch>
    <div style={{marginTop: 20, color: '#ccc'}}>Component Loading Time: {timestamp} (ms)</div>

    {<TimerModal visible={visible} onCancel={()=>{setVisible(false)}} onEnd={setVal}> This is Modal</TimerModal>}

    
        
    {!showPreload ? <div>
      <Link to="/A"  className="App-link">
        Load Component A
      </Link>
      <Link to="/MF" className="App-link" >
        Load MF
      </Link>
      <span  className="App-link" onClick={()=>{setVisible(true)}}>
        Load Modal
      </span>
    </div>
     :<div>
      <PreloadLink flag="/A"  onClick={()=>{navigate('/A')}} className="App-link">
        Preload Component A
      </PreloadLink>
      <PreloadLink flag="/MF" className="App-link">
        <Link to="/MF" >Preload MF</Link>
      </PreloadLink>
      <PreloadLink flag="/A"  className="App-link" onClick={()=>{setVisible(true)}}>
        PreLoad Modal
      </PreloadLink>
    </div>}
  </div>
  </Suspense>
  </>
}

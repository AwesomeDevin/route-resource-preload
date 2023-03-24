import { Route, Routes as Switch, Link, useNavigate } from 'react-router-dom'


import { dynamic, PreloadLink } from '@route-resource-preload/react'

import Hoc from '../components/TimerHoc'
import {  
  Suspense,
  useCallback,
  useMemo,
  useState 
} from 'react'
//@ts-ignore
import _ from 'lodash'


const getNow = dynamic({ loader: () => import('../utils'), submodule: 'getNow', type: 'jslib' })

const moment = dynamic({ loader: ()=>import('moment') })


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
  const [showType] = useState<'preload' | 'js-lib' | ''>(window.location.search.match('preload') ? 'preload' : (window.location.search.match('js-lib')? 'js-lib' : ''))
  


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

  const getTime = useCallback(()=>{
    getNow.preload().then(res=>{
      alert('new Date(): ' + res().toLocaleString())
    })
  } ,[])


  const getMomentTime = useCallback(()=>{
    moment.preload().then(res=>{
      console.log(res)
      // alert('moment(): '+ res().format('LLLL'))
    })
    
  },[])


  const executeLodash = useCallback(()=>{
    alert('_.difference([3, 2, 1], [4, 2]): ' + _.difference([3, 2, 1], [4, 2]))
  },[])

  return <>
  <div className='tabs'>
    <p> ❗️correct data requires <strong className='trigger' style={{}}>disable browser cache</strong> ❗️</p>
      <a href='/'>Test Load</a>
      <a href='/?tab=preload'>Test preload</a>
      <a href='/?tab=js-lib'>Test js-lib</a>
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
        
    {!showType && <div>
      <Link to="/A"  className="App-link">
        Load Component A
      </Link>
      <Link to="/MF" className="App-link" >
        Load MF
      </Link>
      <span  className="App-link" onClick={()=>{setVisible(true)}}>
        Load Modal
      </span>
    </div>}
    {
      showType === 'preload' && <div>
      <PreloadLink flag="/A"  onClick={()=>{navigate('/A')}} className="App-link">
        Preload Component A
      </PreloadLink>
      <PreloadLink flag="/MF" className="App-link">
        <Link to="/MF" >Preload MF</Link>
      </PreloadLink>
      <PreloadLink flag="/A"  className="App-link" onClick={()=>{setVisible(true)}}>
        PreLoad Modal
      </PreloadLink>
    </div>
    }

{
      showType === 'js-lib' && <div>
      <div   onClick={getTime} className="App-link">
        Dynamic Load Local-JS-Lib
      </div>
      <div   onClick={getMomentTime} className="App-link">
        Dynamic Load Moment-JS
      </div>
      <div   onClick={executeLodash} className="App-link">
        Dynamic Load Lodash-JS
      </div>
      
    </div>
    }
  </div>
  </Suspense>
  </>
}
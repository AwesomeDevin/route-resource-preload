import { Route, Routes as Switch, Link, useNavigate } from 'react-router-dom'
import { 
  dynamic, 
  PreloadLink, 
} from '@route-resource-preload/react'
import Hoc from '../components/TimerHoc'
import {  
  Suspense,
  useCallback,
  useEffect,
  // useEffect,
  useMemo,
  useRef,
  useState 
} from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import { Switch as SwitchCom, Input } from 'antd'

// import { useIntervalLog } from './test-hook'



const ComponentA = dynamic({
  loader: ()=>import('../components/A'),
  loading: () => <>loading...</>,
  // suspense: true,
})

const Image = dynamic({
  loader: ()=> import('ling_core/Image'),
  loading: () => <>loading...</>,
  // submodule: 'Image',
})


const TimerA = Hoc(ComponentA)

const TimerMF = Hoc(Image)


interface IProps {
  hook: any
  params?: any
}

function ComponentWithUseA(props: IProps){
  props.hook(props.params)
  return null
}

function Wrapper(props: any){
  const ref = useRef<any>(null)
  const [,setLoaded] = useState(false)

  useEffect(()=>{
    import('./test-hook').then(res=>{
      ref.current = res.useIntervalLog
      setLoaded(true)
    })
  },[])

  return <>{ref.current && <ComponentWithUseA params={props.params} hook={ref.current}/>}</>
}


const initRoot = () => {
  const dom = document.createElement('div')
  document.body.appendChild(dom)
  const root = createRoot(dom)
  document.body.removeChild(dom)
  return root
}

const updateComponent = ({params, root}: { params: any, root?: any} ) => {
  root.render(<Wrapper params={params} />)
}

const unmount = (root: any) => {
  root.unmount()
}


const createRootRender = ({params, root}: { params: any, root?: any} ) => {

  const version = Number(React.version.split('.')[0])
  if(version < 18){
    console.warn('not support')
    return
  }

  if(!root){
    // init
    root = initRoot()
  }
  // update
  updateComponent({params, root})
  return root
}

function useAsyncHook(condition = true, params: any){
  const ref = useRef<any>(null)
  useEffect(()=>{
    if(!condition) {
      // destroy component
      if(ref.current){
        setTimeout(()=>{
          unmount(ref.current)
          ref.current = null
        })
      }
      return
    } else if(ref.current){
      // update props
      createRootRender({params, root: ref.current})
      return
    }
    // render component
    ref.current = createRootRender({params, root: ref.current})
  },[condition, params])
}


export default function Router(){

  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const [showPreload] = useState(!!window.location.search.match('tab') && !window.location.search.match('hook'))
  const [showHook] = useState(!!window.location.search.match('hook'))

  const [timestamp, setTimestamp] = useState(0)
  const [switchValue, setExecute] = useState(false)
  const [value, setValue] = useState('current count')

  const setVal = useCallback((val: number)=>{
    setTimestamp(val)
  },[])

  const Modal = useMemo(()=> dynamic({
    visible,
    loader: () => import('antd/es/modal'),
    loading: () => <>loading...</>,
    
  }),[visible])

  const TimerModal = useMemo(()=>Hoc(Modal),[Modal]) 

  // switchValue is true and dynamic load
  useAsyncHook(switchValue, value)

  return <>

  <div className='tabs'>
    <p> ❗️correct data requires <strong className='trigger' style={{}}>disable browser cache</strong> ❗️</p>
      <a href='/'>Component-Lazy-Load</a>
      <a href='/?tab=preload'>Component-Dynamic-Preload</a>
      <a href='/?tab=hook'>Hook-Dynamic-Preload-With-Condition</a>
  </div>    

  <Suspense fallback="suspense loading...">
  <div className='core'>
    <Switch>
      <Route path='*' element={showHook ? <></>:<div style={{height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>This in Index</div>} />
      <Route path='/A' element={
      <div style={{height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <TimerA onEnd={setVal} />
        {/* <Wrapper /> */}
        </div>} />
      <Route path='/MF' element={<>
        <TimerMF onEnd={setVal} height={250} src="https://img14.360buyimg.com/ling/s516x0_jfs/t1/97522/12/25179/1393762/622aa4c9E4ff1c9d2/3de6b0ab3c754b8d.png" />
        </>} />
    </Switch>
    <div style={{ color: '#ccc'}}>{showHook ? 'Hook' : 'Component'} Loading Time: {timestamp} (ms)</div>

    {<TimerModal visible={visible} onCancel={()=>{setVisible(false)}} onEnd={setVal}> This is Modal</TimerModal>}

    {showPreload && !showHook ? <div>
      <PreloadLink flag="/A"  onClick={()=>{navigate('/A')}} className="App-link">
        Preload Component A
      </PreloadLink>
      <PreloadLink flag="/MF" className="App-link">
        <Link to="/MF" >Preload MF</Link>
      </PreloadLink>
      <PreloadLink flag="/A"  className="App-link" onClick={()=>{setVisible(true)}}>
        PreLoad Modal
      </PreloadLink>
    </div>:
      (showHook ? <div>
        <div style={{margin: '20px 0'}}>
          <SwitchCom style={{marginRight: 20}} checked={switchValue} onChange={setExecute} />
          Dynamic Execute Hook
        </div>
        <div style={{display: 'flex', fontSize: 14, alignItems: 'center'}}>
          Message： <Input value={value} onChange={(e)=>{setValue(e.target.value)}} />
        </div>
        </div>:
        <div>
          <Link to="/A"  className="App-link">
            Load Component A
          </Link>
          <Link to="/MF" className="App-link" >
            Load MF
          </Link>
          <span  className="App-link" onClick={()=>{setVisible(true)}}>
            Load Modal
          </span>
      </div>)
     }
  </div>
  </Suspense>
  </>
}

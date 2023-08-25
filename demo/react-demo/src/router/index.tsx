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
import React from 'react'
import { Switch as SwitchCom, Input } from 'antd'
// import { useIntervalLog } from './test-interval-hook'

// import { useIntervalLog } from './test-interval-hook'

const version = Number(React.version.split('.')[0])

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
  __cb?: (val:any) => void
}

function ComponentWithUseA(props: IProps){
  const {__cb, hook} = props
  const val = hook(props)
  useEffect(()=>{
    __cb && __cb(val)
  },[val,__cb])
  return null
}

function Wrapper(props: any){
  const ref = useRef<any>(null)
  const [,setLoaded] = useState(false)

  useEffect(()=>{
    import('./test-interval-hook').then(res=>{
      ref.current = res.useIntervalLog
      setLoaded(true)
    })
  },[])
  return <>{ref.current && <ComponentWithUseA {...props} hook={ref.current}/>}</>
}


const initRoot = () => {
  let root
  const dom = document.createElement('div')
  document.body.appendChild(dom)
  //@ts-ignore
  return import('react-dom/client').then(({createRoot})=>{
    root = createRoot(dom)
    document.body.removeChild(dom)
    return root
  })
}

const updateComponent = ({params, root}: { params: any, root?: any} ) => {
  root.render(<Wrapper {...params} />)
}

const unmount = (root: any) => {
  if(version <18){
    import('react-dom').then(({unmountComponentAtNode} )=>{
      unmountComponentAtNode(root)
    })
  }else{
    root.unmount()
  }
}


const renderRoot = async({params, root}: { params: any, root?: any} ) => {
  if(version < 18){
    const { render } = await import('react-dom')
    if(root){
      render(<Wrapper {...params} />, root);
    }else{
      const dom = document.createElement('div')
      root = dom
      render(<Wrapper {...params} />, dom);
      // document.body.removeChild(root)
    }
    return root
  }

  if(!root){
    // init
    root = await initRoot()
  }
  // update
  updateComponent({params, root})
  return root
}

function useAsyncHook( params: any, enable = true,){
  const ref = useRef<any>(null)
  const [val, setVal] = useState()

  const handleCb = useCallback((data: any)=>{
    setVal(data)
  },[])

  const effectiveParams = useMemo(()=>(Object.assign(params, {__cb: handleCb} )) ,[params, handleCb])

  const renderParams = useMemo(()=>({params: effectiveParams, root: ref.current}),[effectiveParams])

  useEffect(()=>{
    if(!enable) {
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
      renderRoot(renderParams)
      return
    }
    // render component
    renderRoot(renderParams).then(res=>{
      ref.current = res
    })
  },[enable, renderParams])

  return val
}


export default function Router(){

  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const [showPreload] = useState(!!window.location.search.match('tab') && !window.location.search.match('hook'))
  const [showHook] = useState(!!window.location.search.match('hook'))

  const [timestamp, setTimestamp] = useState(0)
  const [enableHook, setExecute] = useState(false)
  const [title, setTitle] = useState('current count')
  const [value, setValue] = useState('')


  const setVal = useCallback((val: number)=>{
    setTimestamp(val)
  },[])

  const Modal = useMemo(()=> dynamic({
    visible,
    loader: () => import('antd/es/modal'),
    loading: () => <>loading...</>,
    
  }),[visible])

  const TimerModal = useMemo(()=>Hoc(Modal),[Modal]) 

  const params = useMemo(()=>({title, value}),[title, value])

  // enableHook is true and dynamic load
  const a = useAsyncHook(params,enableHook)

  console.log('>>',a)

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
        <div style={{marginTop: '20px'}}>
          <SwitchCom style={{marginRight: 20}} checked={enableHook} onChange={setExecute} />
          Dynamic Execute Hook
        </div>
        <div style={{marginTop: '20px', display: 'flex', fontSize: 14, alignItems: 'center'}}>
          <label style={{width: 120}}>Title：</label> <Input value={title} onChange={(e)=>{setTitle(e.target.value)}} />
        </div>
        <div style={{marginTop: '20px', display: 'flex', fontSize: 14, alignItems: 'center'}}>
          <label style={{width: 120}}>Content：</label> <Input value={value} onChange={(e)=>{setValue(e.target.value)}} />
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

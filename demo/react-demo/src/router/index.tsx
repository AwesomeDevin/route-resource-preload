import { Route, Routes as Switch, Link, useNavigate, useSearchParams } from 'react-router-dom'


import { dynamic, PreloadLink } from 'route-resource-preload/react'

import Hoc from '../components/TimerHoc'
import { useCallback, useState } from 'react'


const ComponentA = dynamic({
  loader: ()=>import('../components/A'),
  loading: () => <>loading...</>
})

const Image = dynamic({
  loader: ()=>import('ling_core/Components'),
  loading: () => <>loading...</>,
  submodule: 'Image'
})

const TimerA = Hoc(ComponentA)

const TimerMF = Hoc(Image)



export default function Router(){

  const navigate = useNavigate()
  const [parmas] = useSearchParams()
  const [showPreload] = useState(!!parmas.get('tab'))

  const [timestamp, setTimestamp] = useState(0)

  const setVal = useCallback((val: number)=>{
    setTimestamp(val)
  },[])

  return <>
    <Switch>
      <Route path='*' element={<>Index</>} />
      <Route path='/A' element={<><TimerA onEnd={setVal} /></>} />
      <Route path='/MF' element={<>
        <TimerMF onEnd={setVal} width="300" src="https://img14.360buyimg.com/ling/s516x0_jfs/t1/97522/12/25179/1393762/622aa4c9E4ff1c9d2/3de6b0ab3c754b8d.png" />
        </>} />
    </Switch>
    <div style={{marginTop: 20}}>Component Loading Time: {timestamp} (ms)</div>

    <div className='tabs'>
      <a href='/'>Test Load</a>
      <a href='/?tab=preload'>Test preload</a>
    </div>    
        
    {!showPreload ? <div>
      <Link to="/A" >
        Load Component A
      </Link>
      <Link to="/MF" >
        Load MF
      </Link>
    </div>
     :<div>
      <PreloadLink to="/A"  onClick={()=>{navigate('/A')}} className="App-link">
        Preload Component A
      </PreloadLink>
      <PreloadLink to="/MF" >
        <Link to="/MF" >Preload MF</Link>
      </PreloadLink>
    </div>}
  </>
}
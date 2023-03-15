import { Route, Routes as Switch, Link, useNavigate } from 'react-router-dom'


import { dynamic, PreloadLink } from 'route-resource-preload/react'



const ComponentA = dynamic({
  loader: ()=>import('../components/A'),
  loading: () => <>loading...</>
})

const Image = dynamic({
  loader: ()=>import('ling_core/Components'),
  loading: () => <>loading...</>,
  submodule: 'Image'
})


export default function Router(){

  const navigate = useNavigate()

  return <>
    <Switch>
      <Route path='*' element={<>Index</>} />
      <Route path='/A' element={<ComponentA />} />
      <Route path='/MF' element={<>
        <Image width="300" src="https://img14.360buyimg.com/ling/s516x0_jfs/t1/97522/12/25179/1393762/622aa4c9E4ff1c9d2/3de6b0ab3c754b8d.png" />
        </>} />
    </Switch>
    <div>
      <Link to="/A" >
        Load Component A
      </Link>
      <Link to="/MF" >
        Load MF
      </Link>
    </div>
    <div>
      <PreloadLink to="/A"  onClick={()=>{navigate('/A')}} className="App-link">
        Preload Component A
      </PreloadLink>
      <PreloadLink to="/MF" >
        <Link to="/MF" >Preload MF</Link>
      </PreloadLink>
    </div>
  </>
}
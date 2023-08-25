import { useEffect, useState } from "react";

let timer: NodeJS.Timeout

export function useIntervalLog(){
  const [count, setCount] = useState(0)

  useEffect(()=>{
    timer && clearTimeout(timer)
    timer = setTimeout(()=>{
      const now = count
      setCount(now+1)
      console.log(now)
    },1000)
    return ()=>{
      timer && clearTimeout(timer)
    }
  },[count])

}


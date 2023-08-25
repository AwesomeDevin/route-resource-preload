import { message } from "antd";
import { useEffect, useState } from "react";

let timer: NodeJS.Timeout



export function useIntervalLog(title: string){
  const [count, setCount] = useState(0)

  useEffect(()=>{
    timer && clearTimeout(timer)
    timer = setTimeout(()=>{
      const now = count
      setCount(now+1)
      message.info(`${title}：${now}`)
    },1000)
    return ()=>{
      timer && clearTimeout(timer)
    }
  },[count, title])

}


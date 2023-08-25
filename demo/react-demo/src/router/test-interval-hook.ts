import { message } from "antd";
import { useEffect, useState } from "react";

let timer: NodeJS.Timeout

export function useIntervalLog({title, value} : {title: string, value?: string}){
  const [count, setCount] = useState(0)

  useEffect(()=>{
    timer && clearTimeout(timer)
    timer = setTimeout(()=>{
      const now = count
      setCount(now+1)
      message.info(`${title}：${value || now}`)
    },1000)
  },[count, title, value])

  return {count}
}


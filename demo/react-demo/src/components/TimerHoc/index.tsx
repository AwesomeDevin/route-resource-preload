import  { useCallback, useRef } from "react";

export default function Hoc(Com: any){
  function  Timer(props: any){
    const { onEnd } = props
    const starTime = useRef({
      second: new Date().getSeconds(),
      milliseconds: new Date().getMilliseconds(),
    })

    const handleCallback = useCallback(() => {
      const date = new Date()
      const second = date.getSeconds() - starTime.current.second
      const milliseconds = date.getMilliseconds() - starTime.current.milliseconds
      onEnd && onEnd(second * 1000 + milliseconds)
    }, [onEnd]);
  
    return <Com {...props} onEnd={handleCallback} />
  }
  return Timer
}
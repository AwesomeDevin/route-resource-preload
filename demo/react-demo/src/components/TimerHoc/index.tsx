import  { ComponentType, useCallback, useRef } from "react";


export default function Hoc<T>(Com: ComponentType<T> & { preload: () => Promise<any>; }){

  function  Timer(props: Omit<T, 'onEnd'> & {onEnd?: (time: number) => void }){

    const { onEnd, ...rets } = props
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
  
 
    return <Com {...rets as T} onEnd={handleCallback} />
  }
  return Timer
}


import  { ComponentType, useCallback, useRef, ComponentPropsWithRef } from "react";

export default function Hoc<T extends ComponentType<any>>(Com: T ): T{
  function  Timer(props: ComponentPropsWithRef<T> & { onEnd: (val: number)=>void} ){
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
import React from "react"


interface IA {
  name: string
}
export default function A(props: IA){
  return <div>This is Component A</div>
}

export function B(){
  return 1
}
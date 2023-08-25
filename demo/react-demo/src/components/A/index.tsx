import React from "react"

interface IProps {
  name?: string
}


export default function A(props: IProps){
  console.log(props)
  return <div>This is Component A</div>
}

export function B(){
  return 1
}
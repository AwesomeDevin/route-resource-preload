import React from "react"

interface IA{
  visible?: boolean
}

export default function A(props: IA){
  console.log('props',props)
  return <div>This is Component A</div>
}
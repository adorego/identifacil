'use client'

import { Suspense, useEffect, useState } from "react"

import Loading from "./loading"

export default function Main(){
  
  return(
    <Suspense fallback={<Loading />} >
      <h1>Panel</h1>
    </Suspense>
  )
}
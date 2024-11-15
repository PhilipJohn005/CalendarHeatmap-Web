import React, { useEffect, useState } from 'react'
import Heat from './Heat'
import { userActivityData } from './Dates'
const Ht=()=>{
  const [Dates,setDates]=useState([])
  
  useEffect(()=>{
    setDates(userActivityData)
  },[])

  return (
    <div className='h-screen w-full bg-zinc-900 flex flex-col justify-center items-center'>
      <Heat width={500} year={2019} month={5} />
    </div>
  )
}

export default Ht
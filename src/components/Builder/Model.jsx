import React from 'react'
import { useState } from 'react';

const Model = ({view,modelData,setModelView}) => {
  const closeModel = (e) => {
    setModelView(false);
  }
  console.log(modelData);
  const [startDate, setStartDate] = useState(modelData.startDate);
  const [endDate, setEndDate] = useState(modelData.endDate);
  const temp_date = new Date(23-10-2026);
  return (
    <div className={`flex items-center justify-center ${view ? "block" : "hidden"} bg-black/50  h-[100%] w-[100%] absolute top-0 left-0`}  >
    <div className={`h-[350px] w-[400px] rounded bg-white z-50 `} onClick={(e)=>{e.stopPropagation()}}>
      <div className='flex justify-between p-4'>
        <h1 className='text-2xl font-bold'>Your Details</h1><button className='text-gray-500 hover:text-gray-700 text-2xl' onClick={closeModel}>×</button>
      </div>
      <input type="text" className='w-full h-[40px] border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 mt-4' placeholder='Enter your name' value={modelData.company}/>
      <input type="text" className='w-full h-[40px] border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 mt-4' placeholder='Enter your profession' value={modelData.role} />
      <input type="date" className='w-full h-[40px] border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 mt-4' placeholder='Enter your email' value={startDate}/>
      <input type="date" className='w-full h-[40px] border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 mt-4' placeholder='Enter your phone number' value={temp_date}/>   
      </div> 
    </div>
  )
}

export default Model

import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen bg-slate-950 text-white flex justify-center items-center'>
      <div className="">
        <h1 className='text-2xl font-semibold text-center'>NOVA</h1>
        <h4 className='text-xl text-center'>AI-life and Learning </h4>
        <hr className='my-3'/>
        <div className="flex justify-between">
          <button className='border border-gray-500 px-2 p-1 rounded-sm hover:bg-slate-600' onClick={()=> navigate('/signin')}>Sign In</button>
          <button className='border border-gray-500 px-2 p-1 rounded-sm hover:bg-slate-600' onClick={()=> navigate('/signup')}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Home
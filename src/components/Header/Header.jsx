import React from 'react'
import Logo from  '../../logo/Logo.jpg'
import { Routes, Route, Link, useLocation } from "react-router-dom";


const Header = () => {
  const location = useLocation();
  return (
    <div className='header bg-[#FF714C] flex justify-between items-center p-4'>
        <img src={Logo} alt='Resume Builder' height={100} width={100}></img>
        {location.pathname !== "/createresume" && (
        <button className='bg-[#ffea2df6] text-black font-["Segoe UI", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif] hover:bg-[#ccbc31f6] font-bold px-4 py-2 rounded-3xl cursor-pointer'>
          <Link to="/choosetemplate">Create Your Free Resume</Link>
        </button>
      )}   
    </div>
  )
}

export default Header

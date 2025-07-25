import React from 'react';
import  { useRef } from 'react';
import ResumeBuilder from './components/ResumeBuilder';
import Logo from "./logo/Logo.png"


function App() {
  const componentRef = useRef(null);
  return (
    <div className="App">
      <div className='bg-[#1E3A8A] text-white p-4'>
      <img src={Logo} height={150} width={120} ></img>
      </div>
        <ResumeBuilder ></ResumeBuilder>
    </div>
  );
}

export default App;

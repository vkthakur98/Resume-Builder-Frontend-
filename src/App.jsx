import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import MyComponentToPrint from './components/MyComponentToPrint';
import ResumeBuilder from './components/ResumeBuilder';


function App() {
  const componentRef = useRef(null);
  return (
    <div className="App">
      <div className='bg-[#1E3A8A] text-white p-4'>
      <h1 className="text-2xl font-bold mb-4">Resume Builder</h1>
      </div>
        <ResumeBuilder ></ResumeBuilder>
    </div>
  );
}

export default App;

import { useRef } from 'react'
import './App.css'
import React from 'react'
import ResumeBuilder from './components/ResumeBuilder'
import ProfileSection from './components/ProfileSection'
import { useReactToPrint } from 'react-to-print';


const MyComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <h1>This part will be printed</h1>
    <p>Only this component will appear in the printout.</p>
  </div>
));


function App() {

  const componentRef = useRef();

  const actualPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    console.log('Ref before print:', componentRef.current); // <--- should not be null
    actualPrint(); // we call the print handler separately
  };
  
  
  

  return (
    <div className="App">
      <ResumeBuilder />
      <MyComponentToPrint ref={componentRef} /> 
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handlePrint}>Print</button>
    </div>
  )
}

export default App

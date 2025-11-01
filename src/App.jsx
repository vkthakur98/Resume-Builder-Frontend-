import React from 'react';
import  { useRef } from 'react';
import HomePage from './components/Builder/HomePage';
import ResumeBuilder from './components/Builder/ResumeBuilder';
import Header from './components/Header/Header';
import NotFound from './components/Builder/NotFound';
import TemplateChooser from './components/Builder/TemplateChooser';
import { Routes, Route, Link } from "react-router-dom";


function App() {
  const componentRef = useRef(null);
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/choosetemplate" element={<TemplateChooser/>} />
        <Route path="/createresume" element={<ResumeBuilder/>} />
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>

  );
}

export default App;

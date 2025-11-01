import React, { useState } from 'react';
import right_image from '../../images/image.png';
import { Link } from "react-router-dom";
const TemplateChooser = () => {
  const [template, setTemplate] = useState("Minimalist");

  const handleTemplateChange = (e) => {
    setTemplate(e.target.value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 p-4">Choose a Template</h2>
      <div className="grid">
        {["Minimalist"].map((templateName) => (
          <div key={templateName} className="flex justify-center items-center bg-white p-4 rounded-lg">
            <label className="block text-lg font-medium text-gray-700">
              {templateName}(Default)
              <img className='border-2 rounded-lg cursor-pointer' src={right_image} width={300} height={350}></img>
              <input
                type="radio"
                name="template"
                value={templateName}
                onChange={handleTemplateChange}
                checked={template === templateName}
              />
            </label>
          </div>
        ))}
      </div>
      <div className='flex justify-center items-center'>
      <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-3xl shadow-lg hover:bg-blue-600 transition duration-300 cursor-pointer"><Link to="/createresume">Next</Link></button>
      </div>
      {/* {template && (
        <div className="bg-white p-4 border rounded-lg">
          <h3 className="text-2xl font-bold text-gray-800">Selected Template: {template}</h3>
        </div>
      )} */}
    </div>
  );
};

export default TemplateChooser;

import React, { useState } from 'react';

const ToggleSwitch = ({fresher,setFresher}) => {
  const [isOn, setIsOn] = useState(false);
  
  const toggle = () => {
    setIsOn(!isOn);
    setFresher(prev => (prev === "Projects" ? "Experience" : "Projects"));
    console.log(fresher);
  }

  return (
    <label
      htmlFor="toggle-switch"
      className="flex items-center gap-3 cursor-pointer select-none"
      title="Toggle the setting"
    >
      <span
        className={`text-lg mr-2 mt-[-5px] position-absolute ${isOn ? 'text-[#10b981]' : 'text-gray-500'}  font-medium transition-colors duration-300`}
      >
        Fresher
      </span>

      <div
        className={` relative inline-flex h-5 w-10 rounded-full transition-colors duration-300 ${
          isOn ? 'bg-[#10b981]' : 'bg-gray-300'
        }`}
        // focus-within:ring-2 focus-within:ring-[#10b981]
      >
        <input
          id="toggle-switch"
          type="checkbox"
          checked={isOn}
          onChange={toggle}
          className="sr-only w-[100px]"
          aria-label="Toggle switch"
        />
        <span
          className={` inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            isOn ? 'translate-x-6' : 'translate-x-[-1]'
          } pointer-events-none`}
        />
      </div>
    </label>
  );
};

export default ToggleSwitch;

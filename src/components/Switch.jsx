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
        className={`text-lg font-medium transition-colors duration-300`}
      >
        Fresher
      </span>

      <div
        className={` relative inline-flex h-8 w-16 rounded-full transition-colors duration-300 ${
          isOn ? 'bg-blue-500' : 'bg-gray-300'
        } focus-within:ring-2 focus-within:ring-blue-500`}
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
          className={` inline-block h-7 w-7 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            isOn ? 'translate-x-8' : 'translate-x-1'
          } pointer-events-none`}
        />
      </div>
    </label>
  );
};

export default ToggleSwitch;

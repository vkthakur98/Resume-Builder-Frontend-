import React from 'react';

const MyComponentToPrint = () => {
  return (
    <div className="p-4 border rounded bg-white text-black w-[500px]">
      <h2 className="text-xl font-semibold mb-2">My Resume Section</h2>
      <p>This will be captured and downloaded as a PDF.</p>
    </div>
  );
};

export default MyComponentToPrint;

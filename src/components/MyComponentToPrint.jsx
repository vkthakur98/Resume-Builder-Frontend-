import React, { useRef } from 'react';

const MyComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <h1>This part will be printed</h1>
    <p>Only this component will appear in the printout.</p>
  </div>
));

export default MyComponentToPrint;


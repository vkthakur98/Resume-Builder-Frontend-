import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const removeLoader = () => {
  const loader = document.getElementById('global-loader');
  if (loader) loader.style.display = 'none';
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
removeLoader();
//Make the girl in image sit on sofa wearing a normal sunglasses, keep her eyes, eye brows, eye lashes, nose, ears, facecut, faceshape exact same as given image, keep the top and jeans exact same as shown in image. remove her phone from hand place her hand on sofa hand rest.
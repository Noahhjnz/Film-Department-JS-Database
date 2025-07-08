import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import RouterApp from './routerApp.js'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RouterApp />
  </BrowserRouter>
);

reportWebVitals();


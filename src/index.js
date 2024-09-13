import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import ErrorBoundary from './ErrorBoundary.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min';
// Remove this line if not used
// import { useState } from 'react';


ReactDOM.render(
  <React.StrictMode>
    <App />
    <ErrorBoundary />
  </React.StrictMode>,
  document.getElementById('root')
);

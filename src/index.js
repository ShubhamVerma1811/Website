import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/main.css';
import { InitialDataProvider } from './context/InitialDataContext';

ReactDOM.render(
  <React.StrictMode>
    <InitialDataProvider>
      <App />
    </InitialDataProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

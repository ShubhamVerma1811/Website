import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/main.css';
import { DataProvider } from './context/DataContext';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

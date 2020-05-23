import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/main.css';
// import { DataContext } from './context/DataContext';

ReactDOM.render(
  <React.StrictMode>
    {/* <DataContext> */}
    <App />
    {/* </DataContext> */}
  </React.StrictMode>,
  document.getElementById('root'),
);

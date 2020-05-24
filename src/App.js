import React from 'react';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import ApiDataProvider from './context/ApiDataContext';

function App() {
  return (
    <div className="App">
      <ApiDataProvider>
        <NavBar />
        <Hero />
      </ApiDataProvider>
    </div>
  );
}

export default App;

import React from 'react';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import ApiDataProvider from './context/ApiDataContext';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <ApiDataProvider>
        <NavBar />
        <Hero />
        <Gallery />
        <Contact />
      </ApiDataProvider>
    </div>
  );
}

export default App;

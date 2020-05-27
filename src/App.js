import React from 'react';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import ApiDataProvider from './context/ApiDataContext';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <ApiDataProvider>
        <NavBar />
        <Hero />
        <Gallery />
        <Contact />
        <Footer />
      </ApiDataProvider>
    </div>
  );
}

export default App;

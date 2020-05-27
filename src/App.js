import React from 'react';
import './assets/App.css';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import ApiDataProvider from './context/ApiDataContext';

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

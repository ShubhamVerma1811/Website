/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { ApiDataContext } from '../context/ApiDataContext';
import '../styles/Hero.css';

const styles = {
  fontFamily: 'Karla',
};

function Hero() {
  const [data, setApiData] = useContext(ApiDataContext);
  const { basics } = data;

  return (
    <div className="bg-red-400 h-screen mt-12">
      {basics && (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-6xl font-primary">{basics.name}</h1>
          <h1 className="text-5xl font-bold">{basics.label}</h1>
        </div>
      )}
    </div>
  );
}

export default Hero;

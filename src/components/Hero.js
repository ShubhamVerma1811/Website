/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

function Hero() {
  const URI = 'https://gitconnected.com/v1/portfolio/shubhamverma1811';
  const [data, setData] = useState({});
  const {
    basics,
    skills,
    projects,
    work,
  } = data;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(URI);
      const receivedData = await res.json();
      setData(receivedData);
    }
    fetchData();
  }, []);

  return (
    <div>
      {basics && (
        <>
          <h1 className="text-6xl">{data.basics.name}</h1>
          <h1 className="text-5xl">{data.basics.label}</h1>
        </>
      )}
    </div>
  );
}

export default Hero;

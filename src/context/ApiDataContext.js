import PropTypes from 'prop-types';
import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { InitialDataContext } from './InitialDataContext';

export const ApiDataContext = createContext();

const ApiDataProvider = ({ children }) => {
  const data = useContext(InitialDataContext);
  const URI = 'https://gitconnected.com/v1/portfolio/shubhamverma1811';
  const [apiData, setApiData] = useState(data[0]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(URI);
        const recData = await res.json();
        setApiData(recData);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  return (
    <ApiDataContext.Provider value={apiData}>
      {children}
    </ApiDataContext.Provider>
  );
};

ApiDataProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.array.isRequired,
};

export default ApiDataProvider;

import React, { useEffect, useState, useContext } from 'react';
import GoogleMap from 'components/GoogleMap';
import WeatherInfo from 'components/WeatherInfo';
import { GlobalStateContext } from '../context/GlobalContextProvider';

const Index = () => {
  const [renderMap, setRenderMap] = useState(true);
  const [weatherData, setWeatherData] = useState({});
  const state = useContext(GlobalStateContext);

  useEffect(() => {
    let oldData = {};

    try {
      oldData = JSON.parse(localStorage.getItem('weather'));
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.error('Incorrect JSON format.\n', e);
      } else {
        throw e;
      }
    }

    // Should render map
    if (oldData) {
      setRenderMap(false);
      setWeatherData(oldData);
    } else {
      setWeatherData(state);
    }
    // console.log(oldData);
  }, []);

  return (
    <div>
      {renderMap && <GoogleMap />}
      {/* <GoogleMap /> */}
      <WeatherInfo weather={weatherData} />
    </div>
  );
};

export default Index;

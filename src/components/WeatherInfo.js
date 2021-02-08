import { Link } from 'gatsby';
import React, { useContext, useState, useEffect } from 'react';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';
import CurrentWeather from 'components/weather/CurrentWeather';

const WeatherInfo = () => {
  const dispatch = useContext(GlobalDispatchContext);
  const { activeLocation: weather } = useContext(GlobalStateContext);
  const [locationName, setLocationName] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {}, [weather]);

  const handleInputChange = e => {
    setLocationName(e.target.value.trim());
    setInputValue(e.target.value.trim());
  };

  const saveLocation = () => {
    if (locationName.trim().length) {
      dispatch({
        type: 'SAVE_LOCATION',
        payload: {
          ...weather,
          address: locationName,
        },
      });
    } else {
      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          type: 'error',
          text: 'Please type in a name to save the location',
        },
      });
    }
  };

  return (
    <div>
      {typeof weather !== 'undefined' ? (
        <div>
          <h1>{weather.address}</h1>

          <div style={{ border: '1px solid green', padding: '1rem' }}>
            <button onClick={saveLocation}>Save Location</button>
            <input
              type="text"
              onChange={handleInputChange}
              value={inputValue}
            />
          </div>

          <CurrentWeather data={weather.current} />
        </div>
      ) : (
        <div>
          Please select a location before you can see the weather
          <Link to="/map/" className="btn">
            Pick a location
          </Link>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;

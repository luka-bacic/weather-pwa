import { Link } from 'gatsby';
import React, { useContext, useState } from 'react';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';

const WeatherInfo = () => {
  const dispatch = useContext(GlobalDispatchContext);
  const { activeLocation: weather } = useContext(GlobalStateContext);
  const [locationName, setLocationName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  // console.log(weather);

  const handleInputChange = e => {
    setLocationName(e.target.value.trim());
  };

  const saveLocation = () => {
    if (locationName.trim().length) {
      setErrorMsg('');
      dispatch({
        type: 'SAVE_LOCATION',
        payload: {
          ...weather,
          isTemp: false,
          nickname: locationName,
        },
      });
    } else {
      setErrorMsg('Please type in a name to save the location');
    }
  };

  return (
    <div>
      {typeof weather !== 'undefined' ? (
        <div>
          <h1>
            Lat {weather.latitude} <br /> Lng {weather.longitude}
          </h1>
          <button onClick={saveLocation}>Save Location</button>
          <input type="text" onChange={handleInputChange} />
          <strong>{locationName}</strong>
          <br />
          <strong>{errorMsg}</strong>
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

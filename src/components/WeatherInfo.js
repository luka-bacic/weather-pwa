import React, { useContext, useState } from 'react';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';

const WeatherInfo = ({ weather }) => {
  const dispatch = useContext(GlobalDispatchContext);
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
      <h1>
        Lat {weather.latitude} <br /> Lng {weather.longitude}
      </h1>
      <button onClick={saveLocation}>Save Location</button>
      <input type="text" onChange={handleInputChange} />
      <strong>{locationName}</strong>
      <br />
      <strong>{errorMsg}</strong>
    </div>
  );
};

export default WeatherInfo;

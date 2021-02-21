import React, { useContext, useEffect } from 'react';
import { Link } from 'gatsby';
import {
  // GlobalDispatchContext,
  GlobalStateContext,
} from '../../context/GlobalContextProvider';
import CurrentWeather from 'components/weather/CurrentWeather';
import DailyBlock from 'components/weather/reusable/DailyBlock';
import HourlyForecast from 'components/weather/HourlyForecast';
import WeatherAlerts from 'components/weather/WeatherAlerts';
import QuickInfo from 'components/weather/QuickInfo';

const WeatherInfo = () => {
  // const dispatch = useContext(GlobalDispatchContext);

  const { activeLocation: weather } = useContext(GlobalStateContext);

  // const [locationName, setLocationName] = useState('');
  // const [inputValue, setInputValue] = useState('');

  // const handleInputChange = e => {
  //   setLocationName(e.target.value.trim());
  //   setInputValue(e.target.value.trim());
  // };

  // const saveLocation = () => {
  //   if (locationName.trim().length) {
  //     dispatch({
  //       type: 'SAVE_LOCATION',
  //       payload: {
  //         ...weather,
  //         address: locationName,
  //       },
  //     });
  //   } else {
  //     dispatch({
  //       type: 'SET_MESSAGE',
  //       payload: {
  //         type: 'error',
  //         text: 'Please type in a name to save the location',
  //       },
  //     });
  //   }
  // };

  useEffect(() => {
    // if (typeof weather !== 'undefined') {
    //   if (typeof weather.alerts !== 'undefined') {
    //     console.log('ALERTS:', weather.alerts);
    //   }
    // }
  }, [weather]);

  return (
    <div className="weather-info">
      {typeof weather !== 'undefined' ? (
        <div>
          <h1>{weather.address}</h1>

          {/* <div style={{ border: '1px solid green', padding: '1rem' }}>
            <button onClick={saveLocation}>Save Location</button>
            <input
              type="text"
              onChange={handleInputChange}
              value={inputValue}
            />
          </div> */}

          <div className="flex">
            <WeatherAlerts
              alerts={weather.alerts}
              timezoneOffset={weather.timezone_offset}
            />

            <CurrentWeather
              data={weather.current}
              // timezoneOffset={weather.timezone_offset}
            />
          </div>
          {typeof weather.daily[0] !== 'undefined' && (
            <QuickInfo data={weather.daily[0]} />
          )}

          {typeof weather.daily[0] !== 'undefined' && (
            <DailyBlock
              data={weather.daily[0]}
              timezoneOffset={weather.timezone_offset}
              hideTempAndPrecip
            />
          )}

          <HourlyForecast
            data={weather.hourly}
            timezoneOffset={weather.timezone_offset}
          />
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

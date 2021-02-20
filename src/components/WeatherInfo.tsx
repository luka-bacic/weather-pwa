import React, { useContext, useEffect } from 'react';
import { Link } from 'gatsby';
import {
  // GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';
import CurrentWeather from 'components/weather/CurrentWeather';
import DailyWeather from 'components/weather/DailyWeather';
import HourlyWeather from 'components/weather/HourlyWeather';
import WeatherAlerts from 'components/weather/WeatherAlerts';
import QuickInfo from 'components/weather/QuickInfo';
import { LocationInfo } from '../types';

const WeatherInfo = () => {
  // const dispatch = useContext(GlobalDispatchContext);
  type types = {
    activeLocation: LocationInfo;
    weather: object;
  };
  const { activeLocation: weather }: types = useContext(GlobalStateContext);
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
    <div>
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

          <WeatherAlerts
            alerts={weather.alerts}
            timezoneOffset={weather.timezone_offset}
          />

          <CurrentWeather
            data={weather.current}
            // timezoneOffset={weather.timezone_offset}
          />
          {typeof weather.daily[0] !== 'undefined' && (
            <QuickInfo data={weather.daily[0]} />
          )}

          {typeof weather.daily[0] !== 'undefined' && (
            <DailyWeather
              data={weather.daily[0]}
              timezoneOffset={weather.timezone_offset}
            />
          )}
          <HourlyWeather
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

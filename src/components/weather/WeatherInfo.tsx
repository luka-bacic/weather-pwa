import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { GlobalDispatchContext, GlobalStateContext } from 'context';
import CurrentWeather from 'components/weather/CurrentWeather';
import DailyBlock from 'components/weather/reusable/DailyBlock';
import DailyForecast from 'components/weather/DailyForecast';
import HourlyForecast from 'components/weather/HourlyForecast';
import WeatherAlerts from 'components/weather/WeatherAlerts';
import QuickInfo from 'components/weather/QuickInfo';
import ForecastTime from 'components/weather/ForecastTime';
import { LocationInfo } from 'types';
import { setPageName } from 'context/actions';

const WeatherInfo = () => {
  const dispatch = useContext(GlobalDispatchContext);

  const [forecast, setForecast] = useState<LocationInfo | undefined>(undefined);
  const {
    weather: { activeLocation },
  } = useContext(GlobalStateContext);

  useEffect(() => {
    if (activeLocation.ready) {
      if (typeof activeLocation.forecast !== 'undefined') {
        setForecast(activeLocation.forecast);

        dispatch(setPageName(activeLocation.forecast.address));
      }
    }
  }, [activeLocation]);

  return (
    <div className="weather-info">
      {typeof forecast !== 'undefined' ? (
        <div>
          <div className="flex">
            <WeatherAlerts
              alerts={forecast.alerts}
              timezoneOffset={forecast.timezone_offset}
            />

            <CurrentWeather
              data={forecast.current}
              // timezoneOffset={forecast.timezone_offset}
            />
          </div>

          {typeof forecast.daily[0] !== 'undefined' && (
            <>
              <QuickInfo data={forecast.daily[0]} />

              <DailyBlock
                data={forecast.daily[0]}
                timezoneOffset={forecast.timezone_offset}
                title="Show more about today"
                single
              />
            </>
          )}

          <HourlyForecast
            data={forecast.hourly}
            timezoneOffset={forecast.timezone_offset}
          />

          {typeof forecast.daily !== 'undefined' &&
            Array.isArray(forecast.daily) && (
              <DailyForecast
                data={forecast.daily}
                timezoneOffset={forecast.timezone_offset}
                withoutFirst
              />
            )}

          <ForecastTime
            timezoneOffset={forecast.timezone_offset}
            lastUpdated={forecast.lastUpdated}
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

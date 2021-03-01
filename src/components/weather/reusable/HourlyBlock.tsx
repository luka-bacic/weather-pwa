import React, { useEffect, useState } from 'react';
import { HourlyResponse, IconData } from 'types';
import { hasProp, getIconInfo, round } from 'functions';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import classNames from 'classnames';
import WindInfo from 'components/weather/reusable/WindInfo';
import UvIndex from 'components/weather/reusable/UvIndex';

type Props = {
  data: HourlyResponse;
  timezoneOffset: number;
  showPrecipChance: boolean;
  showRainfall: boolean;
  showSnowfall: boolean;
  showTemperature: boolean;
  showFeelsLike: boolean;
  showWind: boolean;
  showUvIndex: boolean;
  showClouds: boolean;
  showPressure: boolean;
};

const HourlyBlock = ({
  data,
  timezoneOffset,
  showPrecipChance,
  showRainfall,
  showSnowfall,
  showTemperature,
  showFeelsLike,
  showWind,
  showUvIndex,
  showClouds,
  showPressure,
}: Props) => {
  dayjs.extend(utc);

  const [time, setTime] = useState('');
  const [iconData, setIconData] = useState<IconData | null>(null);
  const [isNightTime, setIsNightTime] = useState(false);
  const [temp, setTemp] = useState<number | null>(null);
  const [feelsLike, setFeelsLike] = useState<number | null>(null);
  const [precipChance, setPrecipChance] = useState<number | null>(null);
  const [rainAmount, setRainAmount] = useState<string | null>(null);
  const [snowAmount, setSnowAmount] = useState<string | null>(null);

  useEffect(() => {
    if (typeof data !== 'undefined') {
      // Set label for the hour
      if (hasProp(data, 'dt')) {
        setTime(
          dayjs
            .utc(data.dt * 1000)
            .add(timezoneOffset, 'second')
            .format('ha')
        );
      }

      if (hasProp(data.weather[0], 'icon')) {
        // Get required icon data
        setIconData(getIconInfo(data.weather[0]));

        // Check if the icon is a night icon
        if (data.weather[0].icon.indexOf('n') > -1) {
          setIsNightTime(true);
        }
      }

      // Setup temperature if its required to be shown
      if (showTemperature) {
        // Round and set temperature
        if (hasProp(data, 'temp') && typeof data.temp !== 'undefined') {
          setTemp(round(data.temp));
        }
      }

      // Setup apparent temperature if its required to be shown
      if (showFeelsLike) {
        // Round and set 'feels like' temperature
        if (
          hasProp(data, 'feels_like') &&
          typeof data.feels_like !== 'undefined'
        ) {
          setFeelsLike(round(data.feels_like));
        }
      }

      // Setup rain data if its required to be shown
      if (showPrecipChance) {
        // Precip chance
        if (hasProp(data, 'pop')) {
          setPrecipChance(round(data.pop * 100, 0));
        }
      }

      // Rainfall
      if (showRainfall) {
        if (hasProp(data, 'rain') && typeof data.rain !== 'undefined') {
          if (
            hasProp(data.rain, '1h') &&
            typeof data.rain['1h'] !== 'undefined'
          ) {
            // Set rainfall amount
            if (data.rain['1h'] < 1) {
              setRainAmount('< 1');
            } else {
              setRainAmount(round(data.rain['1h'], 0).toString());
            }
          }
        } else {
          setRainAmount('0');
        }
      } else {
        setRainAmount('0');
      }

      // Snowfall
      if (showSnowfall) {
        if (hasProp(data, 'snow') && typeof data.snow !== 'undefined') {
          if (
            hasProp(data.snow, '1h') &&
            typeof data.snow['1h'] !== 'undefined'
          ) {
            // Set rainfall amount
            if (data.snow['1h'] < 1) {
              setSnowAmount('< 1');
            } else {
              setSnowAmount(round(data.snow['1h'], 0).toString());
            }
          }
        } else {
          setSnowAmount('0');
        }
      } else {
        setSnowAmount('0');
      }
    }
  }, [data]);

  const hourlyClasses = classNames({
    'hourly-block': true,
    'hourly-block--night': isNightTime,
  });

  return (
    <div className={hourlyClasses}>
      <div className="hourly-block__time">
        <span className="sr-only">Time of day</span>
        {time}
      </div>
      {iconData && (
        <img
          src={iconData.url}
          className="hourly-block__icon"
          alt={iconData.description}
          loading="lazy"
        />
      )}

      {showTemperature && temp !== null && (
        <div className="hourly-block__temp">
          <strong>
            <span className="sr-only">temperature</span>
            {temp}&deg;
          </strong>
        </div>
      )}

      {showFeelsLike && feelsLike !== null && (
        <div className="hourly-block__feels-like">
          <span className="sr-only">apparent temperature</span>
          {feelsLike}&deg;
        </div>
      )}

      {showPrecipChance && precipChance !== null && (
        <div className="hourly-block__precip-chance">
          <span className="sr-only">precipitation chance</span>
          {precipChance}%
        </div>
      )}

      {showRainfall && rainAmount !== null && (
        <div className="hourly-block__rain">
          <span className="sr-only">rainfall</span>
          {rainAmount} mm
        </div>
      )}

      {showSnowfall && snowAmount !== null && (
        <div className="hourly-block__snow">
          <span className="sr-only">snowfall</span>
          {snowAmount} mm
        </div>
      )}

      {showWind && (
        <div className="hourly-block__wind-speed">
          <WindInfo speed={data.wind_speed} degrees={data.wind_deg} noIcon />
        </div>
      )}

      {showUvIndex && (
        <div className="hourly-block__uv">
          <UvIndex uv={data.uvi} />
        </div>
      )}

      {showClouds && (
        <div className="hourly-block__clouds">
          <span className="sr-only">cloud cover</span>
          {data.clouds}%
        </div>
      )}

      {showPressure && (
        <div className="hourly-block__pressure">
          <span className="sr-only">atmospheric pressure</span>
          {data.pressure} hPa
        </div>
      )}
    </div>
  );
};

export default React.memo(HourlyBlock);

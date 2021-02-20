import React, { useEffect, useState } from 'react';
import { HourlyResponse, IconData } from 'types';
import { hasProp } from 'functions';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import classNames from 'classnames';
import WindInfo from 'components/weather/reusable/WindInfo';
import UvIndex from 'components/weather/reusable/UvIndex';

type Props = {
  data: HourlyResponse;
  timezoneOffset: number;
  showRain: boolean;
  showTemperature: boolean;
  showWind: boolean;
  showUvIndex: boolean;
  showClouds: boolean;
  showPressure: boolean;
};

const HourlyBlock = ({
  data,
  timezoneOffset,
  showRain,
  showTemperature,
  showWind,
  showUvIndex,
  showClouds,
  showPressure,
}: Props) => {
  dayjs.extend(utc);

  const [time, setTime] = useState('');
  const [iconData, setIconData] = useState<IconData | null>(null);
  const [isNightTime, setIsNightTime] = useState(false);
  const [precip, setPrecip] = useState('');

  useEffect(() => {
    if (typeof data !== 'undefined') {
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
        const icon: IconData = {
          url: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          description: data.weather[0].description,
        };

        setIconData(icon);

        // Check if the icon is a night icon
        if (data.weather[0].icon.indexOf('n') > -1) {
          setIsNightTime(true);
        }
      }

      if (showRain) {
        if (hasProp(data, 'rain')) {
          if (hasProp(data.rain, '1h')) {
            if (data.rain['1h'] < 1) {
              setPrecip('< 1');
            } else {
              setPrecip(data.rain['1h'].toFixed(0));
            }
          }
        } else {
          setPrecip('0');
        }
      }
    }
  }, [data]);
  // console.log('hour', data);

  const hourlyClasses = classNames({
    hourly__single: true,
    night: isNightTime,
  });

  return (
    <div className={hourlyClasses}>
      <p className="hourly__time">{time}</p>
      {iconData && (
        <img
          src={iconData.url}
          className="hourly__icon"
          alt={iconData.description}
          loading="lazy"
        />
      )}

      {showTemperature && (
        <div>
          <p className="hourly__temp">
            <strong>{data.temp.toFixed(1)}&deg;</strong>
          </p>

          <p className="hourly__feels-like">
            {data.feels_like.toFixed(1)}&deg;
          </p>
        </div>
      )}

      {showRain && (
        <div>
          <p className="hourly__rain">{(data.pop * 100).toFixed(0)}%</p>

          <p className="hourly__precip">{precip} mm</p>
        </div>
      )}

      {showWind && (
        <div>
          <p className="hourly__wind-speed">
            <WindInfo speed={data.wind_speed} degrees={data.wind_deg} />
          </p>
        </div>
      )}

      {showUvIndex && <UvIndex uv={data.uvi} />}

      {showClouds && <p className="hourly__clouds">{data.clouds}%</p>}

      {showPressure && <p className="hourly__pressure">{data.pressure} hPa</p>}
    </div>
  );
};

export default React.memo(HourlyBlock);

import React, { useState, useEffect } from 'react';
import { hasProp } from 'functions/hasProp';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import uvScale from 'functions/uvScale';
import { UvInfo } from 'types';

const TodaysWeather = ({ data, timezoneOffset }) => {
  console.log('today:', data);
  dayjs.extend(utc);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [uvIndexInfo, setUvIndexInfo] = useState<UvInfo | null>(null);

  useEffect(() => {
    if (hasProp(data, 'sunrise')) {
      setSunrise(
        dayjs
          .utc(data.sunrise * 1000)
          .add(timezoneOffset, 'second')
          .format('H:mma')
      );
    }

    if (hasProp(data, 'sunset')) {
      setSunset(
        dayjs
          .utc(data.sunset * 1000)
          .add(timezoneOffset, 'second')
          .format('H:mma')
      );
    }

    if (hasProp(data, 'uvi')) {
      setUvIndexInfo(uvScale(data.uvi));
    }
  }, []);
  return (
    <section className="daily">
      {hasProp(data, 'pop') && (
        <p className="daily__precip">{data.pop * 100}% of any rain</p>
      )}

      <details>
        <summary>Show more about today</summary>

        {sunrise && (
          <p className="daily__sunrise">
            <strong>{sunrise}</strong> sunrise
          </p>
        )}

        {sunset && (
          <p className="daily__sunset">
            <strong>{sunset}</strong> sunset
          </p>
        )}

        {uvIndexInfo && (
          <p className="daily__uv-index">
            <span className={`circle ${uvIndexInfo.description}`}></span>
            {uvIndexInfo.description}
          </p>
        )}
      </details>
    </section>
  );
};

export default TodaysWeather;

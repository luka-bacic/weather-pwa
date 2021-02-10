import React, { useState, useEffect } from 'react';
import { hasProp } from 'functions/hasProp';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import uvScale from 'functions/uvScale';
import { UvInfo, DailyResponse } from 'types';

type Props = {
  data: DailyResponse;
  timezoneOffset: number;
};

const TodaysWeather = ({ data, timezoneOffset }: Props) => {
  console.log('today:', data);
  dayjs.extend(utc);

  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [uvIndexInfo, setUvIndexInfo] = useState<UvInfo | null>(null);
  const [renderPrecip, setRenderPrecip] = useState(false);
  const [renderOther, setRenderOther] = useState(false);
  const [renderWind, setRenderWind] = useState(false);
  const [renderSunUv, setRenderSunUv] = useState(false);
  const [renderTemp, setRenderTemp] = useState(false);

  useEffect(() => {
    // Should the temperature section be rendered
    if (hasProp(data.temp, 'max') || hasProp(data.temp, 'min')) {
      setRenderTemp(true);
    }
    // Should the precipitation section be rendered
    if (
      hasProp(data, 'pop') ||
      hasProp(data, 'rain') ||
      hasProp(data, 'snow')
    ) {
      setRenderPrecip(true);
    }
    // Should the sun and UV section be rendered
    if (
      hasProp(data, 'sunrise') ||
      hasProp(data, 'sunset') ||
      hasProp(data, 'uvi')
    ) {
      setRenderSunUv(true);
    }
    // Should the wind section be rendered
    if (
      hasProp(data, 'wind_speed') ||
      hasProp(data, 'wind_gust') ||
      hasProp(data, 'wind_deg')
    ) {
      setRenderWind(true);
    }
    // Should the `other` section be rendered
    if (
      hasProp(data, 'clouds') ||
      hasProp(data, 'dew_point') ||
      hasProp(data, 'humidity') ||
      hasProp(data, 'pressure')
    ) {
      setRenderOther(true);
    }

    // Format sunrise time
    if (hasProp(data, 'sunrise')) {
      setSunrise(
        dayjs
          .utc(data.sunrise * 1000)
          .add(timezoneOffset, 'second')
          .format('H:mma')
      );
    }

    // Format sunset time
    if (hasProp(data, 'sunset')) {
      setSunset(
        dayjs
          .utc(data.sunset * 1000)
          .add(timezoneOffset, 'second')
          .format('H:mma')
      );
    }

    // Get UV danger rating and info
    if (hasProp(data, 'uvi')) {
      setUvIndexInfo(uvScale(data.uvi));
    }
  }, []);

  return (
    <section className="daily">
      {renderTemp && (
        <div className="daily__temperature">
          <h4>Temperature</h4>
          <div>
            {hasProp(data.temp, 'max') && (
              <p className="daily__max">{data.temp.max.toFixed(1)}&deg; max</p>
            )}
            {hasProp(data.temp, 'min') && (
              <p className="daily__min">{data.temp.min.toFixed(1)}&deg; min</p>
            )}
          </div>
        </div>
      )}

      {renderPrecip && (
        <div className="daily__precip">
          <h4>Precipitation</h4>
          {hasProp(data, 'pop') && (
            <p className="daily__precip">{data.pop * 100}% of any rain</p>
          )}
          {hasProp(data, 'rain') && (
            <p className="daily__rain">{data.pop}mm of rain</p>
          )}
          {hasProp(data, 'snow') && (
            <p className="daily__rain">{data.snow}mm of snow</p>
          )}
        </div>
      )}

      <details>
        <summary>Show more about today</summary>

        {renderSunUv && (
          <div className="daily__sun-uv">
            <h4>Sun and UV</h4>
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
                <span className={`circle ${uvIndexInfo.cssClass}`}></span>{' '}
                &nbsp;
                {uvIndexInfo.value}&nbsp;({uvIndexInfo.description})
              </p>
            )}
          </div>
        )}

        {renderWind && (
          <div className="daily__wind">
            <h4>Wind</h4>
            {hasProp(data, 'wind_speed') && (
              <p className="daily__wind-speed">
                {data.wind_speed} m/s wind speed
              </p>
            )}
            {hasProp(data, 'wind_gust') && (
              <p className="daily__wind-speed">
                {data.wind_gust} m/s wind gust
              </p>
            )}
            {hasProp(data, 'wind_deg') && (
              <p className="daily__wind-speed">
                {data.wind_deg} CONVERT DEGREES TO COMPASS{' '}
              </p>
            )}
          </div>
        )}

        {renderOther && (
          <div className="daily__other">
            <h4>Other</h4>
            {hasProp(data, 'clouds') && (
              <p className="daily__clouds">{data.clouds}% cloud cover</p>
            )}

            {hasProp(data, 'dew_point') && (
              <p className="daily__dew-point">
                {data.dew_point.toFixed(1)}&deg; dew point
              </p>
            )}
            {hasProp(data, 'humidity') && (
              <p className="daily__humidity">{data.humidity}% humidity</p>
            )}
            {hasProp(data, 'pressure') && (
              <p className="daily__pressure">{data.pressure} hPa</p>
            )}
          </div>
        )}
      </details>
    </section>
  );
};

export default TodaysWeather;

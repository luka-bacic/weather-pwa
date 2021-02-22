import React, { useState, useEffect } from 'react';
import { hasProp, round } from 'functions';
import WindInfo from 'components/weather/reusable/WindInfo';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DailyResponse } from 'types';
import UvIndex from './UvIndex';

type Props = {
  data: DailyResponse;
  timezoneOffset: number;
  hideTempAndPrecip?: boolean;
  title?: string;
};

const DailyBlock = ({
  data,
  timezoneOffset,
  hideTempAndPrecip,
  title,
}: Props) => {
  dayjs.extend(utc);

  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [renderPrecip, setRenderPrecip] = useState(false);
  const [renderOther, setRenderOther] = useState(false);
  const [renderWind, setRenderWind] = useState(false);
  const [renderSunUv, setRenderSunUv] = useState(false);
  const [renderTemp, setRenderTemp] = useState(false);
  const [btnTitle, setBtnTitle] = useState('');

  useEffect(() => {
    if (typeof data !== 'undefined') {
      if (!hideTempAndPrecip) {
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

      if (title) {
        setBtnTitle(title);
      } else {
        const today = dayjs().format('d');

        const passedInDay = dayjs
          .utc(data.dt * 1000)
          .add(timezoneOffset, 'second')
          .format('d');

        if (parseInt(passedInDay) - parseInt(today) === 1) {
          setBtnTitle('Tomorrow');
        } else {
          setBtnTitle(
            dayjs
              .utc(data.dt * 1000)
              .add(timezoneOffset, 'second')
              .format('dddd')
          );
        }
        // console.log(today);
      }
    }
  }, [data]);

  return (
    <section className="day">
      <details>
        <summary>{btnTitle}</summary>

        {!hideTempAndPrecip && (
          <>
            {renderTemp && (
              <div className="day__temperature">
                <h4>Temperature</h4>
                <div>
                  {hasProp(data.temp, 'max') && (
                    <p className="day__max">
                      {round(data.temp.max, 1)}&deg; max
                    </p>
                  )}
                  {hasProp(data.temp, 'min') && (
                    <p className="day__min">
                      {round(data.temp.min, 1)}&deg; min
                    </p>
                  )}
                </div>
              </div>
            )}

            {renderPrecip && (
              <div className="day__precip">
                <h4>Precipitation</h4>
                {hasProp(data, 'pop') && (
                  <p className="day__precip-chance">
                    {data.pop * 100}% chance of any rain
                  </p>
                )}
                {hasProp(data, 'rain') && (
                  <p className="day__rain">{data.rain}mm of rain</p>
                )}
                {hasProp(data, 'snow') && (
                  <p className="day__snow">{data.snow}mm of snow</p>
                )}
              </div>
            )}
          </>
        )}

        {renderSunUv && (
          <div className="day__sun-uv">
            <h4>Sun and UV</h4>
            {sunrise && (
              <p className="day__sunrise">
                <strong>{sunrise}</strong> sunrise
              </p>
            )}

            {sunset && (
              <p className="day__sunset">
                <strong>{sunset}</strong> sunset
              </p>
            )}

            {hasProp(data, 'uvi') && (
              <p className="day__uv-index">
                <UvIndex uv={data.uvi} />
              </p>
            )}
          </div>
        )}

        {renderWind && (
          <div className="day__wind">
            <h4>Wind</h4>
            <WindInfo degrees={data.wind_deg} speed={data.wind_speed} />

            {hasProp(data, 'wind_gust') && (
              <p className="day__wind-speed">{data.wind_gust} m/s wind gust</p>
            )}
          </div>
        )}

        {renderOther && (
          <div className="day__other">
            <h4>Other</h4>
            {hasProp(data, 'clouds') && (
              <p className="day__clouds">{data.clouds}% cloud cover</p>
            )}

            {hasProp(data, 'dew_point') && (
              <p className="day__dew-point">
                {round(data.dew_point, 1)}&deg; dew point
              </p>
            )}
            {hasProp(data, 'humidity') && (
              <p className="day__humidity">{data.humidity}% humidity</p>
            )}
            {hasProp(data, 'pressure') && (
              <p className="day__pressure">{data.pressure} hPa</p>
            )}
          </div>
        )}
      </details>
    </section>
  );
};

export default DailyBlock;

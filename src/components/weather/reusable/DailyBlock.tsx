import React, { useState, useEffect } from 'react';
import { getIconInfo, hasProp, round } from 'functions';
import WindInfo from 'components/weather/reusable/WindInfo';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DailyResponse, IconData } from 'types';
import UvIndex from './UvIndex';
import classNames from 'classnames';
import { MdKeyboardArrowDown } from 'react-icons/md';
type Props = {
  data: DailyResponse;
  timezoneOffset: number;
  single?: boolean;
  title?: string;
};

const DailyBlock = ({ data, timezoneOffset, single, title }: Props) => {
  dayjs.extend(utc);

  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [minTemp, setMinTemp] = useState<number | null>(null);
  const [maxTemp, setMaxTemp] = useState<number | null>(null);
  const [precip, setPrecip] = useState<number | null>(null);
  const [rain, setRain] = useState<number | null>(null);
  const [snow, setSnow] = useState<number | null>(null);
  const [iconData, setIconData] = useState<IconData | null>(null);
  const [renderPrecip, setRenderPrecip] = useState(false);
  const [renderOther, setRenderOther] = useState(false);
  const [renderWind, setRenderWind] = useState(false);
  const [renderSunUv, setRenderSunUv] = useState(false);
  const [renderTemp, setRenderTemp] = useState(false);
  const [btnTitle, setBtnTitle] = useState('');
  const [btnTitleDate, setBtnTitleDate] = useState('');

  useEffect(() => {
    if (typeof data !== 'undefined') {
      if (!single) {
        // Get weather icon data
        if (hasProp(data.weather[0], 'icon')) {
          // Get required icon data
          setIconData(getIconInfo(data.weather[0]));
        }

        // Should the temperature section be rendered
        if (hasProp(data.temp, 'max') || hasProp(data.temp, 'min')) {
          setRenderTemp(true);

          if (hasProp(data.temp, 'max')) {
            setMaxTemp(round(data.temp.max, 0));
          }

          if (hasProp(data.temp, 'min')) {
            setMinTemp(round(data.temp.min, 0));
          }
        }

        // Should the precipitation section be rendered
        if (
          hasProp(data, 'pop') ||
          hasProp(data, 'rain') ||
          hasProp(data, 'snow')
        ) {
          setRenderPrecip(true);

          if (hasProp(data, 'pop')) {
            setPrecip(round(data.pop * 100, 0));
          }
          if (hasProp(data, 'rain') && typeof data.rain !== 'undefined') {
            setRain(round(data.rain, 0));
          }
          if (hasProp(data, 'snow') && typeof data.snow !== 'undefined') {
            setSnow(round(data.snow, 0));
          }
        }

        // Set date to be appended when the details are opened
        setBtnTitleDate(
          dayjs
            .utc(data.dt * 1000)
            .add(timezoneOffset, 'second')
            .format('D MMMM')
        );
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

      // Set button title if it is passed in
      if (title) {
        setBtnTitle(title);
      } else {
        // If no title was passed in, write either 'Tomorrow' or the day name

        // Get today's day number (0-6)
        const today = dayjs().format('d');

        // Get passed in day's day number (0-6)
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
      }
    }
  }, [data]);

  const precipBackgroundClasses = classNames({
    'day__title-precip-background': true,
    'day--no-rain': precip !== null && precip <= 0.1 ? true : false,
  });

  return (
    <details className="day">
      <summary className="day__button">
        <span className="day__title-text">{btnTitle}</span>

        {!single && (
          <>
            {btnTitleDate && (
              <span className="day__title-date">{btnTitleDate}</span>
            )}

            <span className="day__title-info">
              {iconData !== null && (
                <img
                  className="day__title-icon"
                  src={iconData.url}
                  alt={iconData.description}
                />
              )}

              {minTemp !== null && (
                <span className="day__title-min">{minTemp}&deg;</span>
              )}

              {maxTemp !== null && (
                <span className="day__title-max">
                  <strong>{maxTemp}</strong>&deg;
                </span>
              )}

              {precip !== null && (
                <span className="day__title-precip">
                  <div
                    className={precipBackgroundClasses}
                    style={{ opacity: `${precip}%` }}
                  ></div>
                  <div className="day__title-precip-text">{precip}%</div>
                </span>
              )}
            </span>
          </>
        )}

        <MdKeyboardArrowDown className="day__title-marker" />
      </summary>

      {!single && (
        <>
          {renderTemp && (
            <div className="day__temperature">
              <h4>Temperature</h4>
              <div>
                {minTemp !== null && <div>{minTemp}&deg; min</div>}
                {maxTemp !== null && <div>{maxTemp}&deg; max</div>}
              </div>
            </div>
          )}

          {renderPrecip && (
            <div className="day__precip">
              <h4>Precipitation</h4>
              {precip !== null && (
                <p className="day__precip-chance">
                  {precip}% chance of any rain
                </p>
              )}
              {rain !== null && <p className="day__rain">{rain}mm of rain</p>}
              {snow !== null && <p className="day__snow">{snow}mm of snow</p>}
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
  );
};

export default DailyBlock;

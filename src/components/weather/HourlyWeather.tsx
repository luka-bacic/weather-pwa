import React, { useEffect, useState } from 'react';
import HourlyBlock from 'components/weather/reusable/HourlyBlock';
import { HourlyResponse, Day } from 'types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

type Props = {
  data: HourlyResponse[];
  timezoneOffset: number;
};
const HourlyWeather = ({ data, timezoneOffset }: Props) => {
  dayjs.extend(utc);
  console.log('hourly', data);

  const weekDays: Day[] = [];
  const today = dayjs().format('d');
  const [renderHours, setRenderHours] = useState<any[]>([]);
  // State for filters
  const [showTemperature, toggleShowTemperature] = useState(true);
  const [showRain, toggleShowRain] = useState(true);
  const [showWind, toggleShowWind] = useState(false);
  const [showUvIndex, toggleShowUvIndex] = useState(false);

  useEffect(() => {
    if (typeof data !== 'undefined') {
      // Group hours by weekday and add labels for days
      data.forEach(hour => {
        let dayToAdd: Day = {
          dayNumber: '',
          label: '',
          weather: [],
        };

        // Get day of week in form of number 0-6 (in string type)
        dayToAdd.dayNumber = dayjs
          .utc(hour.dt * 1000)
          .add(timezoneOffset, 'second')
          .format('d');

        // Get label of the day
        if (today === dayToAdd.dayNumber) {
          dayToAdd.label = 'Today';
        } else if (parseInt(dayToAdd.dayNumber) - parseInt(today) === 1) {
          dayToAdd.label = 'Tomorrow';
        } else {
          dayToAdd.label = dayjs
            .utc(hour.dt * 1000)
            .add(timezoneOffset, 'second')
            .format('dddd');
        }

        // Used for adding hours to their day
        let dayIndex = 0;

        // Check if the current value is already stored
        const isStored = weekDays.findIndex((day, i) => {
          dayIndex = i;
          return day.dayNumber === dayToAdd.dayNumber;
        });

        // Add current day if it isn't already stored
        if (isStored === -1) {
          weekDays.push(dayToAdd);
        }

        // Add hour data to the day it belongs
        weekDays[dayIndex].weather.push(hour);
      });

      // Create components to render hourly data
      setRenderHours(
        weekDays.map((day, i) => {
          const hours = day.weather.map((hour, j) => (
            <HourlyBlock
              data={hour}
              timezoneOffset={timezoneOffset}
              showRain={showRain}
              showTemperature={showTemperature}
              showWind={showWind}
              showUvIndex={showUvIndex}
              key={j}
            />
          ));

          return (
            <div className="hourly__day" key={i}>
              <h4>{day.label}</h4>
              <div className="hourly__hour-wrap">{hours}</div>
            </div>
          );
        })
      );
    }
  }, [data, showRain, showTemperature, showWind, showUvIndex]);

  return (
    <section className="hourly">
      <h3>Hourly forecast</h3>

      <div className="hourly__filters">
        <label htmlFor="rain">
          Show rain
          <input
            type="checkbox"
            name="rain"
            id="rain"
            onChange={() => toggleShowRain(prevState => !prevState)}
            checked={showRain}
          />
        </label>

        <label htmlFor="temperature">
          Show temperature
          <input
            type="checkbox"
            name="temperature"
            id="temperature"
            onChange={() => toggleShowTemperature(prevState => !prevState)}
            checked={showTemperature}
          />
        </label>

        <label htmlFor="wind">
          Show wind
          <input
            type="checkbox"
            name="wind"
            id="wind"
            onChange={() => toggleShowWind(prevState => !prevState)}
            checked={showWind}
          />
        </label>

        <label htmlFor="uv">
          Show UV
          <input
            type="checkbox"
            name="uv"
            id="uv"
            onChange={() => toggleShowUvIndex(prevState => !prevState)}
            checked={showUvIndex}
          />
        </label>
      </div>
      <div className="hourly__wrap">{renderHours.length && renderHours}</div>
    </section>
  );
};

export default HourlyWeather;

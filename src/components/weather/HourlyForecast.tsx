import React, { ReactElement, useEffect, useRef, useState } from 'react';
import HourlyBlock from 'components/weather/reusable/HourlyBlock';
import { HourlyResponse, Day } from 'types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { placeHourlyLabel } from 'functions';

type Props = {
  data: HourlyResponse[];
  timezoneOffset: number;
};

const HourlyForecast = ({ data, timezoneOffset }: Props) => {
  dayjs.extend(utc);

  // Refs
  const outerRef = useRef<HTMLDivElement>(null);
  const feelsLikeLabelRef = useRef<HTMLDivElement>(null);
  const tempLabelRef = useRef<HTMLDivElement>(null);

  const weekDays: Day[] = [];
  const today = dayjs().format('d');

  const [renderedHours, setRenderedHours] = useState<ReactElement[]>([]);
  // State for filters
  const [showTemperature, toggleShowTemperature] = useState(true);
  const [showPrecipitation, toggleShowPrecipitation] = useState(true);
  const [showWind, toggleShowWind] = useState(false);
  const [showUvIndex, toggleShowUvIndex] = useState(false);
  const [showClouds, toggleShowClouds] = useState(false);
  const [showPressure, toggleShowPressure] = useState(false);

  useEffect(() => {
    if (typeof data !== 'undefined') {
      // Group hours by the day and add labels for days
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

      // Create Hour components to render hourly data
      setRenderedHours(
        weekDays.map((day, i) => {
          const hours = day.weather.map((hour, j) => (
            <HourlyBlock
              data={hour}
              timezoneOffset={timezoneOffset}
              showPrecipitation={showPrecipitation}
              showTemperature={showTemperature}
              showWind={showWind}
              showUvIndex={showUvIndex}
              showClouds={showClouds}
              showPressure={showPressure}
              key={j}
            />
          ));

          return (
            <div className="hourly-forecast__day" key={i}>
              <h4>{day.label}</h4>
              <div className="hourly-forecast__hour-wrap">{hours}</div>
            </div>
          );
        })
      );
    }
  }, [
    data,
    showPrecipitation,
    showTemperature,
    showWind,
    showUvIndex,
    showClouds,
    showPressure,
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        if (outerRef.current !== null) {
          // Get top from the outer div
          const { top } = outerRef.current.getBoundingClientRect();

          // Set style for temperature label
          placeHourlyLabel(
            tempLabelRef,
            showTemperature,
            '.hourly-block__temp',
            top
          );

          // Set style for feels like label
          placeHourlyLabel(
            feelsLikeLabelRef,
            showTemperature,
            '.hourly-block__feels-like',
            top
          );
        }
      }, 0);
    }
    // console.log(document.querySelectorAll('.hourly-block__feels-like'));
  });

  return (
    <section className="hourly-forecast">
      <h3>Hourly forecast</h3>

      <div className="hourly-forecast__filters">
        <label htmlFor="temperature">
          Show temperature
          <input
            type="checkbox"
            name="filters"
            id="temperature"
            onChange={() => toggleShowTemperature(prevState => !prevState)}
            checked={showTemperature}
          />
        </label>

        <label htmlFor="rain">
          Show precipitation
          <input
            type="checkbox"
            name="filters"
            id="rain"
            onChange={() => toggleShowPrecipitation(prevState => !prevState)}
            checked={showPrecipitation}
          />
        </label>

        <label htmlFor="wind">
          Show wind
          <input
            type="checkbox"
            name="filters"
            id="wind"
            onChange={() => toggleShowWind(prevState => !prevState)}
            checked={showWind}
          />
        </label>

        <label htmlFor="uv">
          Show UV
          <input
            type="checkbox"
            name="filters"
            id="uv"
            onChange={() => toggleShowUvIndex(prevState => !prevState)}
            checked={showUvIndex}
          />
        </label>

        <label htmlFor="clouds">
          Show clouds
          <input
            type="checkbox"
            name="filters"
            id="clouds"
            onChange={() => toggleShowClouds(prevState => !prevState)}
            checked={showClouds}
          />
        </label>

        <label htmlFor="pressure">
          Show pressure
          <input
            type="checkbox"
            name="filters"
            id="pressure"
            onChange={() => toggleShowPressure(prevState => !prevState)}
            checked={showPressure}
          />
        </label>
      </div>

      <div className="hourly-forecast__outer" ref={outerRef}>
        <div className="hourly-forecast__wrap">
          {renderedHours.length && renderedHours}
        </div>

        <div className="hourly-forecast__labels">
          <div ref={tempLabelRef}>Temperature</div>
          <div ref={feelsLikeLabelRef}>Feels like</div>
        </div>
      </div>
    </section>
  );
};

export default HourlyForecast;

import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import HourlyBlock from 'components/weather/reusable/HourlyBlock';
import { HourlyResponse, Day } from 'types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { placeLabel } from 'functions';
import Filters from 'components/weather/Filters';
import { GlobalStateContext } from 'context';

type Props = {
  data: HourlyResponse[];
  timezoneOffset: number;
};

const HourlyForecast = ({ data, timezoneOffset }: Props) => {
  dayjs.extend(utc);

  // Global state
  const { filters } = useContext(GlobalStateContext);

  // Refs
  const outerRef = useRef<HTMLDivElement>(null);
  const feelsLikeLabelRef = useRef<HTMLDivElement>(null);
  const tempLabelRef = useRef<HTMLDivElement>(null);
  const precipChanceLabelRef = useRef<HTMLDivElement>(null);
  const rainfallLabelRef = useRef<HTMLDivElement>(null);
  const snowfallLabelRef = useRef<HTMLDivElement>(null);
  const windLabelRef = useRef<HTMLDivElement>(null);
  const uvLabelRef = useRef<HTMLDivElement>(null);
  const cloudLabelRef = useRef<HTMLDivElement>(null);
  const pressureLabelRef = useRef<HTMLDivElement>(null);

  const weekDays: Day[] = [];
  const today = dayjs().format('d');

  const [renderedHours, setRenderedHours] = useState<ReactElement[]>([]);

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
          const hours = day.weather.map((hour, j, allHours) => {
            // Used to hide the border of a data cell, so it looks
            // like it is a wide cell if the data is the same in 2 hours
            // const classes = shouldExtendCell(hour, j, allHours);
            const classes = {};
            return (
              <HourlyBlock
                data={hour}
                timezoneOffset={timezoneOffset}
                showPrecipChance={filters.precip.checked}
                showRainfall={filters.rain.checked}
                showSnowfall={filters.snow.checked}
                showTemperature={filters.temp.checked}
                showFeelsLike={filters.feelsLike.checked}
                showWind={filters.wind.checked}
                showUvIndex={filters.uv.checked}
                showClouds={filters.clouds.checked}
                showPressure={filters.pressure.checked}
                extendCells={classes}
                key={j}
              />
            );
          });

          return (
            <div className="hourly-forecast__day" key={i}>
              <h4>{day.label}</h4>
              <div className="hourly-forecast__hour-wrap">{hours}</div>
            </div>
          );
        })
      );
    }
  }, [data, filters]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        if (outerRef.current !== null) {
          // Get top from the outer div
          const { top } = outerRef.current.getBoundingClientRect();

          // Set style for temperature label
          placeLabel(
            tempLabelRef,
            filters.temp.checked,
            '.hourly-block__temp',
            top
          );

          // Set style for feels like label
          placeLabel(
            feelsLikeLabelRef,
            filters.feelsLike.checked,
            '.hourly-block__feels-like',
            top
          );

          // Set style for precip chance label
          placeLabel(
            precipChanceLabelRef,
            filters.precip.checked,
            '.hourly-block__precip-chance',
            top
          );

          // Set style for rainfall label
          placeLabel(
            rainfallLabelRef,
            filters.rain.checked,
            '.hourly-block__rain',
            top
          );

          // Set style for snowfall label
          placeLabel(
            snowfallLabelRef,
            filters.snow.checked,
            '.hourly-block__snow',
            top
          );

          // Set style for wind label
          placeLabel(
            windLabelRef,
            filters.wind.checked,
            '.hourly-block__wind-speed',
            top
          );

          // Set style for UV index label
          placeLabel(uvLabelRef, filters.uv.checked, '.hourly-block__uv', top);

          // Set style for cloud cover label
          placeLabel(
            cloudLabelRef,
            filters.clouds.checked,
            '.hourly-block__clouds',
            top
          );

          // Set style for cloud cover label
          placeLabel(
            cloudLabelRef,
            filters.clouds.checked,
            '.hourly-block__clouds',
            top
          );

          // Set style for pressure label
          placeLabel(
            pressureLabelRef,
            filters.pressure.checked,
            '.hourly-block__pressure',
            top
          );
        }
      }, 0);
    }
  });

  return (
    <section className="hourly-forecast">
      <h3>Hourly forecast</h3>

      <Filters />

      <div className="hourly-forecast__outer" ref={outerRef}>
        <div className="hourly-forecast__wrap">
          {renderedHours.length && renderedHours}
        </div>

        <div className="hourly-forecast__labels">
          <div ref={tempLabelRef}>Temperature</div>
          <div ref={feelsLikeLabelRef}>Feels like</div>
          <div ref={precipChanceLabelRef}>Precipitation chance</div>
          <div ref={rainfallLabelRef}>Rainfall</div>
          <div ref={snowfallLabelRef}>Snowfall</div>
          <div ref={windLabelRef}>Wind</div>
          <div ref={uvLabelRef}>UV index</div>
          <div ref={cloudLabelRef}>Cloud cover</div>
          <div ref={pressureLabelRef}>Pressure</div>
        </div>
      </div>
    </section>
  );
};

export default HourlyForecast;

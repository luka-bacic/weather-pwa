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
          const hours = day.weather.map((hour, j) => {
            // Used to hide the border of a data cell, so it looks
            // like it is a wide cell if the data is the same in 2 hours
            // const classes = shouldExtendCell(hour, j, allHours);
            const classes = {};
            if (i === 0 && j === 0) {
              if (outerRef.current !== null) {
                return (
                  <HourlyBlock
                    data={hour}
                    timezoneOffset={timezoneOffset}
                    filters={filters}
                    extendCells={classes}
                    addLabel={true}
                    outerWrapRef={outerRef}
                    key={j}
                  />
                );
              }
            } else {
              return (
                <HourlyBlock
                  data={hour}
                  timezoneOffset={timezoneOffset}
                  filters={filters}
                  extendCells={classes}
                  key={j}
                />
              );
            }
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

  return (
    <section className="hourly-forecast">
      <h3>Hourly forecast</h3>

      <Filters />

      <div className="hourly-forecast__outer" ref={outerRef}>
        <div className="hourly-forecast__wrap">
          {renderedHours.length && renderedHours}
        </div>
      </div>
    </section>
  );
};

export default HourlyForecast;

import React, { useEffect, useState } from 'react';
import HourlyBlock from 'components/weather/reusable/HourlyBlock';
import { HourlyResponse, Day } from 'types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { weekdays } from 'dayjs/locale/*';

type Props = {
  data: HourlyResponse[];
  timezoneOffset: number;
};
const HourlyWeather = ({ data, timezoneOffset }: Props) => {
  dayjs.extend(utc);
  // console.log('hourly', data);

  const weekDays: Day[] = [];
  const today = dayjs().format('d');
  const [renderHours, setRenderHours] = useState<any[]>([]);
  useEffect(() => {
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
          <HourlyBlock data={hour} timezoneOffset={timezoneOffset} key={j} />
        ));

        return (
          <div className="hourly__day" key={i}>
            <h4>{day.label}</h4>
            <div className="hourly__hour-wrap">{hours}</div>
          </div>
        );
      })
    );
  }, [data]);

  return (
    <section className="hourly">
      <h3>Hourly forecast</h3>
      <div className="hourly__wrap">{renderHours.length && renderHours}</div>
    </section>
  );
};

export default HourlyWeather;

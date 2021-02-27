import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';

type Props = {
  timezoneOffset: number;
  lastUpdated: number;
};

const ForecastTime = ({ timezoneOffset, lastUpdated }: Props) => {
  dayjs.extend(utc);
  dayjs.extend(advancedFormat);

  const lastChecked = dayjs
    .utc(lastUpdated)
    .add(timezoneOffset, 'second')
    .format('h:mma [on the] Do [of] MMMM');

  return (
    <section className="forecast-time">
      <small>Last updated at {lastChecked}</small>
      <small>
        Disclaimer: the forecast is updated once every 2 hours. This is a
        limitation of the service offering the weather forecast, as this app is
        using a free tier plan.
      </small>
    </section>
  );
};

export default ForecastTime;

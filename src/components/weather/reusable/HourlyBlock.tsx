import React, { useEffect, useState } from 'react';
import { HourlyResponse } from 'types';
import { hasProp } from 'functions/hasProp';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

type Props = {
  data: HourlyResponse;
  timezoneOffset: number;
};

const HourlyBlock = ({ data, timezoneOffset }: Props) => {
  dayjs.extend(utc);

  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(
      dayjs
        .utc(data.dt * 1000)
        .add(timezoneOffset, 'second')
        .format('ha')
    );
  });
  // console.log('hour', data);

  return <div className="hourly__single">{time}</div>;
};

export default HourlyBlock;

import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { DailyResponse } from 'types';
import DailyBlock from 'components/weather/reusable/DailyBlock';
type Props = {
  data: DailyResponse[];
  timezoneOffset: number;
  withoutFirst?: boolean;
};

const DailyForecast = ({ data, timezoneOffset, withoutFirst }: Props) => {
  const [days, setDays] = useState<ReactElement[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      if (withoutFirst) {
        // Map without the first day
        setDays(
          data.slice(1).map((day, i) => {
            return (
              <DailyBlock data={day} timezoneOffset={timezoneOffset} key={i} />
            );
          })
        );
      } else {
        setDays(
          data.map((day, i) => {
            return (
              <DailyBlock data={day} timezoneOffset={timezoneOffset} key={i} />
            );
          })
        );
      }
    }
  }, [data, timezoneOffset]);

  return (
    <section className="daily">
      <h3>Daily forecast</h3>

      {days.length > 0 && days}
    </section>
  );
};

export default DailyForecast;

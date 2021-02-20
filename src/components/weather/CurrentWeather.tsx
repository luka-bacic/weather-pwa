import React from 'react';
import { hasProp, round } from 'functions';
import { CurrentResponse } from 'types';

type Props = {
  data: CurrentResponse;
};

const CurrentWeather = ({ data }: Props) => {
  // console.log('now', data);
  return (
    <section className="current">
      {hasProp(data, 'temp') && (
        <div className="current__temperature">{round(data.temp, 1)}&deg;</div>
      )}

      {hasProp(data, 'feels_like') && (
        <div className="current__feels-like">
          Feels like <strong>{round(data.feels_like, 1)}&deg;</strong>
        </div>
      )}
    </section>
  );
};

export default CurrentWeather;

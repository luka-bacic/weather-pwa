import React from 'react';
import { hasProp, round } from 'functions';
import { CurrentResponse } from 'types';

type Props = {
  data: CurrentResponse;
};

const CurrentWeather = ({ data }: Props) => {
  console.log('now', data);
  return (
    <section className="current">
      {hasProp(data, 'temp') && (
        <p className="currently__temperature">{round(data.temp, 1)}&deg;</p>
      )}

      {hasProp(data, 'feels_like') && (
        <p className="current__feels-like">
          Feels like {round(data.feels_like, 1)}&deg;
        </p>
      )}

      {hasProp(data.weather[0], 'description') && (
        <p className="current__description">{data.weather[0].description}</p>
      )}
    </section>
  );
};

export default CurrentWeather;

import React from 'react';
import { hasProp } from 'functions/hasProp';

const CurrentWeather = ({ data }) => {
  // console.log('now', data);
  return (
    <section className="current">
      {hasProp(data, 'temp') && (
        <p className="currently__temperature">{data.temp}&deg;</p>
      )}

      {hasProp(data, 'feels_like') && (
        <p className="current__feels-like">Feels like {data.feels_like}&deg;</p>
      )}

      {hasProp(data.weather[0], 'description') && (
        <p className="current__description">{data.weather[0].description}</p>
      )}
    </section>
  );
};

export default CurrentWeather;

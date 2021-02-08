import React from 'react';
import { hasProp } from 'functions/hasProp';

const CurrentWeather = ({ data }) => {
  console.log(data);
  return (
    <section className="currently">
      {hasProp(data, 'temp') && (
        <p className="currently__temperature">{data.temp}&deg;</p>
      )}

      {hasProp(data, 'feels_like') && (
        <p className="currently__feels-like">
          Feels like {data.feels_like}&deg;
        </p>
      )}

      {hasProp(data.weather, 'description') && (
        <p className="currently__description">{data.weather.description}</p>
      )}
    </section>
  );
};

export default CurrentWeather;

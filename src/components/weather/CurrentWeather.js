import React from 'react';
import { hasProp } from 'functions/hasProp';

const CurrentWeather = ({ data }) => {
  console.log(data);
  return (
    <section className="currently">
      {hasProp(data, 'temperature') && (
        <p className="currently__temperature">{data.temperature}&deg;</p>
      )}

      {hasProp(data, 'apparentTemperature') && (
        <p className="currently__apparent-temperature">
          Feels like {data.apparentTemperature}&deg;
        </p>
      )}

      {hasProp(data, 'summary') && (
        <p className="currently__summary">{data.summary}</p>
      )}
    </section>
  );
};

export default CurrentWeather;

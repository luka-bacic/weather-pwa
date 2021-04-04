import React from 'react';
import WeatherInfo from 'components/weather/WeatherInfo';
import { Helmet } from 'react-helmet';

const Index = () => {
  return (
    <>
      <WeatherInfo />

      <Helmet>
        <title>Weather</title>
        <meta
          name="description"
          content="See detailed weather forecast up to a week in advance."
        />
      </Helmet>
    </>
  );
};

export default Index;

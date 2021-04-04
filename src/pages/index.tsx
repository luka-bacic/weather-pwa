import React from 'react';
import WeatherInfo from 'components/weather/WeatherInfo';
import SEO from 'components/misc/SEO';

const Index = () => {
  return (
    <>
      <WeatherInfo />

      <SEO pathname="/" />
    </>
  );
};

export default Index;

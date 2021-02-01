import React, { useEffect, useContext } from 'react';
import WeatherInfo from 'components/WeatherInfo';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';

const Index = () => {
  const dispatch = useContext(GlobalDispatchContext);

  useEffect(() => {
    dispatch({ type: 'GET_LOCAL_DATA' });
  }, []);

  return <WeatherInfo />;
};

export default Index;

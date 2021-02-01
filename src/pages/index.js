import React, { useEffect, useContext } from 'react';
import WeatherInfo from 'components/WeatherInfo';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';
import Layout from '../components/Layout';

const Index = () => {
  const dispatch = useContext(GlobalDispatchContext);

  useEffect(() => {
    dispatch({ type: 'GET_LAST_ACTIVE_LOCATION' });
  }, []);

  return (
    <Layout>
      <WeatherInfo />
    </Layout>
  );
};

export default Index;

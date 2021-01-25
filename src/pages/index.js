import React, { useContext } from 'react';
import GoogleMap from 'components/GoogleMap';
import 'scss/style.scss';
// import { Link } from 'gatsby';
import Layout from 'components/Layout';
import { GlobalDispatchContext } from 'context/GlobalContextProvider';

const IndexPage = () => {
  const dispatch = useContext(GlobalDispatchContext);

  const fetchWeather = () => {
    dispatch({ type: 'FETCH_WEATHER' });
  };

  return (
    <Layout>
      <GoogleMap />
      <button type="button" className={'btn mx-auto'} onClick={fetchWeather}>
        fetch
      </button>
      {/* <Link to="/now/" className={'btn mx-auto'}>
        See weather
      </Link> */}
    </Layout>
  );
};

export default IndexPage;

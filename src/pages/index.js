import React from 'react';
import GoogleMap from 'components/GoogleMap';
import 'scss/style.scss';
import { Link } from 'gatsby';
import Layout from 'components/Layout';

const IndexPage = () => {
  return (
    <Layout>
      <GoogleMap />
      <Link to="/now/" className={'btn mx-auto'}>
        See weather
      </Link>
    </Layout>
  );
};

export default IndexPage;

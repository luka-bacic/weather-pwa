import React from 'react';
import GoogleMap from 'components/GoogleMap';
import 'scss/style.scss';
import Layout from 'components/Layout';

const IndexPage = () => {
  return (
    <Layout>
      <GoogleMap />
    </Layout>
  );
};

export default IndexPage;

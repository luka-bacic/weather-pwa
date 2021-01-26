import React from 'react';
import GlobalContextProvider from './src/context/GlobalContextProvider';
import Layout from 'components/Layout';

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

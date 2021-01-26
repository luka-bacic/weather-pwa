const React = require('react');
const GlobalContextProvider = require('./src/context/GlobalContextProvider');
const Layout = require('./src/components/Layout').default;

exports.wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};

exports.wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

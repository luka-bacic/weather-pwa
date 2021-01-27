import React from 'react';
import Nav from 'components/Nav';
import 'scss/style.scss';

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
};

export default Layout;

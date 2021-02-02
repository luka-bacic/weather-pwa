import React, { useEffect, useContext } from 'react';
import Nav from 'components/Nav';
import { GlobalDispatchContext } from '../context/GlobalContextProvider';
import 'scss/style.scss';

const Layout = ({ children }) => {
  const dispatch = useContext(GlobalDispatchContext);

  useEffect(() => {
    dispatch({ type: 'GET_LOCAL_DATA' });
  }, []);

  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
};

export default Layout;

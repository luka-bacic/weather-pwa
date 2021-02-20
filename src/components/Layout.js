import React, { useEffect, useContext } from 'react';
import Nav from 'components/Nav';
import Toast from 'components/Toast';
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from '../context/GlobalContextProvider';
import 'scss/style.scss';
import 'focus-visible';

// Fonts
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Layout = ({ children }) => {
  const dispatch = useContext(GlobalDispatchContext);
  const { message } = useContext(GlobalStateContext);

  useEffect(() => {
    dispatch({ type: 'GET_LOCAL_DATA' });
  }, [message]); // eslint-disable-line

  return (
    <>
      <Nav />
      {message && <Toast message={message} />}
      <main>{children}</main>
    </>
  );
};

export default Layout;

import React, { useEffect, useContext, ReactElement } from 'react';
import Header from './Header';
import Toast from 'components/Toast';
import { GlobalDispatchContext, GlobalStateContext } from 'context';
import {
  loadOldActiveWeather,
  loadOldMapData,
  loadSavedLocations,
} from '../../context/actions';
import 'scss/style.scss';
import 'focus-visible';

// Fonts
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props) => {
  const dispatch = useContext(GlobalDispatchContext);
  const { message } = useContext(GlobalStateContext);

  console.log(message);
  useEffect(() => {
    // Load saved locations into state
    dispatch(loadSavedLocations());

    // Load old active weather data into state
    dispatch(loadOldActiveWeather());

    // Load old map data into state
    dispatch(loadOldMapData());
  }, [dispatch]);

  return (
    <>
      <Header />
      {message && <Toast message={message} />}
      <main>{children}</main>
    </>
  );
};

export default Layout;

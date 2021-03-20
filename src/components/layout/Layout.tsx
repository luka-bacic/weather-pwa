import React, { useEffect, useContext, ReactElement, useRef } from 'react';
import Header from './Header';
import Toast from 'components/Toast';
import { GlobalDispatchContext, GlobalStateContext } from 'context';
import {
  loadOldActiveWeather,
  loadOldMapData,
  loadSavedLocations,
  setPageWidth,
} from 'context/actions';
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

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load saved locations into state
    dispatch(loadSavedLocations());

    // Load old active weather data into state
    dispatch(loadOldActiveWeather());

    // Load old map data into state
    dispatch(loadOldMapData());
  }, [dispatch]);

  useEffect(() => {
    // Get width of content
    if (mainRef.current !== null) {
      dispatch(setPageWidth(mainRef.current.offsetWidth));
    }
  }, [mainRef.current]);

  return (
    <>
      <Header />
      <main ref={mainRef}>{children}</main>
      {message.type !== '' && <Toast message={message} />}
    </>
  );
};

export default Layout;

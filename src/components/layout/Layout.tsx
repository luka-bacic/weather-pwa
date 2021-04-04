import React, { useEffect, useContext, ReactElement, useRef } from 'react';
import Header from './Header';
import Toast from 'components/misc/Toast';
import { GlobalDispatchContext, GlobalStateContext } from 'context';
import {
  loadOldActiveWeather,
  loadOldMapData,
  loadSavedLocations,
  setPageWidth,
} from 'context/actions';
import 'scss/style.scss';
import 'focus-visible';
import { Helmet } from 'react-helmet';

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
      <main ref={mainRef} className="container">
        {children}
      </main>
      {message.type !== '' && <Toast message={message} />}

      <Helmet>
        <title>Weather</title>
        <meta
          name="description"
          content="View weather forecasts at any location in the world. Install it on your phone and use it like a mobile app"
        />
      </Helmet>
    </>
  );
};

export default Layout;

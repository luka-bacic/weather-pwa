import React, { useEffect, useContext, ReactElement } from 'react';
import Header from './Header';
// import Toast from 'components/Toast';
import { GlobalDispatchContext, GlobalStateContext } from 'context';
import { setWeather, updateMapData, loadSavedLocations } from 'context/actions';
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
  // const { message } = useContext(GlobalStateContext);

  useEffect(() => {
    // Load saved locations into state
    const oldSavedRaw = localStorage.getItem('savedLocations');

    if (oldSavedRaw) {
      const oldSaved = JSON.parse(oldSavedRaw);

      dispatch(loadSavedLocations(oldSaved));
    }

    // Load old active weather data into state
    const oldWeatherRaw = localStorage.getItem('activeLocation');

    if (oldWeatherRaw) {
      const oldWeather = JSON.parse(oldWeatherRaw);
      dispatch(setWeather(oldWeather));
    }

    // Load old map data into state
    const oldMapRaw = localStorage.getItem('lastMapData');

    if (oldMapRaw) {
      const oldMap = JSON.parse(oldMapRaw);
      dispatch(updateMapData(oldMap));
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      {/* {message && <Toast message={message} />} */}
      <main>{children}</main>
    </>
  );
};

export default Layout;

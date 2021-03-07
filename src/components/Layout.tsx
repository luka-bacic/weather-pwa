import React, { useEffect, useContext, ReactElement } from 'react';
import Nav from 'components/Nav';
// import Toast from 'components/Toast';
import { GlobalDispatchContext, GlobalStateContext } from 'context';
import { setWeather, updateMapData } from 'context/actions';
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
    // Load old weather data into state
    const oldWeatherRaw = localStorage.getItem('activeWeather');

    if (oldWeatherRaw) {
      const oldWeather = JSON.parse(oldWeatherRaw);
      dispatch(setWeather(oldWeather));
    }

    // Load old map data into state
    const oldMapRaw = localStorage.getItem('activeWeather');

    if (oldMapRaw) {
      const oldMap = JSON.parse(oldMapRaw);
      dispatch(updateMapData(oldMap));
    }
  }, [dispatch]);

  return (
    <>
      <Nav />
      {/* {message && <Toast message={message} />} */}
      <main>{children}</main>
    </>
  );
};

export default Layout;

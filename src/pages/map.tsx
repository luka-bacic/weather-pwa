import React, { useContext, useEffect } from 'react';
import WorldMap from '../components/WorldMap';
import { GlobalDispatchContext } from 'context';
import { setPageName } from 'context/actions';
import { Helmet } from 'react-helmet';

const PickLocation = () => {
  const dispatch = useContext(GlobalDispatchContext);

  useEffect(() => {
    dispatch(setPageName('Pick location'));
  }, [dispatch]);

  return (
    <div>
      {/* Render the map only in client - react-leaflet doesn't support SSR */}
      {typeof window !== 'undefined' ? (
        <WorldMap />
      ) : (
        'Pick a location from the map to see the weather'
      )}

      <Helmet>
        <title>Pick location | Weather</title>
        <meta
          name="description"
          content="Pick any location in the world to see a detailed weather forecast up to a week in advance."
        />
      </Helmet>
    </div>
  );
};

export default PickLocation;

import React, { useContext, useEffect } from 'react';
import WorldMap from '../components/WorldMap';
import { GlobalDispatchContext } from 'context';
import { setPageName } from 'context/actions';

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
    </div>
  );
};

export default PickLocation;

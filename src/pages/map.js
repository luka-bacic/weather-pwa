import React from 'react';
import WorldMap from '../components/WorldMap';

const pickLocation = () => {
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

export default pickLocation;

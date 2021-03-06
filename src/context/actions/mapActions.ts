import { MapState, MapAction } from 'types';

export const updateMapData = (mapData: MapState): MapAction => {
  // Save for offline usage
  localStorage.setItem('lastMapData', JSON.stringify(mapData));

  return {
    type: 'UPDATE_MAP_DATA',
    payload: mapData,
  };
};

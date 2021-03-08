import { Dispatch } from 'redux';
import { MapState, MapAction } from 'types';

// Load old map data into state
export const loadOldMapData = () => {
  return function (dispatch: Dispatch) {
    const oldMapRaw = localStorage.getItem('lastMapData');

    if (oldMapRaw) {
      const oldMap = JSON.parse(oldMapRaw);
      dispatch({
        type: 'UPDATE_MAP_DATA',
        payload: oldMap,
      });
    }
  };
};

export const updateMapData = (mapData: MapState): MapAction => {
  // Save for offline usage
  localStorage.setItem('lastMapData', JSON.stringify(mapData));

  return {
    type: 'UPDATE_MAP_DATA',
    payload: mapData,
  };
};

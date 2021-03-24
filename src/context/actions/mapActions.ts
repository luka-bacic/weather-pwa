import { Dispatch } from 'redux';
import { PartialMapState, MapAction } from 'types';

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

export const updateMapData = (mapData: PartialMapState): MapAction => {
  // Get previous offline data
  const oldMapDataRaw = localStorage.getItem('lastMapData');

  if (oldMapDataRaw) {
    const oldMapData = JSON.parse(oldMapDataRaw);

    const newData = {
      ...oldMapData,
      ...mapData,
    };

    // Save for offline usage
    localStorage.setItem('lastMapData', JSON.stringify(newData));

    return {
      type: 'UPDATE_MAP_DATA',
      payload: newData,
    };
  } else {
    // Save for offline usage
    localStorage.setItem('lastMapData', JSON.stringify(mapData));

    return {
      type: 'UPDATE_MAP_DATA',
      payload: mapData,
    };
  }
};

import { MapAction, MapState, PartialMapState } from 'types';
import { initialMapState } from 'context/initialState';

export function mapReducer(
  state = initialMapState,
  action: MapAction
): MapState | PartialMapState {
  switch (action.type) {
    case 'UPDATE_MAP_DATA': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

import { MapAction, MapState } from 'types';
import { initialMapState } from 'context/initialState';

export function messageReducer(
  state = initialMapState,
  action: MapAction
): MapState {
  switch (action.type) {
    case 'SET_MESSAGE': {
      console.log('inside set message reducer');
      return {
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

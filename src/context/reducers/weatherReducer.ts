import {
  SetActiveWeatherAction,
  WeatherState,
  SaveLocationAction,
  LoadSavedLocationAction,
} from 'types';
import { initialWeatherState } from 'context/initialState';

export function weatherReducer(
  state = initialWeatherState,
  action: SetActiveWeatherAction | SaveLocationAction | LoadSavedLocationAction
): WeatherState {
  switch (action.type) {
    case 'SET_ACTIVE_WEATHER': {
      return {
        ...state,
        activeLocation: {
          ready: true,
          forecast: {
            ...action.payload,
          },
        },
      };
    }

    case 'LOAD_SAVED_LOCATIONS': {
      return {
        ...state,
        savedLocations: action.payload,
      };
    }

    case 'SAVE_LOCATION': {
      return {
        ...state,
        savedLocations: [...action.payload],
      };
    }
    default: {
      return state;
    }
  }
}

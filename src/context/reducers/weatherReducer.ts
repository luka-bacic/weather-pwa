import {
  SetActiveWeatherAction,
  WeatherState,
  SaveLocationAction,
  LoadSavedLocationAction,
  RenameLocationAction,
  NoOldSavedLocationsAction,
  DeleteLocationAction,
} from 'types';
import { initialWeatherState } from 'context/initialState';

export function weatherReducer(
  state = initialWeatherState,
  action:
    | SetActiveWeatherAction
    | SaveLocationAction
    | LoadSavedLocationAction
    | RenameLocationAction
    | NoOldSavedLocationsAction
    | DeleteLocationAction
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

    case 'SAVE_LOCATION':
    case 'RENAME_LOCATION':
    case 'DELETE_LOCATION': {
      return {
        ...state,
        savedLocations: [...action.payload],
      };
    }

    case 'NO_OLD_SAVED_LOCATIONS_ACTION':
    default: {
      return state;
    }
  }
}

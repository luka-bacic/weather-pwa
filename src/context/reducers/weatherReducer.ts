import { WeatherAction, initialWeatherState, WeatherState } from 'types';

const initialState: initialWeatherState = null;

export function weatherReducer(
  state = initialState,
  action: WeatherAction
): WeatherState | initialWeatherState {
  switch (action.type) {
    case 'SET_WEATHER': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return null;
    }
  }
}

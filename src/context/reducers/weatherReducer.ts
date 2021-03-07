import { WeatherAction, WeatherState } from 'types';
import { initialWeatherState } from 'context/initialState';

export function weatherReducer(
  state = initialWeatherState,
  action: WeatherAction
): WeatherState {
  switch (action.type) {
    case 'SET_WEATHER': {
      return {
        ...state,
        ready: true,
        activeWeather: {
          ...action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
}

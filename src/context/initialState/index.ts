import { WeatherState, GlobalState } from 'types';

export const initialWeatherState: WeatherState = {
  ready: false,
};

export const initialGlobalState: GlobalState = {
  weather: initialWeatherState,
};

export const initialDispatch = () => {};

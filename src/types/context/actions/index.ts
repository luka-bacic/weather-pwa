import { LocationInfo } from 'types';

// Actions
export interface WeatherAction {
  type: 'SET_WEATHER';
  payload: LocationInfo;
}

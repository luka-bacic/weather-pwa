import { LocationInfo, MapState } from 'types';

// Actions
export interface WeatherAction {
  type: 'SET_WEATHER';
  payload: LocationInfo;
}

export interface MapAction {
  type: 'UPDATE_MAP_DATA';
  payload: MapState;
}

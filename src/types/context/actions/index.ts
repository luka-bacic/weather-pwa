import { LocationInfo, MapState, FilterData } from 'types';

export interface SetActiveWeatherAction {
  type: 'SET_ACTIVE_WEATHER';
  payload: LocationInfo;
}

export interface LoadSavedLocationAction {
  type: 'LOAD_SAVED_LOCATIONS';
  payload: LocationInfo[];
}

export interface SaveLocationAction {
  type: 'SAVE_LOCATION';
  payload: LocationInfo[];
}

export interface MapAction {
  type: 'UPDATE_MAP_DATA';
  payload: MapState;
}

export interface FilterAction {
  type: 'UPDATE_FILTER';
  payload: FilterData;
}

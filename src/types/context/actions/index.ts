import { LocationInfo, MapState, FilterIdentifier } from 'types';

export interface WeatherAction {
  type: 'SET_WEATHER';
  payload: LocationInfo;
}

export interface MapAction {
  type: 'UPDATE_MAP_DATA';
  payload: MapState;
}

export interface FilterAction {
  type: 'UPDATE_FILTER';
  payload: FilterIdentifier;
}

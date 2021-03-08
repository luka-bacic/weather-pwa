import {
  LocationInfo,
  MapState,
  PartialMapState,
  FilterData,
  MessageState,
} from 'types';

// Weather actions
export interface SetActiveWeatherAction {
  type: 'SET_ACTIVE_WEATHER';
  payload: LocationInfo;
}

export interface LoadSavedLocationAction {
  type: 'LOAD_SAVED_LOCATIONS';
  payload: LocationInfo[];
}

export interface NoOldSavedLocationsAction {
  type: 'NO_OLD_SAVED_LOCATIONS_ACTION';
}

export interface SaveLocationAction {
  type: 'SAVE_LOCATION';
  payload: LocationInfo[];
}

// Map actions
export interface MapAction {
  type: 'UPDATE_MAP_DATA';
  payload: MapState | PartialMapState;
}

// Filter actions
export interface FilterAction {
  type: 'UPDATE_FILTER';
  payload: FilterData;
}

// Message actions
export interface SetMessageAction {
  type: 'SET_MESSAGE';
  payload: MessageState;
}

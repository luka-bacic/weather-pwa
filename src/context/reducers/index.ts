import { combineReducers } from 'redux';
import { weatherReducer } from './weatherReducer';
import { mapReducer } from './mapReducer';
import { filterReducer } from './filterReducer';

export const rootReducer = combineReducers({
  weather: weatherReducer,
  mapData: mapReducer,
  filters: filterReducer,
});

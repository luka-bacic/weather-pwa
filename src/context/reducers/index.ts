import { weatherReducer } from './weatherReducer';
import { mapReducer } from './mapReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  weather: weatherReducer,
  mapData: mapReducer,
});

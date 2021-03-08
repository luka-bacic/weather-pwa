import { combineReducers } from 'redux';
import { weatherReducer } from './weatherReducer';
import { mapReducer } from './mapReducer';
import { filterReducer } from './filterReducer';
import { messageReducer } from './messageReducer';

export const rootReducer = combineReducers({
  weather: weatherReducer,
  mapData: mapReducer,
  filters: filterReducer,
  message: messageReducer,
});

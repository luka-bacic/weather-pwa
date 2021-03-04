import { weatherReducer } from './weatherReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  weather: weatherReducer,
});

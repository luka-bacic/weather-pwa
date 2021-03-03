import { ActionObject } from 'types';

export const combineReducers = reducers => {
  return (state = {}, action: ActionObject) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

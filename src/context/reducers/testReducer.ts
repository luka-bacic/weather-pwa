import { ActionObject } from 'types';

const initialState = {
  test: null,
};

export function testReducer(state = initialState, action: ActionObject) {
  switch (action.type) {
    case 'TEST': {
      return {
        ...state,
        test: 'worked!',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}

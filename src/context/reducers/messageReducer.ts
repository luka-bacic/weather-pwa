import { SetMessageAction, MessageState } from 'types';
import { initialMessageState } from 'context/initialState';

export function messageReducer(
  state = initialMessageState,
  action: SetMessageAction
): MessageState {
  switch (action.type) {
    case 'SET_MESSAGE': {
      console.log('inside set message reducer');
      return {
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

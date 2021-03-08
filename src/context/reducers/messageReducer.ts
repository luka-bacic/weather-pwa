import { SetMessageAction, MessageState } from 'types';
import { initialMessageState } from 'context/initialState';

export function messageReducer(
  state = initialMessageState,
  action: SetMessageAction
): MessageState {
  switch (action.type) {
    case 'SET_MESSAGE': {
      return {
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

import { MessageState, SetMessageAction } from 'types';

export const setMessage = (msgData: MessageState): SetMessageAction => {
  return {
    type: 'SET_MESSAGE',
    payload: msgData,
  };
};

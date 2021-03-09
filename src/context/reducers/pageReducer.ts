import { SetPageNameAction, PageState } from 'types';
import { initialPageState } from 'context/initialState';

export function pageReducer(
  state = initialPageState,
  action: SetPageNameAction
): PageState {
  switch (action.type) {
    case 'SET_PAGE_NAME': {
      return {
        ...state,
        name: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

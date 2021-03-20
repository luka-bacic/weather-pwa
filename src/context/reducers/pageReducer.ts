import { SetPageNameAction, PageState, SetPageWidthAction } from 'types';
import { initialPageState } from 'context/initialState';

export function pageReducer(
  state = initialPageState,
  action: SetPageNameAction | SetPageWidthAction
): PageState {
  switch (action.type) {
    case 'SET_PAGE_NAME': {
      return {
        ...state,
        name: action.payload,
      };
    }
    case 'SET_PAGE_WIDTH': {
      return {
        ...state,
        width: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

import { FilterAction, FilterState } from 'types';
import { initialFilterState } from 'context/initialState';

export function filterReducer(
  state = initialFilterState,
  action: FilterAction
): FilterState {
  switch (action.type) {
    case 'UPDATE_FILTER': {
      return {
        ...state,
        ...{
          [action.payload.id]: action.payload.value,
        },
      };
    }
    default: {
      return state;
    }
  }
}

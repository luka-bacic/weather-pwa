import { FilterAction, FilterState } from 'types';
import { initialFilterState } from 'context/initialState';

export function filterReducer(
  state = initialFilterState,
  action: FilterAction
): FilterState {
  switch (action.type) {
    case 'UPDATE_FILTER': {
      console.log('PAYLOD', action.payload);
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          checked: action.payload.value,
        },
      };
    }
    default: {
      return state;
    }
  }
}

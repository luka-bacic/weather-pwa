import { FilterAction, FilterState } from 'types';
import { initialFilterState } from 'context/initialState';

export function filterReducer(
  state = initialFilterState,
  action: FilterAction
): FilterState {
  switch (action.type) {
    case 'UPDATE_FILTER': {
      if (
        action.payload.id === 'temp' ||
        action.payload.id === 'feelsLike' ||
        action.payload.id === 'precip' ||
        action.payload.id === 'rain' ||
        action.payload.id === 'snow' ||
        action.payload.id === 'wind' ||
        action.payload.id === 'uv' ||
        action.payload.id === 'clouds' ||
        action.payload.id === 'pressure'
      ) {
        return {
          ...state,
          [action?.payload?.id]: {
            ...state[action.payload.id],
            checked: action.payload.value,
          },
        };
      }
    }
    default: {
      return state;
    }
  }
}

import { FilterAction } from 'types';

export const updateFilter = (filter: FilterAction) => {
  return {
    type: 'UPDATE_FILTER',
    payload: filter,
  };
};

import { SetPageNameAction } from 'types';

export const setPageName = (name: string): SetPageNameAction => {
  return {
    type: 'SET_PAGE_NAME',
    payload: name,
  };
};

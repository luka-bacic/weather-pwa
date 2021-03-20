import { SetPageNameAction, SetPageWidthAction } from 'types';

export const setPageName = (name: string): SetPageNameAction => {
  return {
    type: 'SET_PAGE_NAME',
    payload: name,
  };
};

export const setPageWidth = (width: number): SetPageWidthAction => {
  return {
    type: 'SET_PAGE_WIDTH',
    payload: width,
  };
};

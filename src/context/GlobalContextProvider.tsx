import React, { createContext, ReactElement, Dispatch } from 'react';
import reducer from './reducer';
import useAsyncReducer from 'hooks/useAsyncReducer';
import { DataStore } from 'types';

const initialState: DataStore = {
  activeLocation: undefined,
  tempLocation: undefined,
  savedLocations: [],
  lastMapData: undefined,
  message: '',
};

const initialDispatch = () => {};

export const GlobalStateContext = createContext(initialState);
export const GlobalDispatchContext = createContext<Dispatch<any>>(
  initialDispatch
);

type Props = {
  children: ReactElement;
};

const GlobalContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useAsyncReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalContextProvider;

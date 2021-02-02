import React, { createContext } from 'react';
import reducer from './reducer';
import useAsyncReducer from 'hooks/useAsyncReducer';

export const GlobalStateContext = createContext();
export const GlobalDispatchContext = createContext();

const initialState = {
  activeLocation: undefined,
  tempLocation: undefined,
  savedLocations: [],
  errorMsg: '',
};

const GlobalContextProvider = ({ children }) => {
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

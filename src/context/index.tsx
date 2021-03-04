import React, {
  createContext,
  ReactElement,
  Dispatch,
  useReducer,
} from 'react';
import { rootReducer } from './reducers';
// import useReducerWithThunk from 'hooks/useAsyncReducer';
// import { useThunkReducer } from 'react-hook-thunk-reducer';
import { DataStore } from 'types';
const initialState = {
  weather: null,
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
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalContextProvider;

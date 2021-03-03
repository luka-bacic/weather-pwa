import React, {
  createContext,
  useReducer,
  ReactElement,
  Dispatch,
} from 'react';
import { rootReducer } from './reducers';

const initialState = {
  ass: null,
  balls: null,
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

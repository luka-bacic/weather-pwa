import React, {
  createContext,
  ReactElement,
  Dispatch,
  useReducer,
} from 'react';
import { rootReducer } from './reducers';
import { initialGlobalState, initialDispatch } from 'context/initialState';

export const GlobalStateContext = createContext(initialGlobalState);
export const GlobalDispatchContext = createContext<Dispatch<any>>(
  initialDispatch
);

type Props = {
  children: ReactElement;
};

const GlobalContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(rootReducer, initialGlobalState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalContextProvider;

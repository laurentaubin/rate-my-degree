import React, { createContext, useReducer } from "react";
import { appReducer } from "./reducer";

export interface User {
  name: string;
  email: string;
  pictureUrl: string;
}

export interface ApplicationState {
  currentUser?: User;
}

const initialState: ApplicationState = {};

const AppContext = createContext<{
  state: ApplicationState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };

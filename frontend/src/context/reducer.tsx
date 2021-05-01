import { ApplicationState } from "./context";

export enum ActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface Action {
  type: ActionType;
  payload: any;
}

export const appReducer = (state: ApplicationState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      console.log(action);
      return state;

    case ActionType.LOGOUT:
      console.log(action);
      return state;

    default:
      return state;
  }
};

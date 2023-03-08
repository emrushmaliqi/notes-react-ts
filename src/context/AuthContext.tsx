import {
  createContext,
  ReactNode,
  Reducer,
  useReducer,
  Dispatch,
  useEffect,
} from "react";
import { UserWithToken } from "../Types";

import jwtDecode, { JwtPayload } from "jwt-decode";

export enum AuthActionKind {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface AuthAction {
  type: AuthActionKind;
  payload: AuthState["user"];
}

interface AuthState {
  user: { email: string; token: string } | null;
}

export const AuthContext = createContext<{
  user: AuthState["user"];
  dispatch: Dispatch<AuthAction> | null;
}>({ user: null, dispatch: null });

export const authReducer: Reducer<AuthState, AuthAction> = (
  state: AuthState,
  { type, payload }: AuthAction
) => {
  switch (type) {
    case AuthActionKind.LOGIN:
      return { user: payload };
    case AuthActionKind.LOGOUT:
      localStorage.removeItem("user");
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user: UserWithToken = JSON.parse(localStorage.getItem("user")!);
      const token: JwtPayload = jwtDecode(user.token);
      if (token.exp && token.exp * 1000 < Date.now()) {
        dispatch({
          type: AuthActionKind.LOGOUT,
          payload: null,
        });
        return;
      }
      dispatch({
        type: AuthActionKind.LOGIN,
        payload: user,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, ReactNode, Reducer, useReducer, Dispatch } from "react";

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
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     dispatch({
  //       type: AuthActionKind.LOGIN,
  //       payload: JSON.parse(localStorage.getItem("user")!),
  //     });
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

import { useContext, useState } from "react";
import { AuthActionKind, AuthContext } from "../context/AuthContext";
import { UserType, UserWithToken } from "../Types";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw Error("AuthContext must be used inside AuthContextProvider!");

  return context;
};

export const useLogin = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async ({ email, password }: UserType) => {
    setIsLoading(true);
    setError("");

    const res = await fetch("api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const json: { error: string } = await res.json();
      setIsLoading(false);
      setError(json.error);
    }

    if (res.ok && dispatch) {
      const data: UserWithToken = await res.json();
      dispatch({ type: AuthActionKind.LOGIN, payload: data });
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
    }
  };

  return { error, isLoading, login };
};

export const useSignup = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async ({ email, password }: UserType) => {
    setIsLoading(true);
    setError("");

    const res = await fetch("api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const json: { error: string } = await res.json();
      setIsLoading(false);
      setError(json.error);
    }
    if (res.ok && dispatch) {
      const data: UserWithToken = await res.json();
      dispatch({ type: AuthActionKind.LOGIN, payload: data });
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
    }
  };

  return { error, isLoading, signup };
};

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    if (dispatch) dispatch({ type: AuthActionKind.LOGOUT, payload: null });
  };

  return logout;
};

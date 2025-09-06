import React, { createContext, useReducer, useContext } from "react";
import { authReducer, initialState } from "../Reducer/AuthReducer";
import { loginApi, registerApi } from "../Services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email, password) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const data = await loginApi(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));


      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: data.user, token: data.token },
      });

      return data.user
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data || err.message,
      });
      return null
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerApi(userData);
      return data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

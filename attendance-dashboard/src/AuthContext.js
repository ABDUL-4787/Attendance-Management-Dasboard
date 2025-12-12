import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, logout as logoutApi } from "./auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const existing = getCurrentUser();
    setUser(existing);
    setReady(true);
  }, []);

  const login = ({ email, password }) => {
    const loggedIn = loginUser({ email, password });
    setUser(loggedIn);
    return loggedIn;
  };

  const logout = () => {
    logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



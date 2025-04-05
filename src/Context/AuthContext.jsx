import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("jwtToken", token);
    } else {
      localStorage.removeItem("jwtToken");
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:8080/login", credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const { token, user } = response.data;

      if (response.status === 200 && token && user) {
        setToken(token);
        setUser(user);
        return { success: true };
      } else {
        return { success: false, message: "Invalid server response" };
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      setToken("");
      setUser(null);
      return { success: false, message: error.response?.data?.message || "Invalid username or password" };
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    localStorage.removeItem("ACTIVEROUTE");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

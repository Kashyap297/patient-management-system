// src/context/AuthContext.js
import React, { createContext, useState } from "react";
import api from "../api/api"; // Import the Axios instance from api.js

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authError, setAuthError] = useState(null);

  const registerAdmin = async (adminData) => {
    try {
      const response = await api.post("/users/register-admin", adminData);
      return response.data;
    } catch (error) {
      setAuthError(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ registerAdmin, authError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

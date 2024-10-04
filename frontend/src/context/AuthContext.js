// src/context/AuthContext.js
import React, { createContext, useState } from "react";
import api from "../api/api"; // Import the Axios instance from api.js

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authError, setAuthError] = useState(null);
  const clearAuthError = () => {
    setAuthError(null); // Clear the previous errors
  };
  const registerAdmin = async (adminData) => {
    try {
      const response = await api.post("/users/register-admin", adminData);
      return response.data;
    } catch (error) {
      setAuthError(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const loginUser = async (credentials) => {
    try {
      const response = await api.post("/users/login", credentials);
      return response.data;
    } catch (error) {
      setAuthError(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const requestOtp = async (data) => {
    try {
      await api.post("/users/forgot-password", data);
    } catch (error) {
      setAuthError(error.response?.data?.message || "Request OTP failed");
      throw error;
    }
  };

  const verifyOtp = async (data) => {
    try {
      const response = await api.post("/users/verify-otp", data);
      return response; // Return the whole response, including status code
    } catch (error) {
      setAuthError(error.response?.data?.message || "OTP verification failed");
      throw error;
    }
  };

  const resetPassword = async (data) => {
    try {
      await api.post("/users/reset-password", data);
    } catch (error) {
      setAuthError(error.response?.data?.message || "Password reset failed");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        registerAdmin,
        loginUser,
        authError,
        requestOtp,
        verifyOtp,
        resetPassword,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminRegister from "./components/AdminRegister";
import Login from "./components/Login";
import PatientRegister from "./components/PatientRegister";
import ForgetPassword from "./components/ForgetPassword";
import EnterOTP from "./components/EnterOtp";
import ResetPassword from "./components/ResetPassword";
import AdminRoutes from "./components/AdminRoutes";
import DoctorRoutes from "./components/DoctorRoutes";
import PatientRoutes from "./components/PatientRoutes";
import { BreadcrumbProvider } from "./context/BreadcrumbContext";
import ProtectedRoute from "./components/ProtectedRoute";
import GlobalToaster from "./pages/Toaster";

import { jwtDecode } from "jwt-decode";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const getDefaultRoute = () => {
    const token = localStorage.getItem("token");
    if (!token) return "/";
    try {
      const { role } = jwtDecode(token);
      if (role === "admin") return "/admin/dashboard";
      if (role === "doctor") return "/doctor";
      if (role === "patient") return "/patient";
      return "/home";
    } catch (e) {
      return "/";
    }
  };

  return (
    <Router>
       <GlobalToaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to={getDefaultRoute()} replace /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/patient-registration" element={!isAuthenticated ? <PatientRegister /> : <Navigate to={getDefaultRoute()} replace />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgetPassword /> : <Navigate to={getDefaultRoute()} replace />} />
        <Route path="/enter-otp" element={!isAuthenticated ? <EnterOTP /> : <Navigate to={getDefaultRoute()} replace />} />
        <Route path="/reset-password" element={!isAuthenticated ? <ResetPassword /> : <Navigate to={getDefaultRoute()} replace />} />
        <Route path="/admin-registration" element={!isAuthenticated ? <AdminRegister /> : <Navigate to={getDefaultRoute()} replace />} />

        {/* Dashboard Routes with Role-based Protection */}
        <Route
          path="/admin/*"
          element={
            isAuthenticated ? (
              <ProtectedRoute roles={["admin"]}>
                <BreadcrumbProvider>
                  <AdminRoutes onLogout={handleLogout} />
                </BreadcrumbProvider>
              </ProtectedRoute>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/doctor/*"
          element={
            isAuthenticated ? (
              <ProtectedRoute roles={["doctor"]}>
                <BreadcrumbProvider>
                  <DoctorRoutes onLogout={handleLogout} />
                </BreadcrumbProvider>
              </ProtectedRoute>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/patient/*"
          element={
            isAuthenticated ? (
              <ProtectedRoute roles={["patient"]}>
                <BreadcrumbProvider>
                  <PatientRoutes onLogout={handleLogout} />
                </BreadcrumbProvider>
              </ProtectedRoute>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

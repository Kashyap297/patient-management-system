import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminRegister from "./components/AdminRegister";
import Login from "./components/Login";
import PatientRegister from "./components/PatientRegister";
import ForgetPassword from "./components/ForgetPassword";
import CreateDoctor from "./pages/adminPages/CreateDoctor";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import EnterOTP from "./components/EnterOtp";
import ResetPassword from "./components/ResetPassword";
import PatientProfile from "./pages/patientPages/PatientProfile";
import AdminRoutes from "./components/AdminRoutes";
import DoctorRoutes from "./components/DoctorRoutes";
import PatientRoutes from "./components/PatientRoutes";
import { BreadcrumbProvider } from "./context/BreadcrumbContext";
import ProtectedRoute from "./components/ProtectedRoute";

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

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={!isAuthenticated ? <PatientRegister /> : <Navigate to="/admin/dashboard" replace />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgetPassword /> : <Navigate to="/admin/dashboard" replace />} />
        <Route path="/enter-otp" element={!isAuthenticated ? <EnterOTP /> : <Navigate to="/admin/dashboard" replace />} />
        <Route path="/reset-password" element={!isAuthenticated ? <ResetPassword /> : <Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin-register" element={!isAuthenticated ? <AdminRegister /> : <Navigate to="/admin/dashboard" replace />} />

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

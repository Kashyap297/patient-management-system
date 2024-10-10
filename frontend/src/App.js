import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<PatientRegister />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/enter-otp" element={<EnterOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        {/* deshbord Routes */}
        <Route path="/admin" element={<AdminRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/doctor" element={<DoctorRoutes />} />
        <Route path="/doctor/*" element={<DoctorRoutes />} />
        <Route path="/patient" element={<PatientRoutes />} />
        <Route path="/patient/*" element={<PatientRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;

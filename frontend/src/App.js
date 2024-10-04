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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<PatientRegister />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/enter-otp" element={<EnterOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/create-doctor"
          element={
            <Layout>
              <CreateDoctor />
            </Layout>
          }
        />
        <Route
          path="/patient-profile"
          element={
            <Layout>
              <PatientProfile />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRegister from "./components/AdminRegister";
import Login from "./components/Login";
import PatientRegister from "./components/PatientRegister";
import ForgetPassword from "./components/ForgetPassword";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<PatientRegister />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        {/* <Route
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
        /> */}
      </Routes>
    </Router>
  );
};

export default App;

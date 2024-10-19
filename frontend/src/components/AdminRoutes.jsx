import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import AdminRegister from "./AdminRegister";
import Login from "./Login";
import Sidebar from "./Sidebar";
import DoctorManagement from "../pages/adminPages/DoctorManagement";
import Home from "../pages/Home";
import Header from "./Header";
import AddDoctorForm from "../pages/adminPages/AddDoctorForm";
import EditDoctor from "../pages/adminPages/EditDoctor";
import MonitorBilling from "../pages/adminPages/MonitorBilling";
import InsuranceClaims from "../pages/adminPages/InsuranceClaim";
import PaymentProcess from "../pages/adminPages/PaymentProcess";
import Invoice from "../pages/adminPages/Invoice";
import InsuranceDetail from "../pages/adminPages/InsuranceDetail";
import EditBill from "./EditBill";
import ReportingAnalysis from "../pages/adminPages/ReportingAnalysis";
import AdminDashboard from "../pages/adminPages/AdminDashboard";
import PatientManagement from "./PatientManagement";
import ProfileScreen from "../pages/adminPages/ProfileScreen";
import SearchResults from "./SearchScreen";
import SelectTemplate from "../pages/adminPages/SelectTemplate";
import CreateBill from "../pages/adminPages/CreateBillForm";
import EditInvoice from "../pages/adminPages/EditInvoice";
import AdminProfile from "./AdminProfile";
import AdminEditProfile from "./Profile/AdminEditProfile";

const AdminRoutes = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={"admin"} />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <Routes>
            <Route path="/doctor-management" element={<DoctorManagement />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/patient-management" element={<PatientManagement />} />
            <Route path="/add-new-doctor" element={<AddDoctorForm />} />
            <Route path="/edit-doctor/:id" element={<EditDoctor />} />
            <Route
              path="/view-doctor/:id"
              element={<EditDoctor isViewOnly />}
            />
            <Route path="/monitor-billing" element={<MonitorBilling />} />
            <Route path="/insurance-claims" element={<InsuranceClaims />} />
            <Route path="/select-template" element={<SelectTemplate />} />
            <Route path="/payment-process" element={<PaymentProcess />} />
            <Route path="/invoice/:billId/:patientName" element={<Invoice />} />
            <Route path="/insurance/:id" element={<InsuranceDetail />} />
            <Route path="/payment/edit/:id" element={<EditBill />} />
            <Route path="/analytics" element={<ReportingAnalysis />} />
            {/* <Route path="/" element={<ProfileScreen />} /> */}
            <Route path="/*" element={<AdminProfile />} />
            <Route path="/edit-profile" element={<AdminEditProfile />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/create-bill" element={<CreateBill />} />
            <Route path="/edit-invoice" element={<EditInvoice />} />
          </Routes>
          {/* <DoctorManagement /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;

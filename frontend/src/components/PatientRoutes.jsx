import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PatientDashboard from "../pages/patientPages/PatientDashboard";
import PatientEditProfile from "../pages/patientPages/PatientEditProfile";
import PrescriptionPage from "../pages/patientPages/PrescriptionPage";
import TestReportPage from "../pages/patientPages/TestReportPage";
import MedicalHistoryPage from "../pages/patientPages/MedicalHistoryPage";
import ChatPage from "../pages/patientPages/ChatPage";
import AppointmentBookingPage from "../pages/patientPages/AppointmentBookingPage";
import PrescriptionAccessPage from "../pages/patientPages/PrescriptionAccessPage";
import BillPage from "../pages/patientPages/BillPage";
import BookAppointment from "../pages/patientPages/BookAppointment";
import RescheduleAppointment from "../pages/patientPages/RescheduleAppointment";
import TeleConsultation from "../pages/patientPages/TeleConsultation";
import PatientMeetingConference from "../pages/patientPages/PatientMeetingConference";
import { useState } from "react";

const PatientRoutes = ( {onLogout} ) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={"patient"}  onLogout={onLogout} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar}/>
        <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<PatientDashboard />} />
            <Route path="/edit-patient-profile/:id" element={<PatientEditProfile />} />
            <Route path="/prescriptions" element={<PrescriptionPage />} />
            <Route path="/test-report" element={<TestReportPage />} />
            <Route path="/medical-history" element={<MedicalHistoryPage />} />
            <Route path="/appointment-booking" element={<AppointmentBookingPage />} />
            <Route path="/reschedule-appointment" element={<RescheduleAppointment />} />
            <Route path="/prescription-access" element={<PrescriptionAccessPage />} />
            <Route path="/tele-access" element={<TeleConsultation/>} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/bills" element={<BillPage />} />
            <Route path="/book-appointment" element={< BookAppointment/>} />
            <Route path="/patientMeetingConference/:appointmentId" element={<PatientMeetingConference/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default PatientRoutes;


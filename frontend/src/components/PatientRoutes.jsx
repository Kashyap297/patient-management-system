import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProfileScreen from "../pages/adminPages/ProfileScreen";
import PatientDashboard from "../pages/patientPages/PatientDashboard";
import PatientEditProfile from "../pages/patientPages/PatientEditProfile";
import PrescriptionPage from "../pages/patientPages/PrescriptionPage";
import TestReportPage from "../pages/patientPages/TestReportPage";
import MedicalHistoryPage from "../pages/patientPages/MedicalHistoryPage";
import ChatPage from "../pages/patientPages/ChatPage";
import AppointmentBookingPage from "../pages/patientPages/AppointmentBookingPage";
import PrescriptionAccessPage from "../pages/patientPages/PrescriptionAccessPage";
import TeleAccess from "../pages/patientPages/TeleAccess";
import BillPage from "../pages/patientPages/BillPage";
import PatientSidebar from "./Patient/PatientSidebar";
import { BreadcrumbProvider } from "../context/BreadcrumbContext";
import BookAppointment from "../pages/patientPages/BookAppointment";
import RescheduleAppointment from "../pages/patientPages/RescheduleAppointment";
import TeleConsultationScreen from "../pages/doctorPages/TeleConsultationScreen";
import TeleConsultation from "../pages/patientPages/TeleConsultation";
import DoctorMeetingConference from "../pages/doctorPages/DoctorMeetingConference";
import PatientMeetingConference from "../pages/patientPages/PatientMeetingConference";



const PatientRoutes = ( {onLogout} ) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={"patient"}  onLogout={onLogout}/>
      {/* <BreadcrumbProvider> */}
      {/* <PatientSidebar /> */}
      {/* </BreadcrumbProvider> */}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <Routes>
            {/* <Route path="/" element={<ProfileScreen />} /> */}
            <Route path="/" element={<PatientDashboard />} />
            <Route path="/edit-patient-profile/:id" element={<PatientEditProfile />} />
            <Route path="/prescriptions" element={<PrescriptionPage />} />
            <Route path="/test-report" element={<TestReportPage />} />
            <Route path="/medical-history" element={<MedicalHistoryPage />} />
            <Route path="/appointment-booking" element={<AppointmentBookingPage />} />
            <Route path="/rescheduleA-appointment" element={<RescheduleAppointment />} />
            <Route path="/prescription-access" element={<PrescriptionAccessPage />} />
            {/* <Route path="/tele-access" element={<TeleAccess />} /> */}
            <Route path="/tele-access" element={<TeleConsultation/>} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/bills" element={<BillPage />} />
            <Route path="/book-appointment" element={< BookAppointment/>} />
            <Route path="/patientMeetingConference/:appointmentId" element={<PatientMeetingConference/>} />
          </Routes>
          {/* <DoctorManagement /> */}
        </div>
      </div>
    </div>
  );
};

export default PatientRoutes;


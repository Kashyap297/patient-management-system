import React, { useEffect, useState } from "react";
import { FaEye, FaSearch } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import api from "../api/api";
import PatientDetailsModal from "../components/modals/PatientDetailModal";
import noRecordImage from "../assets/images/NoPatient.png";
import "react-loading-skeleton/dist/skeleton.css";

const PatientManagement = () => {
  const [activeTab, setActiveTab] = useState("Today Appointment");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAppointments(response.data.data);
        filterAppointments(response.data.data, activeTab);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [activeTab]);

  const filterAppointments = (appointments, tab) => {
    const today = new Date().toISOString().split("T")[0];
    let filtered = [];
    switch (tab) {
      case "Today Appointment":
        filtered = appointments.filter(
          (appointment) =>
            appointment.appointmentDate === today &&
            appointment.status !== "Cancelled"
        );
        break;
      case "Upcoming Appointment":
        filtered = appointments.filter(
          (appointment) =>
            appointment.appointmentDate > today &&
            appointment.status !== "Cancelled"
        );
        break;
      case "Previous Appointment":
        filtered = appointments.filter(
          (appointment) =>
            appointment.appointmentDate < today &&
            appointment.status !== "Cancelled"
        );
        break;
      case "Cancel Appointment":
        filtered = appointments.filter(
          (appointment) => appointment.status === "Cancelled"
        );
        break;
      default:
        filtered = appointments;
    }
    setFilteredAppointments(filtered);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    filterAppointments(appointments, tab);
  };

  const handleViewPatient = async (appointmentId) => {
    if (!appointmentId) {
      console.error("Appointment ID is undefined");
      return;
    }

    try {
      const response = await api.get(`/appointments/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSelectedPatient(response.data.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const filteredAndSearchedAppointments = filteredAppointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const appointmentTypeStyles = {
    Online: "bg-yellow-100 text-yellow-600",
    Onsite: "bg-blue-100 text-blue-600",
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>

      <div className="glass shadow-sm p-6 md:p-8 rounded-3xl relative z-10 animate-slide-up">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-100 pb-4">
          {["Today Appointment", "Upcoming Appointment", "Previous Appointment", "Cancel Appointment"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab 
                  ? "bg-gradient-to-r from-primary to-blue-500 text-white shadow-md shadow-blue-500/20 scale-105" 
                  : "text-gray-500 hover:bg-white/50 hover:text-primary"
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Header and Search Bar */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 space-y-4 md:space-y-0 gap-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-secondary tracking-tight md:ml-3">{activeTab}</h2>
          <div className="relative flex items-center bg-white/60 backdrop-blur-md rounded-2xl px-4 py-3 w-full md:max-w-md border border-white/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus-within:shadow-md focus-within:bg-white transition-all duration-300">
            <FaSearch className="text-gray-400 text-lg mr-3" />
            <input
              type="text"
              placeholder="Search Patient"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-full text-gray-700 font-medium placeholder-gray-400"
            />
          </div>
        </div>

        {/* Patient Table */}
        <div className="overflow-x-auto max-h-[620px] custom-scroll">
          <table className="min-w-full text-left table-auto border-separate border-spacing-y-3">
            <thead className="sticky top-0 bg-white/90 backdrop-blur-sm z-20 shadow-sm">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider rounded-l-2xl">Patient Name</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Patient Issue</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Doctor Name</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Disease Name</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Appointment Time</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Appointment Type</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center rounded-r-2xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="bg-white/50">
                    <td className="p-4 rounded-l-2xl"><Skeleton width="80%" height={20} /></td>
                    <td className="p-4"><Skeleton width="100%" height={20} /></td>
                    <td className="p-4"><Skeleton width="80%" height={20} /></td>
                    <td className="p-4"><Skeleton width="90%" height={20} /></td>
                    <td className="p-4"><Skeleton width="60%" height={20} /></td>
                    <td className="p-4"><Skeleton width="70%" height={20} /></td>
                    <td className="p-4 rounded-r-2xl text-center"><Skeleton width={30} height={30} circle /></td>
                  </tr>
                ))
              ) : filteredAndSearchedAppointments.length > 0 ? (
                filteredAndSearchedAppointments.map((appointment) => (
                  <tr key={appointment.id} className="bg-white/50 hover:bg-white shadow-sm hover:shadow transition-all duration-300">
                    <td className="p-4 rounded-l-2xl font-bold text-gray-800 whitespace-nowrap">{appointment.patientName}</td>
                    <td className="p-4 font-medium text-gray-600 whitespace-nowrap">{appointment.patientIssue}</td>
                    <td className="p-4 font-medium text-gray-600 whitespace-nowrap">{appointment.doctorName || "N/A"}</td>
                    <td className="p-4 font-medium text-gray-600 whitespace-nowrap">{appointment.diseaseName}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-4 py-1.5 rounded-lg bg-blue-50/80 text-blue-600 font-bold text-xs border border-blue-100">{appointment.appointmentTime}</span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold border ${appointment.appointmentType === 'Online' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}
                      >
                        {appointment.appointmentType}
                      </span>
                    </td>
                    <td className="p-4 rounded-r-2xl text-center whitespace-nowrap">
                      <button className="text-primary bg-primary/10 hover:bg-primary hover:text-white p-2.5 rounded-xl transition-colors" onClick={() => handleViewPatient(appointment.id)} title="View Details">
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-16">
                    <div className="flex flex-col items-center">
                      <div className="p-8 bg-primary/5 rounded-full mb-6">
                        <img src={noRecordImage} alt="No Patient Found" className="w-48 md:w-64 opacity-80" />
                      </div>
                      <p className="text-gray-500 font-medium text-lg">No records found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Details Modal */}
      {isModalOpen && (
        <PatientDetailsModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          patient={selectedPatient}
        />
      )}
    </div>
  );
};

export default PatientManagement;

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
    <div className="min-h-screen">
      <div className="bg-white p-4 rounded-xl shadow-md">
        {/* Tabs */}
        <div className="flex flex-wrap space-x-2 mb-4 border-b">
          {["Today Appointment", "Upcoming Appointment", "Previous Appointment", "Cancel Appointment"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 ${
                activeTab === tab ? "border-b-2 border-[#0eabeb] text-[#0eabeb]" : "text-[#667080]"
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Header and Search Bar */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="text-xl font-semibold md:ml-3">{activeTab}</h2>
          <div className="flex items-center bg-[#f6f8fb] rounded-full px-4 py-2 w-full md:max-w-md">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Patient"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Patient Table */}
        <div className="overflow-x-auto max-h-[620px] custom-scroll">
          <table className="min-w-full bg-white table-auto rounded-xl">
            <thead className="sticky top-0 bg-[#F6F8FB]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Patient Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Patient Issue</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Doctor Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Disease Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Appointment Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Appointment Type</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4"><Skeleton width="100%" height={20} /></td>
                    <td className="px-6 py-4"><Skeleton width="100%" height={20} /></td>
                    <td className="px-6 py-4"><Skeleton width="100%" height={20} /></td>
                    <td className="px-6 py-4"><Skeleton width="100%" height={20} /></td>
                    <td className="px-6 py-4"><Skeleton width="100%" height={20} /></td>
                    <td className="px-6 py-4"><Skeleton width="100%" height={20} /></td>
                    <td className="px-6 py-4 text-center"><Skeleton width={30} height={20} /></td>
                  </tr>
                ))
              ) : filteredAndSearchedAppointments.length > 0 ? (
                filteredAndSearchedAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.patientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.patientIssue}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.doctorName || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{appointment.diseaseName}</td>
                    <td className="px-6 py-4 text-blue-600 whitespace-nowrap">
                      <span className="px-4 py-2 rounded-full bg-[#f6f8fb]">{appointment.appointmentTime}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-4 py-2 rounded-full ${appointmentTypeStyles[appointment.appointmentType]}`}
                      >
                        {appointment.appointmentType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button className="text-blue-600" onClick={() => handleViewPatient(appointment.id)}>
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-16">
                    <div className="flex flex-col items-center">
                      <img src={noRecordImage} alt="No Patient Found" className="w-48 md:w-96 mb-4" />
                      <p className="text-gray-500">No records found</p>
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

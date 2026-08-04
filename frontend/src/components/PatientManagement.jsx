import React, { useEffect, useState } from "react";
import { FaEye, FaSearch, FaRegClock, FaPen, FaTrash } from "react-icons/fa";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import api from "../api/api";
import PatientDetailsModal from "../components/modals/PatientDetailModal";
import noRecordImage from "../assets/images/NoPatient.png";
import userImage from "../assets/images/user.png";
import moment from "moment";
import "react-loading-skeleton/dist/skeleton.css";

const PatientManagement = () => {
  const [activeTab, setActiveTab] = useState("Today Appointment");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // New States for Edit and Delete
  const [refresh, setRefresh] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  // For Edit Form
  const [editFormData, setEditFormData] = useState({ appointmentDate: "", appointmentTime: "", status: "" });

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
  }, [activeTab, refresh]);

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

  const handleEditClick = (appointment) => {
    setAppointmentToEdit(appointment);
    setEditFormData({
      appointmentDate: appointment.appointmentDate ? appointment.appointmentDate.split("T")[0] : "",
      appointmentTime: appointment.appointmentTime || "",
      status: appointment.status || "Scheduled",
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (appointment) => {
    setAppointmentToDelete(appointment);
    setIsDeleteModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/appointments/update/${appointmentToEdit.id}`, editFormData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setIsEditModalOpen(false);
      setAppointmentToEdit(null);
      setRefresh(!refresh); // Trigger re-fetch
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      await api.delete(`/appointments/${appointmentToDelete.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setIsDeleteModalOpen(false);
      setAppointmentToDelete(null);
      setRefresh(!refresh); // Trigger re-fetch
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
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
        <div className="flex flex-wrap items-center bg-gray-50/80 backdrop-blur-sm p-1.5 rounded-2xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 w-fit mb-8">
          {["Today Appointment", "Upcoming Appointment", "Previous Appointment", "Cancel Appointment"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab 
                  ? "bg-white text-[#10b981] shadow-sm ring-1 ring-gray-900/5" 
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
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
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 font-semibold border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-20 shadow-sm">
              <tr>
                <th className="px-4 py-3 rounded-tl-2xl"><input type="checkbox" className="rounded border-gray-300 text-[#10b981] focus:ring-[#10b981]" /></th>
                <th className="px-4 py-3">Patient Name &uarr;</th>
                <th className="px-4 py-3">Disease Name</th>
                <th className="px-4 py-3">Appointments Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3 text-right rounded-tr-2xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5).fill().map((_, i) => (
                  <tr key={i}><td className="p-4" colSpan={7}><Skeleton height={20}/></td></tr>
                ))
              ) : filteredAndSearchedAppointments.length > 0 ? (
                filteredAndSearchedAppointments.map((booking, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4"><input type="checkbox" className="rounded border-gray-300 text-[#10b981] focus:ring-[#10b981]" /></td>
                    <td className="px-4 py-4 font-bold text-gray-800">{booking.patientName || "-"}</td>
                    <td className="px-4 py-4 text-gray-500 font-medium">{booking.diseaseName || "-"}</td>
                    <td className="px-4 py-4 text-gray-800 font-medium">{moment(booking.appointmentDate).format("DD MMM YYYY, hh:mm A")}</td>
                    <td className="px-4 py-4">
                      <span className={`flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                        booking.status === 'Scheduled' || booking.status === 'Confirmed' ? 'bg-[#ecfdf5] text-[#10b981]' :
                        booking.status === 'Pending' ? 'bg-orange-50 text-orange-500' :
                        'bg-red-50 text-red-500'
                      }`}>
                        {booking.status === 'Scheduled' || booking.status === 'Confirmed' ? <FiArrowUpRight className="opacity-70"/> : 
                         booking.status === 'Pending' ? <FaRegClock className="opacity-70"/> : 
                         <FiArrowDownRight className="opacity-70"/>}
                        {booking.status || "Scheduled"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <img src={userImage} alt="doc" className="w-6 h-6 rounded-full border border-gray-200 object-cover" />
                        <span className="font-semibold text-gray-700 text-xs">dr. {booking.doctorName !== "N/A" ? booking.doctorName : "-"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleViewPatient(booking.id)}
                          className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => handleEditClick(booking)}
                          className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors"
                          title="Edit Appointment"
                        >
                          <FaPen />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(booking)}
                          className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                          title="Delete Appointment"
                        >
                          <FaTrash />
                        </button>
                      </div>
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

      {/* Edit Appointment Modal */}
      {isEditModalOpen && appointmentToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Appointment</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                  className="w-full p-2 border border-gray-200 rounded-xl focus:ring-[#10b981] focus:border-[#10b981]"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input 
                  type="date"
                  value={editFormData.appointmentDate}
                  onChange={(e) => setEditFormData({...editFormData, appointmentDate: e.target.value})}
                  className="w-full p-2 border border-gray-200 rounded-xl focus:ring-[#10b981] focus:border-[#10b981]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input 
                  type="time"
                  value={editFormData.appointmentTime}
                  onChange={(e) => setEditFormData({...editFormData, appointmentTime: e.target.value})}
                  className="w-full p-2 border border-gray-200 rounded-xl focus:ring-[#10b981] focus:border-[#10b981]"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-[#10b981] rounded-xl hover:bg-[#059669] font-bold shadow-sm shadow-[#10b981]/30">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && appointmentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              <FaTrash />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Delete Appointment?</h2>
            <p className="text-gray-500 text-sm mb-6">Are you sure you want to delete the appointment for <strong className="text-gray-700">{appointmentToDelete.patientName}</strong>? This action cannot be undone.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-5 py-2 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 font-bold w-full">Cancel</button>
              <button onClick={handleDeleteSubmit} className="px-5 py-2 text-white bg-red-500 rounded-xl hover:bg-red-600 font-bold w-full shadow-sm shadow-red-500/30">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;

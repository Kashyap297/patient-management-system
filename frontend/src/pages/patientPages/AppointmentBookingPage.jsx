import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaCalendarAlt, FaTrashAlt, FaRedoAlt, FaEye } from "react-icons/fa";
import DoctorDetailsSidebar from "../../components/Patient/DoctorDetailsSidebar";
import api from "../../api/api"; // Assuming Axios instance is configured
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode to extract patient ID
import { Button } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import CustomDateFilter from '../../components/modals/CustomDateFilter';
import moment from "moment";

// Set the app element for the modal to prevent accessibility issues
Modal.setAppElement("#root");

const AppointmentBookingPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [activeTab, setActiveTab] = useState("Scheduled");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterDates, setFilterDates] = useState({ fromDate: null, toDate: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  useEffect(() => {
    updateBreadcrumb([
      { label: "Appointment Booking", path: "/patient/appointment-booking" },
    ]);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { id } = jwtDecode(token);
      try {
        const response = await api.get("/appointments");
        console.log("API Response:", response.data);

        const userAppointments = response.data.data.filter(appointment => appointment.patientId === id);
        setAppointments(userAppointments || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Function to filter appointments based on the selected tab and date range
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = moment(appointment.appointmentDate);

    // Apply date filter if both fromDate and toDate are set
    const withinDateRange = filterDates.fromDate && filterDates.toDate
      ? appointmentDate.isBetween(moment(filterDates.fromDate).startOf("day"), moment(filterDates.toDate).endOf("day"), null, "[]")
      : true;

    // Apply tab filter
    if (activeTab === "Scheduled") {
      return appointment.status !== "Cancelled" && withinDateRange;
    } else if (activeTab === "Previous") {
      return appointment.status === "Completed" && withinDateRange;
    } else if (activeTab === "Canceled") {
      return appointment.status === "Cancelled" && withinDateRange;
    } else if (activeTab === "Pending") {
      return appointment.status === "Pending" && withinDateRange;
    }
    return false;
  });

  const handleViewDetails = (appointment) => {
    setSelectedDoctor(appointment);
    setIsSidebarVisible(true);
  };

  const openCancelModal = (appointment) => {
    setAppointmentToCancel(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAppointmentToCancel(null);
  };

  const handleCancelAppointment = async () => {
    setLoading(true);
    try {
      const response = await api.patch(
        `/appointments/cancel/${appointmentToCancel.id}`
      );
      console.log("Cancel Response:", response.data);

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentToCancel.id
            ? { ...appointment, status: "Cancelled" }
            : appointment
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert("Failed to cancel appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyDateFilter = (fromDate, toDate) => {
    setFilterDates({ fromDate, toDate });
    setOpenCustomDateModal(false);
  };

  const handleResetDateFilter = () => {
    setFilterDates({ fromDate: null, toDate: null });
    setOpenCustomDateModal(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg m-6 h-full">
      <div className="flex space-x-4 border-b mb-4">
        {["Scheduled", "Previous", "Canceled", "Pending"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 focus:outline-none font-medium ${activeTab === tab
              ? "border-b-4 border-customBlue text-customBlue"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} Appointment
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">My Appointment</h2>
        <div className="flex items-center space-x-4">
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<CalendarToday />}
            className="!text-sm"
            onClick={() => setOpenCustomDateModal(true)}
          >
            Any Date
          </Button>
          <Link
            to={"/patient/book-appointment"}
            className="flex items-center space-x-2 bg-customBlue text-white px-4 py-2 rounded"
          >
            <FaCalendarAlt />
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 overflow-y-auto custom-scroll">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border rounded-lg shadow-md bg-white transition"
          >
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-t-lg">
              <h4 className="font-semibold">
                {appointment.doctorName || "Doctor Name"}
              </h4>
              <div
                className="text-customBlue p-2 rounded-lg bg-white shadow cursor-pointer"
                onClick={() => handleViewDetails(appointment)}
              >
                <FaEye />
              </div>
            </div>
            <div className="p-4 text-sm text-gray-700 space-y-1">
              <p className="flex justify-between items-center text-yellow-500 pb-2">
                <span className="font-semibold text-gray-500">Appointment Type</span>
                {appointment.appointmentType}
              </p>
              <p className="flex justify-between items-center pb-2">
                <span className="font-semibold text-gray-500">Hospital Name</span>
                {appointment.hospitalName}
              </p>
              <p className="flex justify-between items-center pb-2">
                <span className="font-semibold text-gray-500">Appointment Date</span>
                {new Date(appointment.appointmentDate).toLocaleDateString()}
              </p>
              <p className="flex justify-between items-center pb-2">
                <span className="font-semibold text-gray-500">Appointment Time</span>
                {appointment.appointmentTime}
              </p>
              <p className="flex justify-between items-center pb-2">
                <span className="font-semibold text-gray-500">Patient Issue</span>
                {appointment.diseaseName || "Not specified"}
              </p>
            </div>

            <div className="flex justify-between space-x-2 p-4 bg-white rounded-b-lg">
              {activeTab === "Scheduled" || activeTab === "Pending" ? (
                <>
                  <button
                    className="flex items-center justify-center space-x-1 border-2 px-3 py-2 rounded-md text-gray-600 w-1/2"
                    onClick={() => openCancelModal(appointment)}
                    disabled={loading}
                  >
                    <FaTrashAlt />
                    <span>{loading ? "Canceling..." : "Cancel"}</span>
                  </button>
                  <Link to='/patient/rescheduleA-appointment' className="flex items-center justify-center space-x-1 bg-customBlue px-3 py-2 rounded-md text-white w-1/2">
                    <FaRedoAlt />
                    <span>Reschedule</span>
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <DoctorDetailsSidebar
          doctor={selectedDoctor}
          isVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto my-20 border-t-4 border-red-500"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center"
      >
        <div className="text-center">
          <div className="text-red-600 text-4xl mb-4">
            <FaTrashAlt />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Cancel {appointmentToCancel?.appointmentType} Appointment?
          </h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to cancel this appointment?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md font-semibold hover:bg-gray-100"
              onClick={closeModal}
            >
              No
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
              onClick={handleCancelAppointment}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <CustomDateFilter
        open={openCustomDateModal}
        onClose={() => setOpenCustomDateModal(false)}
        onApply={handleApplyDateFilter}
        onReset={handleResetDateFilter}
      />
    </div>
  );
};

export default AppointmentBookingPage;

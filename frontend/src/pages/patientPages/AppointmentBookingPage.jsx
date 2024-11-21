import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaCalendarAlt, FaTrashAlt, FaRedoAlt, FaEye } from "react-icons/fa";
import DoctorDetailsSidebar from "../../components/Patient/DoctorDetailsSidebar";
import api from "../../api/api";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import CustomDateFilter from "../../components/modals/CustomDateFilter";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

const AppointmentBookingPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [activeTab, setActiveTab] = useState("Scheduled");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDates, setFilterDates] = useState({
    fromDate: null,
    toDate: null,
  });
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
        const userAppointments = response.data.data.filter(
          (appointment) => appointment.patientId === id
        );
        setAppointments(userAppointments || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = moment(appointment.appointmentDate);
    const withinDateRange =
      filterDates.fromDate && filterDates.toDate
        ? appointmentDate.isBetween(
            moment(filterDates.fromDate).startOf("day"),
            moment(filterDates.toDate).endOf("day"),
            null,
            "[]"
          )
        : true;

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
      toast.error("Failed to cancel appointment. Please try again.");
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

  const dateRangeLabel =
    filterDates.fromDate && filterDates.toDate
      ? `${moment(filterDates.fromDate).format("D MMM, YYYY")} - ${moment(
          filterDates.toDate
        ).format("D MMM, YYYY")}`
      : "Any Date";

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg h-full">
      {/* Tabs for Appointment Types */}
      <div className="flex flex-wrap md:space-x-4 border-b mb-4">
        {["Scheduled", "Previous", "Canceled", "Pending"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-3 md:px-4 focus:outline-none font-medium ${
              activeTab === tab
                ? "border-b-4 border-customBlue text-customBlue"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} Appointment
          </button>
        ))}
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-3 md:space-y-0">
        <h2 className="text-xl md:text-2xl font-semibold">My Appointment</h2>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div
            className="flex items-center border border-gray-300 rounded-xl px-4 py-2 cursor-pointer"
            onClick={() => setOpenCustomDateModal(true)}
          >
            <CalendarToday className="text-gray-600 mr-2" />
            <span className="text-gray-800">{dateRangeLabel}</span>
            {filterDates.fromDate && filterDates.toDate && (
              <button
                className="ml-2 text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleResetDateFilter();
                }}
              >
                ✕
              </button>
            )}
          </div>
          <Link
            to="/patient/book-appointment"
            className="flex items-center justify-center bg-customBlue text-white px-4 py-2 rounded-xl text-sm md:text-base hover:bg-blue-600"
          >
            <FaCalendarAlt className="mr-2" />
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="custom-scroll overflow-y-auto h-[620px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border">
                  <Skeleton height={20} width="60%" className="mb-2" />
                  <Skeleton height={20} width="80%" className="mb-2" />
                  <Skeleton height={20} width="70%" className="mb-2" />
                  <Skeleton height={20} width="50%" className="mb-2" />
                  <Skeleton height={20} width="70%" />
                </div>
              ))
            : filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-xl w-full relative hover:shadow-lg transition-shadow duration-300 ease-in-out border"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-center px-4 py-2 bg-[#f6f8fb] rounded-t-xl">
                    <h4 className="font-bold text-lg text-gray-800">
                      {appointment.doctorName || "Doctor Name"}
                    </h4>
                    <div
                      className="text-gray-400 cursor-pointer hover:text-[#0EABEB] transition"
                      onClick={() => handleViewDetails(appointment)}
                    >
                      <FaEye className="text-lg" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="text-sm text-[#818194] space-y-2 px-4 py-2">
                    <div className="flex justify-between">
                      <span className=" text-gray-500">Type</span>
                      <span className="font-semibold text-[#FFC313]">
                        {appointment.appointmentType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className=" text-gray-500">Hospital</span>
                      <span className="font-semibold text-[#4F4F4F]">
                        {appointment.hospitalName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className=" text-gray-500">Date</span>
                      <span className="font-semibold text-[#4F4F4F]">
                        {new Date(
                          appointment.appointmentDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className=" text-gray-500">Time</span>
                      <span className="font-semibold text-[#4F4F4F]">
                        {appointment.appointmentTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className=" text-gray-500">Issue</span>
                      <span className="font-semibold text-[#4F4F4F]">
                        {appointment.diseaseName || "Not specified"}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-4 py-3 flex justify-between space-x-2 bg-white rounded-b-xl">
                    {(activeTab === "Scheduled" || activeTab === "Pending") && (
                      <>
                        <button
                          className="flex items-center justify-center space-x-1 border-2 px-3 py-2 rounded-xl text-gray-600 w-1/2 hover:bg-gray-100 transition"
                          onClick={() => openCancelModal(appointment)}
                          disabled={loading}
                        >
                          <FaTrashAlt />
                          <span>{loading ? "Canceling..." : "Cancel"}</span>
                        </button>
                        <Link
                          to="/patient/reschedule-appointment"
                          className="flex items-center justify-center space-x-1 bg-[#0EABEB] px-3 py-2 rounded-xl text-white w-1/2 hover:bg-[#0c97cc] transition"
                        >
                          <FaRedoAlt />
                          <span>Reschedule</span>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Sidebar and Modals */}
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
        className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto my-20 border-t-4 border-red-500"
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
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100"
              onClick={closeModal}
            >
              No
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600"
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

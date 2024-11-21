import { useEffect, useState } from "react";
import { DateRange } from "@mui/icons-material";
import TeleConsultationCardPatient from "../../components/TeleConsultationCardPatient.jsx";
import CustomDateFilter from "../../components/modals/CustomDateFilter.jsx";
import Modal from "react-modal";
import api from "../../api/api";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import { FaTrashAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

const TeleConsultation = () => {
  const [activeTab, setActiveTab] = useState("Today Appointment");
  const [dateRange, setDateRange] = useState("Any Date");
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);
  const [filterDates, setFilterDates] = useState({ fromDate: null, toDate: null });
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const loggedInDoctorId = decodedToken.id;

        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedAppointments = response.data.data.filter(
          (appointment) => appointment.patientId === loggedInDoctorId
        );

        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getCurrentAppointments = () => {
    const today = moment().startOf("day");
    let filteredAppointments;

    switch (activeTab) {
      case "Today Appointment":
        filteredAppointments = appointments.filter(
          (app) =>
            moment(app.appointmentDate).isSame(today, "day") && app.status !== "Cancelled"
        );
        break;
      case "Upcoming Appointment":
        filteredAppointments = appointments.filter((app) =>
          moment(app.appointmentDate).isAfter(today)
        );
        break;
      case "Previous Appointment":
        filteredAppointments = appointments.filter((app) =>
          moment(app.appointmentDate).isBefore(today)
        );
        break;
      case "Cancel Appointment":
        filteredAppointments = appointments.filter((app) => app.status === "Cancelled");
        break;
      default:
        filteredAppointments = appointments;
    }

    if (filterDates.fromDate && filterDates.toDate) {
      const fromDate = moment(filterDates.fromDate).startOf("day");
      const toDate = moment(filterDates.toDate).endOf("day");
      return filteredAppointments.filter((appointment) =>
        moment(appointment.appointmentDate).isBetween(fromDate, toDate, null, "[]")
      );
    }

    return filteredAppointments;
  };

  const currentAppointments = getCurrentAppointments();

  const handleApplyDateFilter = (fromDate, toDate) => {
    if (fromDate && toDate) {
      setDateRange(
        `${moment(fromDate).format("D MMM, YYYY")} - ${moment(toDate).format(
          "D MMM, YYYY"
        )}`
      );
      setFilterDates({ fromDate, toDate });
    }
    setOpenCustomDateModal(false);
  };

  const handleResetDateFilter = () => {
    setFilterDates({ fromDate: null, toDate: null });
    setDateRange("Any Date");
    setOpenCustomDateModal(false);
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
    setCancelLoading(true);
    try {
      await api.patch(`/appointments/cancel/${appointmentToCancel.id}`);
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentToCancel.id
            ? { ...appointment, status: "Cancelled" }
            : appointment
        )
      );
      closeModal();
      toast.success("Appointment Cancelled!");
    } catch (error) {
      console.error("Error canceling appointment:", error);
      toast.error("Failed to cancel appointment. Please try again.");
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg h-full">
      {/* Tabs for Appointment Types */}
      <div className="flex flex-wrap md:space-x-4 border-b mb-4">
        {[
          "Today Appointment",
          "Upcoming Appointment",
          "Previous Appointment",
          "Cancel Appointment",
        ].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-3 md:px-4 focus:outline-none font-medium ${
              activeTab === tab
                ? "border-b-4 border-customBlue text-customBlue"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-3 md:space-y-0">
        <h2 className="text-xl md:text-2xl font-semibold">Teleconsultation Module</h2>
        <div
          className="flex items-center border border-gray-300 rounded-xl px-4 py-2 cursor-pointer"
          onClick={() => setOpenCustomDateModal(true)}
        >
          <DateRange className="text-gray-600 mr-2" />
          <span className="text-gray-800">{dateRange}</span>
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
      </div>

      {/* Appointments Grid */}
      <div className="custom-scroll overflow-y-auto h-[620px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-md">
                  <Skeleton height={20} width="60%" className="mb-2" />
                  <Skeleton height={15} width="80%" className="mb-1" />
                  <Skeleton height={15} width="70%" className="mb-1" />
                  <Skeleton height={15} width="50%" />
                </div>
              ))
            : currentAppointments.map((patient, index) => (
                <TeleConsultationCardPatient
                  key={index}
                  patient={patient}
                  activeTab={activeTab}
                  openCancelModal={openCancelModal}
                />
              ))}
        </div>
      </div>

      {/* Date Filter Modal */}
      <CustomDateFilter
        open={openCustomDateModal}
        onClose={() => setOpenCustomDateModal(false)}
        onApply={handleApplyDateFilter}
        onReset={handleResetDateFilter}
      />

      {/* Cancel Appointment Modal */}
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
          <p className="text-gray-600 mb-6">Are you sure you want to cancel this appointment?</p>
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
              {cancelLoading ? "Canceling..." : "Yes"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeleConsultation;

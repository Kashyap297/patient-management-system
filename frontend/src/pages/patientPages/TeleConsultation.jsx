import { useEffect, useState } from 'react';
import { Tabs, Tab, Button } from '@mui/material';
import { DateRange } from '@mui/icons-material';
import TeleConsultationCardPatient from '../../components/TeleConsultationCardPatient.jsx';
import CustomDateFilter from '../../components/modals/CustomDateFilter.jsx';
import Modal from "react-modal";
import api from '../../api/api'; // Import the Axios instance from api.js
import moment from 'moment'; // For handling date comparisons
import { jwtDecode } from 'jwt-decode'; // To decode the token and extract doctorId
import { FaTrashAlt } from 'react-icons/fa';

Modal.setAppElement("#root");

const TeleConsultation = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState('2 March, 2022 - 13 March, 2022');
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);
  const [filterDates, setFilterDates] = useState({ fromDate: null, toDate: null });
  const [appointments, setAppointments] = useState([]); // State to store appointments
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for cancellation

  // Fetch the appointments for the logged-in doctor
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token); // Decode the token to get the doctorId
      const loggedInDoctorId = decodedToken.id; // Assuming the token has the doctor's ID as "id"

      const response = await api.get('/appointments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedAppointments = response.data.data;
      // Filter appointments for the logged-in doctor only
      const doctorAppointments = fetchedAppointments.filter(
        appointment => appointment.patientId === loggedInDoctorId
      );

      setAppointments(doctorAppointments); // Set only the logged-in doctor's appointments
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments(); // Fetch appointments when the component mounts
  }, []);

  const getCurrentAppointments = () => {
    const today = moment().startOf('day'); // Start of today for comparison
    let filteredAppointments;

    switch (activeTab) {
      case 0: // Today Appointment
        filteredAppointments = appointments.filter(
          app => moment(app.appointmentDate).isSame(today, 'day') && app.status !== 'Cancelled'
        );
        break;
      case 1: // Upcoming Appointment
        filteredAppointments = appointments.filter(
          app => moment(app.appointmentDate).isAfter(today)
        );
        break;
      case 2: // Previous Appointment
        filteredAppointments = appointments.filter(
          app => moment(app.appointmentDate).isBefore(today)
        );
        break;
      case 3: // Cancelled Appointment
        filteredAppointments = appointments.filter(app => app.status === 'Cancelled');
        break;
      default:
        filteredAppointments = appointments;
    }

    if (filterDates.fromDate && filterDates.toDate) {
      const fromDate = moment(filterDates.fromDate).startOf('day');
      const toDate = moment(filterDates.toDate).endOf('day');

      return filteredAppointments.filter((appointment) => {
        const appointmentDate = moment(appointment.appointmentDate);
        return appointmentDate.isBetween(fromDate, toDate, null, '[]');
      });
    }

    return filteredAppointments;
  };


  const currentAppointments = getCurrentAppointments();

  const handleApplyDateFilter = (fromDate, toDate) => {
    if (fromDate && toDate) {
      setDateRange(`${new Date(fromDate).toLocaleDateString()} - ${new Date(toDate).toLocaleDateString()}`);
      setFilterDates({ fromDate, toDate });
    }
    setOpenCustomDateModal(false);
  };

  const handleResetDateFilter = () => {
    setFilterDates({ fromDate: null, toDate: null });
    setDateRange('2 Jan, 2022 - 13 Jan, 2022');
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
    setLoading(true);
    try {
      const response = await api.patch(`/appointments/cancel/${appointmentToCancel.id}`);
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

  return (
    <div className="p-8 bg-white min-h-screen">
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
        <Tab label="Today Appointment" />
        <Tab label="Upcoming Appointment" />
        <Tab label="Previous Appointment" />
        <Tab label="Cancel Appointment" />
      </Tabs>

      <div className="mt-4 mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Teleconsultation Module</h2>
        <Button variant="outlined" startIcon={<DateRange />} color="secondary" onClick={() => setOpenCustomDateModal(true)}>
          {dateRange}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentAppointments.map((patient, index) => (
          <TeleConsultationCardPatient
            key={index}
            patient={patient}
            activeTab={activeTab}
            openCancelModal={openCancelModal} // Pass cancel modal function
          />
        ))}
      </div>

      <CustomDateFilter
        open={openCustomDateModal}
        onClose={() => setOpenCustomDateModal(false)}
        onApply={handleApplyDateFilter}
        onReset={handleResetDateFilter}
      />

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
              {loading ? "Canceling..." : "Yes"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeleConsultation;

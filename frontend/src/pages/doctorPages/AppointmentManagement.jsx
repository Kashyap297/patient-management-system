import { useState, useEffect } from 'react';
import { Button, IconButton, TextField, InputAdornment } from '@mui/material';
import { CalendarToday, Search, Close } from '@mui/icons-material'; // Keep other Material UI icons
import { FaTrashAlt } from 'react-icons/fa'; // Import FontAwesome trash icon from react-icons
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import api from "../../api/api"; // Assuming you have an API setup
import { jwtDecode } from "jwt-decode";
import { FaCalendarTimes, FaCalendarCheck } from 'react-icons/fa';  // Cancel and Reschedule appointment icons
import moment from 'moment';
import CustomDateFilter from '../../components/modals/CustomDateFilter';

// Modal for Payment Return Confirmation (second image)
const PaymentReturnModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[320px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-red-500">Cancel Onsite Appointment?</h2>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <p className="mb-4 text-center">
          Do you want to cancel this appointment?
        </p>
        <div className="flex justify-between">
          <Button variant="outlined" onClick={onClose}>No</Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>Yes</Button>
        </div>
      </div>
    </Modal>
  );
};

// Modal for Cancel Online Appointment (first image)
const CancelAppointmentModal = ({ open, onClose, onProceed }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[320px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-red-500">Cancel Online Appointment?</h2>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <p className="mb-4 text-center">
          If you cancel the appointment, you will need to return the payment.
        </p>
        <div className="flex justify-between">
          <Button variant="outlined" onClick={onClose}>No</Button>
          <Button variant="contained" color="primary" onClick={onProceed}>Payment Return</Button>
        </div>
      </div>
    </Modal>
  );
};

// Modal for Rescheduling Appointment (similar to EditSlotModal)
const RescheduleAppointmentModal = ({ open, onClose, appointment, timeSlots, onSave }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(appointment ? appointment.appointmentTime : '');

  if (!open || !appointment) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[320px]">
        <h2 className="text-xl font-bold mb-4">Edit Slot</h2>
        <label className="block mb-2">Select Time Slot</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
        >
          {timeSlots.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
        <div className="flex justify-end">
          <Button variant="outlined" onClick={onClose} className="mr-2">Cancel</Button>
          <Button variant="contained" color="primary" onClick={() => onSave(selectedTimeSlot)}>Save</Button>
        </div>
      </div>
    </Modal>
  );
};

const AppointmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Today Appointment');
  const [openCancelAppointmentModal, setOpenCancelAppointmentModal] = useState(false);
  const [openPaymentReturnModal, setOpenPaymentReturnModal] = useState(false);
  const [openRescheduleModal, setOpenRescheduleModal] = useState(false); // For rescheduling modal
  const [timeSlots, setTimeSlots] = useState([]); // For time slots
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);
  const [appointments, setAppointments] = useState({
    today: [],
    upcoming: [],
    previous: [],
    canceled: []
  });
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [appointmentToReschedule, setAppointmentToReschedule] = useState(null); // For rescheduling
  const [filterDates, setFilterDates] = useState({ fromDate: null, toDate: null }); // Define filterDates state
  const navigate = useNavigate();

  useEffect(() => {
    // Generate time slots dynamically
    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 8; hour <= 20; hour++) {
        const timeString = `${hour < 12 ? hour : hour - 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
        slots.push(timeString);
      }
      setTimeSlots(slots);
    };


    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const doctorId = decodedToken.id;
        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const appointmentsData = response.data.data || [];
        const today = new Date().toISOString().split("T")[0];
        const doctorAppointments = appointmentsData.filter(
          (appointment) => appointment.doctorId === doctorId
        );
        const todayAppointments = doctorAppointments.filter(appointment =>
          appointment.appointmentDate.startsWith(today)
        );
        const upcomingAppointments = doctorAppointments.filter(appointment =>
          new Date(appointment.appointmentDate) > new Date(today)
        );
        const previousAppointments = doctorAppointments.filter(appointment =>
          new Date(appointment.appointmentDate) < new Date(today)
        );

        setAppointments({
          today: todayAppointments,
          upcoming: upcomingAppointments,
          previous: previousAppointments,
          canceled: doctorAppointments.filter(app => app.status === "Cancelled")
        });
      } catch (error) {
        console.error("Error fetching doctor's appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const getAppointments = () => {
    // If custom date filter is applied, override tab filters
    if (filterDates.fromDate || filterDates.toDate) {
      return Object.values(appointments).flat().filter((appointment) => {
        const appointmentDate = new Date(appointment.appointmentDate);
        const isWithinRange =
          (!filterDates.fromDate || appointmentDate >= new Date(filterDates.fromDate)) &&
          (!filterDates.toDate || appointmentDate <= new Date(filterDates.toDate));
        return isWithinRange;
      });
    }

    // Otherwise, return appointments based on the active tab
    switch (activeTab) {
      case 'Today Appointment':
        return appointments.today.filter(app => app.status !== 'Cancelled'); // Exclude cancelled appointments
      case 'Upcoming Appointment':
        return appointments.upcoming.filter(app => app.status !== 'Cancelled'); // Exclude cancelled appointments
      case 'Previous Appointment':
        return appointments.previous.filter(app => app.status !== 'Cancelled'); // Exclude cancelled appointments
      case 'Cancel Appointment':
        return appointments.canceled; // Only show cancelled appointments
      default:
        return [];
    }
  };


  const filteredAppointments = getAppointments().filter((appointment) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const appointmentDate = new Date(appointment.appointmentDate);

    const matchesSearchTerm =
      appointment.patientName.toLowerCase().includes(lowerSearchTerm) ||
      appointment.diseaseName.toLowerCase().includes(lowerSearchTerm) ||
      (appointment.patientIssue && appointment.patientIssue.toLowerCase().includes(lowerSearchTerm));

    const matchesDateRange =
      (!filterDates.fromDate || appointmentDate >= new Date(filterDates.fromDate)) &&
      (!filterDates.toDate || appointmentDate <= new Date(filterDates.toDate));

    return matchesSearchTerm && matchesDateRange;
  });

  const handleOpenCancelAppointmentModal = (appointment) => {
    setAppointmentToCancel(appointment);
    setOpenCancelAppointmentModal(true);
  };
  // Open reschedule modal


  // Save new time slot for rescheduled appointment
  const handleSaveReschedule = async (newTimeSlot) => {
    try {
      const response = await api.patch(`/appointments/reschedule/${appointmentToReschedule.id}`, {
        appointmentTime: newTimeSlot,
      });

      if (response.status === 200) {
        setAppointments((prevAppointments) => ({
          ...prevAppointments,
          upcoming: prevAppointments.upcoming.map((appt) =>
            appt.id === appointmentToReschedule.id
              ? { ...appt, appointmentTime: newTimeSlot }
              : appt
          ),
        }));
        setOpenRescheduleModal(false);
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  // Proceed to Payment Return modal
  const handlePaymentReturn = () => {
    setOpenCancelAppointmentModal(false);
    setOpenPaymentReturnModal(true);
  };

  const handleConfirmCancelAppointment = async () => {
    try {
      await api.patch(`/appointments/cancel/${appointmentToCancel.id}`, {
        status: "Cancelled",
      });
      setAppointments((prevAppointments) => ({
        ...prevAppointments,
        today: prevAppointments.today.filter(app => app.id !== appointmentToCancel.id),
        upcoming: prevAppointments.upcoming.filter(app => app.id !== appointmentToCancel.id),
        previous: prevAppointments.previous.filter(app => app.id !== appointmentToCancel.id),
        canceled: [...prevAppointments.canceled, { ...appointmentToCancel, status: "Cancelled" }]
      }));
    } catch (error) {
      console.error("Error cancelling the appointment:", error);
    } finally {
      setOpenPaymentReturnModal(false);
    }
  };

  const handleApplyDateFilter = (fromDate, toDate) => {
    setFilterDates({ fromDate, toDate });
    setOpenCustomDateModal(false); // Close the modal after applying
  };
  const handleResetDateFilter = () => {
    setFilterDates({ fromDate: null, toDate: null });
    setOpenCustomDateModal(false);
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-8 text-sm font-semibold text-gray-500">
          {['Today Appointment', 'Upcoming Appointment', 'Previous Appointment', 'Cancel Appointment'].map((tab) => (
            <Button
              key={tab}
              className={activeTab === tab ? '!text-blue-600 !border-b-2 !border-blue-600' : 'text-gray-400'}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <TextField
            variant="outlined"
            placeholder="Search Patient"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<CalendarToday />}
            className="!text-sm"
            onClick={() => setOpenCustomDateModal(true)}
          >
            Any Date
          </Button>
          <Button variant="contained" color="primary" className="!text-sm" onClick={() => navigate('/doctor/appointment-time-slot')}>
            Appointment Time Slot
          </Button>
        </div>
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        <table className="min-w-full table-auto">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th className="p-3 text-left text-sm font-semibold">Patient Name</th>
              <th className="p-3 text-left text-sm font-semibold">Disease Name</th>
              <th className="p-3 text-left text-sm font-semibold">Patient Issue</th>
              <th className="p-3 text-left text-sm font-semibold">Appointment Date</th>
              <th className="p-3 text-left text-sm font-semibold">Appointment Time</th>
              <th className="p-3 text-left text-sm font-semibold">Appointment Type</th>
              <th className="p-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{appointment.patientName}</td>
                  <td className="p-3">{appointment.diseaseName}</td>
                  <td className="p-3">{appointment.patientIssue}</td>
                  <td className="p-3">{moment(appointment.appointmentDate).format("DD-MM-YYYY")}</td> {/* Format date here */}
                  <td className="p-3 text-blue-600">{appointment.appointmentTime}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${appointment.appointmentType === 'Online' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
                      {appointment.appointmentType}
                    </span>
                  </td>
                  <td className="p-3 flex space-x-2">
                    {/* Cancel Appointment */}
                    <IconButton color="secondary" onClick={() => handleOpenCancelAppointmentModal(appointment)}>
                      <FaCalendarTimes style={{ color: 'red', fontSize: '24px' }} />
                    </IconButton>

                    {/* Reschedule Appointment */}
                    <Link to='/doctor/edit-appointment'>
                      <IconButton color="primary">
                        <FaCalendarCheck style={{ color: 'blue', fontSize: '24px' }} />
                      </IconButton>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No appointments found for the selected criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CancelAppointmentModal
        open={openCancelAppointmentModal}
        onClose={() => setOpenCancelAppointmentModal(false)}
        onProceed={handlePaymentReturn}
      />

      <PaymentReturnModal
        open={openPaymentReturnModal}
        onClose={() => setOpenPaymentReturnModal(false)}
        onConfirm={handleConfirmCancelAppointment}
      />
      <CustomDateFilter
        open={openCustomDateModal}
        onClose={() => setOpenCustomDateModal(false)}
        onApply={handleApplyDateFilter} // Pass the apply handler to modal
        onReset={handleResetDateFilter} // Pass the reset handler to modal
      />
      {/* Reschedule Modal */}
      <RescheduleAppointmentModal
        open={openRescheduleModal}
        onClose={() => setOpenRescheduleModal(false)}
        appointment={appointmentToReschedule}
        timeSlots={timeSlots}
        onSave={handleSaveReschedule}
      />
    </div>
  );
};

export default AppointmentManagement;

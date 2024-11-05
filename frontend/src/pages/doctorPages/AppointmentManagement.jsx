import { useState, useEffect } from "react";
import { Button, IconButton, TextField, InputAdornment } from "@mui/material";
import { CalendarToday, Search, Close } from "@mui/icons-material"; // Keep other Material UI icons
import { FaCalendar, FaSearch, FaTrashAlt } from "react-icons/fa"; // Import FontAwesome trash icon from react-icons
import { Link, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import api from "../../api/api"; // Assuming you have an API setup
import { jwtDecode } from "jwt-decode";
import { FaCalendarTimes, FaCalendarCheck } from "react-icons/fa"; // Cancel and Reschedule appointment icons
import moment from "moment";
import CustomDateFilter from "../../components/modals/CustomDateFilter";
import noAppointmentRecords from "../../assets/images/noappointmentrecord.png";

// Modal for Payment Return Confirmation
const PaymentReturnModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl border-t-8 border-[#E11D29] shadow-lg w-100 text-center relative">
        
        {/* Icon at the top */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-500 text-white rounded-full p-4">
            <FaCalendarTimes className="text-3xl" />
          </div>
        </div>

        {/* Modal Header */}
        <h2 className="text-xl font-bold text-[#030229] mb-2">
          Cancel Onsite Appointment?
        </h2>

        {/* Modal Subtext */}
        <p className="text-sm text-[#4F4F4F] mb-6">
          Do you want to cancel this <br /> appointment?
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-700 px-4 py-2 rounded-xl hover:bg-[#f6f8fb] border border-gray-300 w-full"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            type="submit"
            className="bg-[#0EABEB] text-white px-4 py-2 rounded-xl w-full"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};


const CancelAppointmentModal = ({ open, onClose, onProceed }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl border-t-8 border-[#E11D29] shadow-lg w-100 text-center relative">
        {/* Icon at the top */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-500 text-white rounded-full p-4">
            <FaCalendarTimes className="text-3xl" />
          </div>
        </div>

        {/* Modal Header */}
        <h2 className="text-xl font-bold text-[#030229] mb-2">
          Cancel Online Appointment?
        </h2>

        {/* Modal Subtext */}
        <p className="text-sm text-[#4F4F4F] mb-6">
          If you cancel the appointment you <br /> have to return the payment.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-700 px-4 py-2 rounded-xl hover:bg-[#f6f8fb] border w-100"
          >
            No
          </button>
          <button
            onClick={onProceed}
            type="submit"
            className="bg-[#f6f8fb] text-[#4F4F4F] px-4 py-2 rounded-xl hover:text-white hover:bg-[#0EABEB] w-100 transition"
          >
            Payment Return
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal for Rescheduling Appointment (similar to EditSlotModal)
const RescheduleAppointmentModal = ({
  open,
  onClose,
  appointment,
  timeSlots,
  onSave,
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    appointment ? appointment.appointmentTime : ""
  );

  if (!open || !appointment) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-xl shadow-lg w-80">
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
            <button
              className="border border-gray-400 rounded px-4 py-1 mr-2 text-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-primary text-white px-4 py-1 rounded"
              onClick={() => onSave(selectedTimeSlot)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const AppointmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Today Appointment");
  const [openCancelAppointmentModal, setOpenCancelAppointmentModal] =
    useState(false);
  const [openPaymentReturnModal, setOpenPaymentReturnModal] = useState(false);
  const [openRescheduleModal, setOpenRescheduleModal] = useState(false); // For rescheduling modal
  const [timeSlots, setTimeSlots] = useState([]); // For time slots
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);
  const [appointments, setAppointments] = useState({
    today: [],
    upcoming: [],
    previous: [],
    canceled: [],
  });
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [appointmentToReschedule, setAppointmentToReschedule] = useState(null); // For rescheduling
  const [filterDates, setFilterDates] = useState({
    fromDate: null,
    toDate: null,
  }); // Define filterDates state
  const navigate = useNavigate();

  useEffect(() => {
    // Generate time slots dynamically
    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 8; hour <= 20; hour++) {
        const timeString = `${hour < 12 ? hour : hour - 12}:00 ${
          hour < 12 ? "AM" : "PM"
        }`;
        slots.push(timeString);
      }
      setTimeSlots(slots);
    };

    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
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
        const todayAppointments = doctorAppointments.filter((appointment) =>
          appointment.appointmentDate.startsWith(today)
        );
        const upcomingAppointments = doctorAppointments.filter(
          (appointment) =>
            new Date(appointment.appointmentDate) > new Date(today)
        );
        const previousAppointments = doctorAppointments.filter(
          (appointment) =>
            new Date(appointment.appointmentDate) < new Date(today)
        );

        setAppointments({
          today: todayAppointments,
          upcoming: upcomingAppointments,
          previous: previousAppointments,
          canceled: doctorAppointments.filter(
            (app) => app.status === "Cancelled"
          ),
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
      return Object.values(appointments)
        .flat()
        .filter((appointment) => {
          const appointmentDate = new Date(appointment.appointmentDate);
          const isWithinRange =
            (!filterDates.fromDate ||
              appointmentDate >= new Date(filterDates.fromDate)) &&
            (!filterDates.toDate ||
              appointmentDate <= new Date(filterDates.toDate));
          return isWithinRange;
        });
    }

    // Otherwise, return appointments based on the active tab
    switch (activeTab) {
      case "Today Appointment":
        return appointments.today.filter((app) => app.status !== "Cancelled"); // Exclude cancelled appointments
      case "Upcoming Appointment":
        return appointments.upcoming.filter(
          (app) => app.status !== "Cancelled"
        ); // Exclude cancelled appointments
      case "Previous Appointment":
        return appointments.previous.filter(
          (app) => app.status !== "Cancelled"
        ); // Exclude cancelled appointments
      case "Cancel Appointment":
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
      (appointment.patientIssue &&
        appointment.patientIssue.toLowerCase().includes(lowerSearchTerm));

    const matchesDateRange =
      (!filterDates.fromDate ||
        appointmentDate >= new Date(filterDates.fromDate)) &&
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
      const response = await api.patch(
        `/appointments/reschedule/${appointmentToReschedule.id}`,
        {
          appointmentTime: newTimeSlot,
        }
      );

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
        today: prevAppointments.today.filter(
          (app) => app.id !== appointmentToCancel.id
        ),
        upcoming: prevAppointments.upcoming.filter(
          (app) => app.id !== appointmentToCancel.id
        ),
        previous: prevAppointments.previous.filter(
          (app) => app.id !== appointmentToCancel.id
        ),
        canceled: [
          ...prevAppointments.canceled,
          { ...appointmentToCancel, status: "Cancelled" },
        ],
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
    <div className="bg-white h-full p-6 rounded-xl shadow-md">
      <div className="">
        {/* Tabs */}
        <div className="flex space-x-4 mb-4 border-b">
          {[
            "Today Appointment",
            "Upcoming Appointment",
            "Previous Appointment",
            "Cancel Appointment",
          ].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 ${
                activeTab === tab
                  ? "border-b-2 border-[#0eabeb] text-[#0eabeb]"
                  : "text-[#667080]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search and Controls */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{activeTab}</h2>
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="flex items-center bg-[#f6f8fb] rounded-full px-4 py-2 w-full max-w-md">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search Patient"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#f6f8fb] focus:outline-none w-full text-gray-600"
              />
            </div>

            {/* "Any Date" Button */}
            <button
              className="border border-gray-300 px-4 py-2 rounded-xl w-1/2 text-gray-600 flex items-center space-x-1 hover:bg-gray-100 transition"
              onClick={() => setOpenCustomDateModal(true)}
            >
              <FaCalendar className="text-[#1E1E1E]" />
              <span>Any Date</span>
            </button>

            {/* "Appointment Time Slot" Button */}
            <button
              className="bg-[#0eabeb] text-white px-4 py-2 rounded-xl w-full flex items-center space-x-1  transition"
              onClick={() => navigate("/doctor/appointment-time-slot")}
            >
              <FaCalendar className="text-white" />
              <span>Appointment Time Slot</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-h-[600px] overflow-y-auto custom-scroll rounded-t-xl">
        <table className="min-w-full table-auto rounded-t-xl">
          <thead className="sticky top-0 bg-[#f6f8fb] z-10">
            <tr>
              <th className="p-3 text-center font-semibold">Patient Name</th>
              <th className="p-3 text-center font-semibold">Disease Name</th>
              <th className="p-3 text-center font-semibold">Patient Issue</th>
              <th className="p-3 text-center font-semibold">
                Appointment Date
              </th>
              <th className="p-3 text-center font-semibold">
                Appointment Time
              </th>
              <th className="p-3 text-center font-semibold">
                Appointment Type
              </th>
              <th className="p-3 text-center font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <tr key={index} className="border-t text-center">
                  <td className="p-3 text-[#4F4F4F]">
                    {appointment.patientName}
                  </td>
                  <td className="p-3 text-[#4F4F4F]">
                    {appointment.diseaseName}
                  </td>
                  <td className="p-3 text-[#4F4F4F]">
                    {appointment.patientIssue}
                  </td>
                  <td className="p-3 text-[#4F4F4F]">
                    {moment(appointment.appointmentDate).format("DD-MM-YYYY")}
                  </td>
                  <td className="p-3 text-[#718EBF]">
                    <span className="bg-[#f6f8fb] px-3 py-2 rounded-full font-semibold">
                      {appointment.appointmentTime}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-2 rounded-full ${
                        appointment.appointmentType === "Online"
                          ? "bg-[#fff9e7] text-[#FFC313]"
                          : "bg-[#eef1fd] text-[#5678E9]"
                      }`}
                    >
                      {appointment.appointmentType}
                    </span>
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button
                      className="text-red-500"
                      onClick={() =>
                        handleOpenCancelAppointmentModal(appointment)
                      }
                    >
                      <FaCalendarTimes className="text-xl" />
                    </button>
                    <Link to="/doctor/edit-appointment">
                      <button className="text-blue-500">
                        <FaCalendarCheck className="text-xl" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-16">
                  <div className="flex flex-col items-center">
                    <img
                      src={noAppointmentRecords}
                      alt="No Patient Found"
                      className="w-80 mb-4"
                    />
                  </div>
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

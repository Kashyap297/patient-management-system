import React, { useState, useEffect } from 'react';
import moment from 'moment';
import api from "../api/api"; // Axios instance for API calls
import Modal from 'react-modal'; // Modal package, install via npm: npm install react-modal

// Initialize the Modal
Modal.setAppElement('#root');

// TimeSlotTable Component
const TimeSlotTable = ({ doctorDetails, specialty, country, state, city, hospital, selectedDoctor }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('day')); // Starting date of the current week
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlotsByDate, setBookedSlotsByDate] = useState({}); // Booked slots grouped by date
  const [selectedSlot, setSelectedSlot] = useState(null); // To store the selected slot for booking
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state
  const [patientIssue, setPatientIssue] = useState(""); // Patient issue field
  const [diseaseName, setDiseaseName] = useState(""); // Disease name field
  const [appointmentType, setAppointmentType] = useState("Online"); // Appointment type
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [appointmentSuccess, setAppointmentSuccess] = useState(false); // Success message after booking

  // Fetch booked slots whenever doctorDetails changes
  useEffect(() => {
    if (doctorDetails) {
      const fetchBookedSlots = async () => {
        try {
          const response = await api.get(`/appointments/booked/${doctorDetails._id}`);
          setBookedSlotsByDate(response.data.bookedSlots); // Update booked slots by date
        } catch (error) {
          console.error("Error fetching booked slots:", error);
        }
      };
      fetchBookedSlots();
    }
  }, [doctorDetails]);

  // Helper function to check if a time slot is booked for a specific date
  const isSlotBooked = (timeSlot, date) => {
    return bookedSlotsByDate[date] && bookedSlotsByDate[date].includes(timeSlot);
  };

  // Calculate the 7 days in the current week (starting from the currentWeekStart)
  const getWeekDays = (start) => {
    return Array.from({ length: 7 }, (_, i) => moment(start).add(i, 'days').format('YYYY-MM-DD'));
  };

  const days = getWeekDays(currentWeekStart); // Get current week days (in YYYY-MM-DD format)

  // Handle next and previous buttons to change the week
  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => moment(prev).add(7, 'days')); // Move 7 days forward
  };

  const handlePreviousWeek = () => {
    if (moment(currentWeekStart).isAfter(moment(), 'day')) {
      setCurrentWeekStart((prev) => moment(prev).subtract(7, 'days')); // Move 7 days back
    }
  };

  // Helper function to convert time string to minutes
  const timeToMinutes = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  // Generate time slots dynamically based on the doctor's working hours and break time
  useEffect(() => {
    if (doctorDetails && doctorDetails.doctorDetails && doctorDetails.doctorDetails.workingHours) {
      const { workingHours } = doctorDetails.doctorDetails;
      const { workingTime, checkupTime, breakTime } = workingHours;

      if (workingTime && checkupTime && breakTime) {
        const startTime = timeToMinutes(workingTime.split(" - ")[0]); // Start time
        const endTime = timeToMinutes(workingTime.split(" - ")[1]); // End time
        const checkupEnd = timeToMinutes(checkupTime.split(" - ")[1]); // End of checkup time
        const breakStart = timeToMinutes(breakTime); // Break start time
        const breakEnd = breakStart + 60; // Assuming 1 hour for break

        const slots = [];
        for (let time = startTime; time < endTime; time += 60) {
          let slotStatus = 'No Schedule'; // Default status

          // Handle break time
          if (time >= breakStart && time < breakEnd) {
            slotStatus = 'Lunch Break';
          }
          // Handle checkup availability
          else if (time < checkupEnd) {
            slotStatus = 'Available';
          }

          const slotTime = `${Math.floor(time / 60).toString().padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")} ${time < 720 ? 'AM' : 'PM'}`;
          slots.push({ time: slotTime, status: slotStatus });
        }

        setTimeSlots(slots);
      }
    }
  }, [doctorDetails]);

  // Function to open the modal with selected slot info
  const handleSlotClick = (time, day) => {
    setSelectedSlot({ time, day });
    setModalIsOpen(true); // Open modal
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setAppointmentSuccess(false);
  };

  // Function to handle appointment booking
  const handleBookAppointment = async () => {
    // Log the values for debugging
    console.log("Patient Issue:", patientIssue);
    console.log("Specialty:", specialty);
    console.log("Country:", country);
    console.log("State:", state);
    console.log("City:", city);
    console.log("Selected Hospital:", hospital);
    console.log("Selected Doctor:", doctorDetails._id);
    console.log("Selected Slot:", selectedSlot);
    console.log("Appointment Type:", appointmentType);

    // Check if all required fields are filled
    if (!patientIssue || !specialty || !country || !state || !city || !hospital || !doctorDetails._id || !selectedSlot) {
      alert("Please provide all the necessary details.");
      return;
    }

    setLoading(true);
    try {
      const appointmentData = {
        specialty,
        country,
        state,
        city,
        appointmentDate: selectedSlot.day,
        appointmentTime: selectedSlot.time,
        hospital,
        doctor: doctorDetails._id,
        patientIssue,
        diseaseName,
        appointmentType,
        doctorFees: doctorDetails.doctorDetails.consultationFee,
      };

      // API call to book appointment
      console.log("Booking Appointment Data:", appointmentData);
      const response = await api.post("/appointment", appointmentData);
      setAppointmentSuccess(true); // Show success message
      console.log("Appointment booked successfully", response.data);
    } catch (error) {
      console.error("Error booking appointment", error);
      alert("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        {/* Previous Week Button */}
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={handlePreviousWeek}
          disabled={moment(currentWeekStart).isSameOrBefore(moment(), 'day')}
        >
          &lt;
        </button>

        {/* Display the current week range */}
        <h1 className="text-xl font-bold">
          {moment(currentWeekStart).format('DD MMMM, YYYY')} - {moment(currentWeekStart).add(6, 'days').format('DD MMMM, YYYY')}
        </h1>

        {/* Next Week Button */}
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={handleNextWeek}>
          &gt;
        </button>
      </div>

      {/* Table to display the time slots */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Time</th>
            {days.map((day) => (
              <th key={day} className="border px-4 py-2">{moment(day).format('ddd D')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
  {timeSlots.length === 0 ? (
    <tr>
      <td className="border px-4 py-2 text-center" colSpan={days.length + 1}>
        No Slots Available
      </td>
    </tr>
  ) : (
    timeSlots.map((slot) => (
      <tr key={slot.time}>
        <td className="border px-4 py-2">{slot.time}</td>
        {days.map((day) => (
          <td key={day} className="border px-4 py-2 text-center">
            {isSlotBooked(slot.time, day) ? (
              <span className="text-gray-400">Booked</span>
            ) : slot.status === 'Available' ? (
              <span
                className="text-green-500 cursor-pointer"
                onClick={() => handleSlotClick(slot.time, day)}
              >
                Available
              </span>
            ) : slot.status === 'Lunch Break' ? (
              <span className="text-yellow-500">Lunch Break</span>
            ) : (
              <span className="text-gray-400">{slot.status}</span>
            )}
          </td>
        ))}
      </tr>
    ))
  )}
</tbody>

      </table>

      {/* Modal for booking appointment */}
      {selectedSlot && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Appointment Booking"
          className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto my-16"
          overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
        >
          {appointmentSuccess ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Appointment Booked Successfully!</h2>
              <p>Your appointment has been booked for {moment(selectedSlot.day).format('MMMM D, YYYY')} at {selectedSlot.time}.</p>
              <button
                className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={closeModal}
              >
                Okay
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
              <p>Appointment Date: {moment(selectedSlot.day).format('MMMM D, YYYY')}</p>
              <p>Appointment Time: {selectedSlot.time}</p>
              <div className="mt-4">
                <label className="block mb-2 font-semibold">Patient Issue</label>
                <input
                  type="text"
                  placeholder="Enter Patient Issue"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={patientIssue}
                  onChange={(e) => setPatientIssue(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2 font-semibold">Disease Name (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter Disease Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={diseaseName}
                  onChange={(e) => setDiseaseName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2 font-semibold">Appointment Type</label>
                <select
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Online">Online</option>
                  <option value="Onsite">Onsite</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={closeModal} className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-md">
                  Cancel
                </button>
                <button
                  onClick={handleBookAppointment}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Book Appointment"}
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
};

export default TimeSlotTable;

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {jwtDecode} from 'jwt-decode'; // Ensure you're importing jwt-decode correctly
import api from "../../api/api"; // Assuming you have an API setup

const AppointmentTimeSlot = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week')); // Start of the current week
  const [appointments, setAppointments] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  // Fetch appointments for the logged-in doctor
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        const decodedToken = jwtDecode(token); // Decode the token to get doctorId
        const doctorId = decodedToken.id; // Assuming the doctorId is stored in 'id' field

        // Fetch appointments and filter them by the logged-in doctor's ID
        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the header
          },
        });

        const appointmentsData = response.data.data || [];

        // Filter appointments for the logged-in doctor
        const doctorAppointments = appointmentsData.filter(
          (appointment) => appointment.doctorId === doctorId
        );

        setAppointments(doctorAppointments);
      } catch (error) {
        console.error("Error fetching doctor's appointments:", error);
      }
    };

    fetchAppointments();
  }, [currentWeekStart]); // Re-fetch appointments whenever the week changes

  // Helper function to normalize time format to 'HH:MM AM/PM'
  const formatTime = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    // Convert to 12-hour format
    if (hours > 12) {
      hours -= 12;
    }
    if (hours === 0) {
      hours = 12;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Helper function to get the days of the current week
  const getWeekDays = (start) => {
    return Array.from({ length: 7 }, (_, i) => moment(start).add(i, 'days').format('YYYY-MM-DD'));
  };

  const days = getWeekDays(currentWeekStart); // Get current week days

  // Calculate the time slots dynamically (e.g., 8 AM to 8 PM)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      const timeString = `${hour < 12 ? hour : hour - 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
      slots.push(timeString);
    }
    setTimeSlots(slots);
  };

  useEffect(() => {
    generateTimeSlots(); // Generate time slots when component loads
  }, []);

  // Helper function to get appointments for a specific time slot and day
  const getAppointmentsForSlot = (day, timeSlot) => {
    return appointments.filter(
      (appointment) => 
        moment(appointment.appointmentDate).format('YYYY-MM-DD') === day &&
        moment(appointment.appointmentTime, 'hh:mm A').format('hh:mm A') === moment(timeSlot, 'hh:mm A').format('hh:mm A')
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      {/* Week Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setCurrentWeekStart(moment(currentWeekStart).subtract(7, 'days'))} // Enable previous week navigation
        >
          &lt;
        </button>
        <h1 className="text-xl font-bold">
          {moment(currentWeekStart).format('DD MMMM, YYYY')} - {moment(currentWeekStart).add(6, 'days').format('DD MMMM, YYYY')}
        </h1>
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setCurrentWeekStart(moment(currentWeekStart).add(7, 'days'))}>
          &gt;
        </button>
      </div>

      {/* Time Slot Table */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Time</th>
            {days.map((day) => (
              <th key={day} className="border px-4 py-2">{moment(day).format('ddd D')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <td className="border px-4 py-2">{time}</td>
              {days.map((day) => {
                const appointmentsForSlot = getAppointmentsForSlot(day, time);
                return (
                  <td key={day} className="border px-4 py-2 text-center">
                    {appointmentsForSlot.length > 0 ? (
                      appointmentsForSlot.map((appointment) => (
                        <div key={appointment.id} className="text-green-500 mb-2">
                          <div>{appointment.patientName}</div> {/* Displaying Patient Name */}
                          <div>{appointment.diseaseName}</div>
                          <div>{appointment.appointmentTime}</div>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400">No Schedule</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTimeSlot;

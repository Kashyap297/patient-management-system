import React, { useState, useEffect } from "react";
import { Button, Modal, IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import moment from "moment";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";
import { FaCalendarCheck } from "react-icons/fa";

const RescheduleAppointmentModal = ({ open, onClose, appointment, timeSlots, onSave }) => {
  const [selectedDate, setSelectedDate] = useState(moment(appointment?.appointmentDate).format('YYYY-MM-DD'));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(appointment ? appointment.appointmentTime : '');

  if (!open || !appointment) return null;

  const handleSave = () => {
    onSave(selectedDate, selectedTimeSlot);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[320px]">
        
        {/* Modal Header */}
        <h2 className="text-xl font-bold text-[#030229] mb-4 pb-2 border-b">
          Reschedule Appointment
        </h2>

        {/* Date Picker Field with Floating Label */}
        <div className="relative mb-4">
          <input
            type="date"
            id="select-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="peer w-full px-4 py-2 border text-gray-700 rounded-xl bg-gray-50 focus:outline-none focus:ring-0 border-gray-300"
          />
          <label
            htmlFor="select-date"
            className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
          >
            Select Date
          </label>
        </div>

        {/* Time Slot Selector with Floating Label */}
        <div className="relative mb-6">
          <select
            id="select-time"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            className="peer custom-scroll w-full px-4 py-2 border rounded-xl text-gray-700 bg-gray-50 focus:outline-none focus:ring-0 border-gray-300"
          >
            <option value="">Select Time</option>
            {timeSlots.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
          <label
            htmlFor="select-time"
            className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
          >
            Select Time
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-100 border border-gray-300 w-1/2 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            type="button"
            className="flex items-center justify-center bg-[#0EABEB] text-white px-4 py-2 rounded-xl w-1/2 font-medium ml-4"
          >
            <FaCalendarCheck className="mr-2" />
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};


const RescheduleAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openRescheduleModal, setOpenRescheduleModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Today");
  const [currentWeekStart, setCurrentWeekStart] = useState(
    moment().startOf("week")
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const patientId = decodedToken.id;

        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredAppointments = response.data.data.filter(
          (appointment) =>
            appointment.patientId === patientId &&
            appointment.status !== "Cancelled"
        );
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

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

    fetchAppointments();
    generateTimeSlots();
  }, []);

  const handleOpenRescheduleModal = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenRescheduleModal(true);
  };

  const handleSaveReschedule = async (newDate, newTimeSlot) => {
    try {
      await api.patch(`/appointments/reschedule/${selectedAppointment.id}`, {
        appointmentDate: newDate,
        appointmentTime: newTimeSlot,
      });

      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === selectedAppointment.id
            ? {
                ...appt,
                appointmentDate: newDate,
                appointmentTime: newTimeSlot,
              }
            : appt
        )
      );

      setOpenRescheduleModal(false);
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  // Create a week grid based on the current week
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    currentWeekStart.clone().add(i, "days").format("YYYY-MM-DD")
  );

  const renderAppointmentGrid = () => {
    return (
      <table className="min-w-full table-auto border-collapse bg-white rounded-xl shadow overflow-hidden">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-100 text-sm font-semibold text-gray-600">
              Time
            </th>
            {weekDays.map((day, index) => (
              <th
                key={index}
                className="border px-4 py-2 bg-gray-100 text-sm font-semibold text-[#0eabeb]"
              >
                {moment(day).format("ddd, DD MMM")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-[#0eabeb] text-sm font-semibold">
                {time}
              </td>
              {weekDays.map((day, index) => {
                const dayAppointments = appointments.filter(
                  (appointment) =>
                    moment(appointment.appointmentDate).format("YYYY-MM-DD") ===
                      day && appointment.appointmentTime === time
                );

                return (
                  <td
                    key={index}
                    className={`border px-4 py-2 text-center ${
                      dayAppointments.length > 0
                        ? "bg-[#0eabeb] text-white rounded-xl"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    {dayAppointments.length > 0 ? (
                      dayAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="mb-2 cursor-pointer p-2 rounded-xl bg-[#0eabeb] text-white transition"
                          onClick={() => handleOpenRescheduleModal(appointment)}
                        >
                          <div className="font-semibold">
                            {appointment.doctorName}
                          </div>
                          <div className="text-sm">
                            {appointment.diseaseName}
                          </div>
                          <div className="text-xs text-white">
                            {appointment.appointmentTime}
                          </div>
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
    );
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-[#030229]">
        Appointment Time Slot
      </h2>

      {/* Navigation buttons for previous/next week */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
          onClick={() =>
            setCurrentWeekStart(currentWeekStart.clone().subtract(7, "days"))
          }
        >
          &lt; Previous Week
        </button>
        <h3 className="text-xl font-medium text-[#0eabeb] font-semibold">
          {moment(currentWeekStart).format("DD MMMM, YYYY")} -{" "}
          {moment(currentWeekStart).add(6, "days").format("DD MMMM, YYYY")}
        </h3>
        <button
          className="px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
          onClick={() =>
            setCurrentWeekStart(currentWeekStart.clone().add(7, "days"))
          }
        >
          Next Week &gt;
        </button>
      </div>

      {/* Render the Appointment Grid */}
      <div className="overflow-x-auto custom-scroll">
        {renderAppointmentGrid()}
      </div>

      {/* Reschedule Modal */}
      <RescheduleAppointmentModal
        open={openRescheduleModal}
        onClose={() => setOpenRescheduleModal(false)}
        appointment={selectedAppointment}
        timeSlots={timeSlots}
        onSave={handleSaveReschedule}
      />
    </div>
  );
};

export default RescheduleAppointment;

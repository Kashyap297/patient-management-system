import React, { useState, useEffect } from "react";
import moment from "moment";
import { jwtDecode } from "jwt-decode"; // Ensure you're importing jwt-decode correctly
import api from "../../api/api"; // Assuming you have an API setup
import { FaClock, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

// Modal Component for writing a note and disabling the appointment
const WriteNoteModal = ({ show, onClose, appointment, onSaveNote }) => {
  const [note, setNote] = useState(""); // Track the note content

  if (!show || !appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-1/5">
        {/* Modal Header */}
        <h2 className="text-xl font-bold text-[#030229] mb-4 border-b pb-2">
          Not Available
        </h2>

        {/* Appointment Date and Time */}
        <div className="flex items-center mb-4 text-gray-600">
          <FaClock className="text-gray-500 mr-2" />
          <span>
            {moment(appointment.appointmentDate).format("dddd, DD MMMM YYYY")}{" "}
            {appointment.appointmentTime}
          </span>
        </div>

        {/* Note Text Area */}
        <div className="relative mb-6">
          <textarea
            id="note"
            name="note"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 text-gray-700 resize-none"
            placeholder="Add Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="4"
          ></textarea>
          <label
            htmlFor="note"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229]  peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-4"
          >
            Add Note <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="w-1/2 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 mr-2 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onSaveNote(note)}
            className="w-1/2 py-2 flex items-center justify-center text-white bg-[#0eabeb] rounded-xl  font-medium"
          >
            Disable
          </button>
        </div>
      </div>
    </div>
  );
};
// "Not Available" Modal with Edit/Delete buttons
const NotAvailableModal = ({ show, appointment, note, onEdit, onDelete }) => {
  if (!show || !appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-1/5">
        {/* Modal Header */}
        <h2 className="text-xl font-bold text-[#030229] mb-4 border-b pb-2">
          Not Available
        </h2>

        {/* Appointment Date and Time */}
        <div className="flex items-center mb-4 text-gray-600">
          <FaClock className="text-gray-500 mr-2" />
          <span>
            {moment(appointment.appointmentDate).format("dddd, DD MMMM YYYY")}{" "}
            {appointment.appointmentTime}
          </span>
        </div>
        <div className="flex items-center mb-4 text-gray-600">
          <FaClock className="text-gray-500 mr-2" />
          <p>{note}</p>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onEdit}
            className="w-1/2 py-2 text-white bg-[#39973d] border border-[#39973d] rounded-xl hover:bg-[#39973d] mr-2 font-medium"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="w-1/2 py-2 flex items-center justify-center text-white bg-red-500 rounded-xl font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal for editing and rescheduling the time slot
const EditSlotModal = ({ show, appointment, timeSlots, onClose, onSave }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    appointment ? appointment.appointmentTime : ""
  );

  if (!show || !appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-1/5">
        {/* Modal Header */}
        <h2 className="text-xl font-bold text-[#030229] mb-4 border-b pb-2">
          Edit Slot
        </h2>

        {/* Time Slot Selector */}
        <div className="relative mb-6">
          <select
            id="select-time"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            className={`peer custom-scroll w-full px-4 py-2 border rounded-xl text-gray-700 bg-gray-50 focus:outline-none focus:ring-0 ${selectedTimeSlot ? "border-gray-300" : "border-red-500"
              }`}
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
            Select Time <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="w-[48%] py-2 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(selectedTimeSlot)}
            className="w-[48%] py-2 text-white bg-[#0eabeb] rounded-xl font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ show, onConfirmDelete, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-1/5 text-center relative border-t-8 border-[#E11D29] ">

        {/* Icon at the Top */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-500 text-white rounded-full p-4">
            <FaTrash className="text-3xl" />
          </div>
        </div>

        {/* Modal Header */}
        <h3 className="text-xl font-bold text-[#030229] mb-2">
          Delete Time Slot?
        </h3>

        {/* Modal Description */}
        <p className="text-sm text-gray-600 mb-6">
          This slot is to be deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="w-1/2 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 mr-2 font-medium"
          >
            No
          </button>
          <button
            onClick={onConfirmDelete}
            className="w-1/2 py-2 text-white bg-[#0EABEB] rounded-xl font-medium"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Appointment Time Slot Component
const AppointmentTimeSlot = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf("day"));
  const [appointments, setAppointments] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showNotAvailableModal, setShowNotAvailableModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [noteContent, setNoteContent] = useState("");

  // Fetch doctor's appointments
  useEffect(() => {
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
        const doctorAppointments = appointmentsData.filter(
          (appointment) => appointment.doctorId === doctorId && appointment.status === "Pending"
        );

        setAppointments(doctorAppointments);
      } catch (error) {
        console.error("Error fetching doctor's appointments:", error);
      }
    };

    fetchAppointments();
  }, [currentWeekStart]);

  // Generate 24-hour format time slots dynamically
  useEffect(() => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
    }
    setTimeSlots(slots);
  }, []);

  const getAppointmentsForSlot = (day, timeSlot) => {
    return appointments.filter(
      (appointment) =>
        moment(appointment.appointmentDate).format("YYYY-MM-DD") === day &&
        appointment.appointmentTime.slice(0, 5) === timeSlot &&
        appointment.status !== "Cancelled"
    );
  };

  // Handle note save
  const handleSaveNote = (note) => {
    setNoteContent(note);
    setShowNoteModal(false);
    setShowNotAvailableModal(true);
  };

  // Handle appointment edit
  const handleEdit = () => {
    setShowNotAvailableModal(false);
    setShowEditModal(true);
  };

  // Handle time slot rescheduling
  const handleSaveTimeSlot = async (newTimeSlot) => {
    try {
      const response = await api.patch(`/appointments/reschedule/${selectedAppointment.id}`, {
        appointmentTime: newTimeSlot,
      });

      if (response.status === 200) {
        const updatedAppointments = appointments.map((appt) =>
          appt.id === selectedAppointment.id
            ? { ...appt, appointmentTime: newTimeSlot }
            : appt
        );

        setAppointments(updatedAppointments);
        setShowEditModal(false);
        toast.success("Appointment rescheduled successfully!");
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      toast.error("Error rescheduling appointment");
    }
  };

  // Handle appointment deletion
  const confirmDelete = async () => {
    try {
      await api.patch(`/appointments/cancel/${selectedAppointment.id}`, {
        status: "Cancelled",
      });

      setAppointments(appointments.filter((appt) => appt.id !== selectedAppointment.id));
      setShowDeleteModal(false);
      setSelectedAppointment(null);
      toast.success("Appointment cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling the appointment:", error);
      toast.error("Error cancelling appointment");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-[#030229]">Doctor's Appointment Slots</h2>

      {/* Week Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-xl hover:bg-gray-400 transition"
          onClick={() => setCurrentWeekStart(moment(currentWeekStart).subtract(7, "days"))}
          disabled={moment(currentWeekStart).isSame(moment().startOf("day"), "day")}
        >
          &lt;
        </button>
        <h3 className="text-xl font-bold text-[#0eabeb]">
          {moment(currentWeekStart).format("DD MMMM, YYYY")} - {moment(currentWeekStart).add(6, "days").format("DD MMMM, YYYY")}
        </h3>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-xl hover:bg-gray-400 transition"
          onClick={() => setCurrentWeekStart(moment(currentWeekStart).add(7, "days"))}
        >
          &gt;
        </button>
      </div>

      {/* Time Slot Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-[#f6f8fb]">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 border-b border-gray-300">Time</th>
              {Array.from({ length: 7 }, (_, i) => moment(currentWeekStart).add(i, "days").format("ddd D")).map((day) => (
                <th key={day} className="px-6 py-3 text-sm font-semibold text-[#0eabeb] border-b border-gray-300">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time) => (
              <tr key={time} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-[#0eabeb] font-semibold text-sm border-b border-gray-200">{time}</td>
                {Array.from({ length: 7 }, (_, i) => moment(currentWeekStart).add(i, "days").format("YYYY-MM-DD")).map((day) => {
                  const appointmentsForSlot = getAppointmentsForSlot(day, time);
                  return (
                    <td key={day} className="px-4 py-2 text-center border-b border-gray-200">
                      {appointmentsForSlot.length > 0 ? (
                        appointmentsForSlot.map((appointment) => (
                          <div
                            key={appointment.id}
                            className="p-1 rounded-xl bg-[#0eabeb] text-white cursor-pointer hover:bg-[#0eabee] hover:shadow-md transition"
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowNoteModal(true);
                            }}
                          >
                            <div className="font-semibold">{appointment.patientName}</div>
                            <div className="text-md">{appointment.diseaseName}</div>
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

      {/* Modals */}
      <WriteNoteModal
        show={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        appointment={selectedAppointment}
        onSaveNote={handleSaveNote} // ✅ Now correctly passing the function
      />
      {/* Not Available Modal */}
      <NotAvailableModal
        show={showNotAvailableModal}
        appointment={selectedAppointment}
        note={noteContent}
        onEdit={handleEdit}
        onDelete={() => setShowDeleteModal(true)}
      />

      {/* Edit Slot Modal for Rescheduling */}
      <EditSlotModal
        show={showEditModal}
        appointment={selectedAppointment}
        timeSlots={timeSlots}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveTimeSlot}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onConfirmDelete={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default AppointmentTimeSlot;

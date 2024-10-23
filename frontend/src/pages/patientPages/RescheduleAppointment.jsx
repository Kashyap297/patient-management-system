import React, { useState, useEffect } from 'react';
import { Button, Modal, IconButton, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import moment from 'moment';
import api from '../../api/api';
import { jwtDecode } from 'jwt-decode';

// Modal for Rescheduling Appointment
const RescheduleAppointmentModal = ({ open, onClose, appointment, timeSlots, onSave }) => {
  const [selectedDate, setSelectedDate] = useState(moment(appointment?.appointmentDate).format('YYYY-MM-DD'));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(appointment ? appointment.appointmentTime : '');

  if (!open || !appointment) return null;

  const handleSave = () => {
    onSave(selectedDate, selectedTimeSlot);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[320px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-500">Reschedule Appointment</h2>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Select Date</label>
          <TextField
            type="date"
            variant="outlined"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            fullWidth
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Select Time</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
          >
            {timeSlots.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <Button variant="outlined" onClick={onClose} className="mr-2">Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Modal>
  );
};

const RescheduleAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openRescheduleModal, setOpenRescheduleModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Today');
  const [currentWeekStart, setCurrentWeekStart] = useState(moment().startOf('week'));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const patientId = decodedToken.id;

        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredAppointments = response.data.data.filter(
          (appointment) => appointment.patientId === patientId && appointment.status !== 'Cancelled'
        );
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 8; hour <= 20; hour++) {
        const timeString = `${hour < 12 ? hour : hour - 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
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
            ? { ...appt, appointmentDate: newDate, appointmentTime: newTimeSlot }
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
    currentWeekStart.clone().add(i, 'days').format('YYYY-MM-DD')
  );

  const renderAppointmentGrid = () => {
    return (
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-100">Time</th>
            {weekDays.map((day, index) => (
              <th key={index} className="border px-4 py-2 bg-gray-100">
                {moment(day).format('dddd, DD MMM')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <td className="border px-4 py-2 text-gray-500">{time}</td>
              {weekDays.map((day, index) => {
                const dayAppointments = appointments.filter(
                  (appointment) =>
                    moment(appointment.appointmentDate).format('YYYY-MM-DD') === day &&
                    appointment.appointmentTime === time
                );

                return (
                  <td key={index} className={`border px-4 py-2 text-center ${dayAppointments.length > 0 ? 'bg-blue-100' : 'bg-gray-50'}`}>
                    {dayAppointments.length > 0 ? (
                      dayAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="text-green-500 mb-2 cursor-pointer"
                          onClick={() => handleOpenRescheduleModal(appointment)}
                        >
                          <div className="font-semibold">{appointment.doctorName}</div> {/* Show Doctor's Name */}
                          <div className="text-sm">{appointment.diseaseName}</div>
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
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <h2 className="text-2xl font-semibold mb-6">Reschedule Appointments</h2>

      {/* Navigation buttons for previous/next week */}
      <div className="flex justify-between mb-4">
        <Button onClick={() => setCurrentWeekStart(currentWeekStart.clone().subtract(7, 'days'))}>
          &lt; Previous Week
        </Button>
        <h3>{moment(currentWeekStart).format('DD MMMM, YYYY')} - {moment(currentWeekStart).add(6, 'days').format('DD MMMM, YYYY')}</h3>
        <Button onClick={() => setCurrentWeekStart(currentWeekStart.clone().add(7, 'days'))}>
          Next Week &gt;
        </Button>
      </div>

      {/* Render the Appointment Grid */}
      <div className="overflow-x-auto">
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

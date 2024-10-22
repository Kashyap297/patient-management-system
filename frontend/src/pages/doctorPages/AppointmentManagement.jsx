import { useState, useEffect } from 'react';
import { Button, IconButton, TextField, InputAdornment } from '@mui/material';
import { CalendarToday, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CancelAppointmentModal from '../../components/modals/CancelAppointmentModal';
import CustomDateFilter from '../../components/modals/CustomDateFilter';
import api from "../../api/api"; // Assuming you have an API setup
import {jwtDecode} from "jwt-decode";

const AppointmentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Today Appointment');
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);
  const [openCancelAppointmentModal, setOpenCancelAppointmentModal] = useState(false);
  const [filterDates, setFilterDates] = useState({ fromDate: null, toDate: null });
  const [appointments, setAppointments] = useState({
    today: [],
    upcoming: [],
    previous: [],
    canceled: []
  });

  const navigate = useNavigate();

  // Fetch appointments for the logged-in doctor
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token
        const decodedToken = jwtDecode(token); // Decode the token
        const doctorId = decodedToken.id; // Assuming the token contains the doctorId in the 'id' field
  
        // Fetch appointments and filter them by the logged-in doctor's ID
        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the header
          },
        });
  
        const appointmentsData = response.data.data || [];
        const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  
        // Filter appointments for the logged-in doctor
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
    // Ensure we return an array for the selected appointment type
    switch (activeTab) {
      case 'Today Appointment':
        return appointments.today || [];
      case 'Upcoming Appointment':
        return appointments.upcoming || [];
      case 'Previous Appointment':
        return appointments.previous || [];
      case 'Cancel Appointment':
        return appointments.canceled || [];
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

    // Filter based on date range
    const matchesDateRange =
      (!filterDates.fromDate || appointmentDate >= new Date(filterDates.fromDate)) &&
      (!filterDates.toDate || appointmentDate <= new Date(filterDates.toDate));

    return matchesSearchTerm && matchesDateRange;
  });


  console.log("Filtered Appointments:", filteredAppointments);

  const handleApplyDateFilter = (fromDate, toDate) => {
    setFilterDates({ fromDate, toDate });
    setOpenCustomDateModal(false);
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
                  <td className="p-3">{appointment.appointmentDate}</td>
                  <td className="p-3 text-blue-600">{appointment.appointmentTime}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${appointment.appointmentType === 'Online' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
                      {appointment.appointmentType}
                    </span>
                  </td>
                  <td className="p-3 flex space-x-2">
                    <IconButton color="primary" onClick={() => setOpenCustomDateModal(true)}>
                      <CalendarToday style={{ color: '#1A73E8' }} />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => setOpenCancelAppointmentModal(true)}>
                      <CalendarToday style={{ color: 'red' }} />
                    </IconButton>
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

      <CustomDateFilter
        open={openCustomDateModal}
        onClose={() => setOpenCustomDateModal(false)}
        onApply={handleApplyDateFilter}
        onReset={handleResetDateFilter}
      />
      <CancelAppointmentModal open={openCancelAppointmentModal} onClose={() => setOpenCancelAppointmentModal(false)} />
    </div>
  );
};

export default AppointmentManagement;

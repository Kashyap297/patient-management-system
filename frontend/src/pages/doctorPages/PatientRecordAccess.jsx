import { useState, useEffect } from 'react';
import { IconButton, TextField, InputAdornment, Menu, MenuItem } from '@mui/material';
import { Search, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from "../../api/api"; // Adjust the path according to your project structure

const PatientRecordAccess = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState('Month'); // Default filter to 'Month'
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found');
          return;
        }

        // Decode token to get the doctor ID
        const decodedToken = jwtDecode(token);
        const doctorId = decodedToken.id;

        // Fetch appointments associated with this doctor
        const response = await api.get('/appointments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const allAppointments = response.data.data || [];

        // Filter for only the completed appointments of the logged-in doctor
        const completedAppointments = allAppointments.filter(appointment => {
          return appointment.doctorId === doctorId && appointment.status === 'Completed';
        });

        setAppointments(completedAppointments);
        setFilteredAppointments(completedAppointments); // Initially show all completed appointments
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  // Filter patients based on search term and date filter
  const getFilteredPatients = () => {
    const today = new Date();
    let filteredList = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate);

      // Apply date filter logic
      if (dateFilter === 'Day') {
        return (
          appointmentDate.toDateString() === today.toDateString() // Only today
        );
      } else if (dateFilter === 'Week') {
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7); // Last 7 days
        return appointmentDate >= lastWeek && appointmentDate <= today;
      } else if (dateFilter === 'Month') {
        const lastMonth = new Date(today);
        lastMonth.setDate(today.getDate() - 30); // Last 30 days
        return appointmentDate >= lastMonth && appointmentDate <= today;
      }

      return true; // default case, show all appointments if no filter selected
    });

    // Apply search term filtering
    if (searchTerm) {
      filteredList = filteredList.filter((appointment) =>
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (appointment.patientIssue && appointment.patientIssue.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filteredList;
  };

  // Update filtered appointments whenever search term or date filter changes
  useEffect(() => {
    setFilteredAppointments(getFilteredPatients());
  }, [searchTerm, dateFilter, appointments]);

  const handleFilterChange = (filter) => {
    setDateFilter(filter);
    setAnchorEl(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <h2 className="text-lg font-semibold mb-4">Patient Record Access</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-xs">
          <TextField
            variant="outlined"
            placeholder="Search Patient"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div>
          <button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            className="bg-gray-100 p-2 rounded-lg flex items-center text-gray-600"
          >
            {dateFilter}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleFilterChange('Day')}>Day</MenuItem>
            <MenuItem onClick={() => handleFilterChange('Week')}>Week</MenuItem>
            <MenuItem onClick={() => handleFilterChange('Month')}>Month</MenuItem>
          </Menu>
        </div>
      </div>

      {/* Table of Completed Appointments */}
      <div className="max-h-[600px] overflow-y-auto border rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="sticky top-0 bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Patient Name</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Disease Name</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Patient Issue</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Last Appointment Date</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Last Appointment Time</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Age</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Gender</th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <tr key={index} className="border-t">
                  <td className="p-4">{appointment.patientName}</td>
                  <td className="p-4">{appointment.diseaseName}</td>
                  <td className="p-4">{appointment.patientIssue}</td>
                  <td className="p-4">{new Date(appointment.appointmentDate).toLocaleDateString('en-GB')}</td>
                  <td className="p-4 text-blue-600">{appointment.appointmentTime}</td>
                  <td className="p-4">{appointment.patientAge} Years</td>
                  <td className="p-4">
                    <span className={appointment.patientGender === 'Male' ? 'text-blue-500' : 'text-pink-500'}>
                      {appointment.patientGender === 'Male' ? '♂' : '♀'}
                    </span>
                  </td>
                  <td className="p-4">
                    <IconButton color="primary" onClick={() => navigate(`/doctor/patient-detail/${appointment.patientId}`)}>
                      <Visibility />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No completed appointments found for the selected criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientRecordAccess;

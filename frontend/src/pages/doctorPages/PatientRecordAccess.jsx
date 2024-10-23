import { useState, useEffect } from 'react';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import { Search, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from "../../api/api"; // Adjust the path according to your project structure

const PatientRecordAccess = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([]);
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
        const doctorId = decodedToken.id; // Adjust based on your JWT structure

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

        console.log('Filtered completed appointments:', completedAppointments); // Debugging
        setAppointments(completedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  // Filter patients based on search term
  const filteredPatients = appointments.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (appointment.patientIssue && appointment.patientIssue.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <h2 className="text-lg font-semibold mb-4">Completed Appointments</h2>

      {/* Search Section */}
      <div className="flex justify-between items-center mb-4">
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
      </div>

      {/* Table of Completed Appointments */}
      <div className="max-h-[600px] overflow-y-auto">
        <table className="min-w-full table-auto">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th className="p-3 text-left text-sm font-semibold">Patient Name</th>
              <th className="p-3 text-left text-sm font-semibold">Disease Name</th>
              <th className="p-3 text-left text-sm font-semibold">Patient Issue</th>
              <th className="p-3 text-left text-sm font-semibold">Last Appointment Date</th>
              <th className="p-3 text-left text-sm font-semibold">Last Appointment Time</th>
              <th className="p-3 text-left text-sm font-semibold">Age</th>
              <th className="p-3 text-left text-sm font-semibold">Gender</th>
              <th className="p-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((appointment, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{appointment.patientName}</td>
                  <td className="p-3">{appointment.diseaseName}</td>
                  <td className="p-3">{appointment.patientIssue}</td>
                  <td className="p-3">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                  <td className="p-3 text-blue-600">{appointment.appointmentTime}</td>
                  <td className="p-3">{appointment.patientAge} Years</td>
                  <td className="p-3">
                    <span className={appointment.patientGender === 'Male' ? 'text-blue-500' : 'text-pink-500'}>
                      {appointment.patientGender === 'Male' ? '♂' : '♀'}
                    </span>
                  </td>
                  <td className="p-3">
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

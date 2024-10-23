import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import api from "../../api/api"; // Adjust the path according to your project structure
import AddRecordModal from './AddRecordModal'; // Import the AddRecordModal

const PatientDetail = () => {
  const { id } = useParams();  // Get the patient ID from the route parameter
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // State to handle modal open/close
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    // Decode token to get doctorId
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setDoctorId(decodedToken?.id || null);
    }

    // Fetch patient data by ID
    const fetchPatientData = async () => {
      try {
        const response = await api.get(`/users/patients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPatientData(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    // Fetch appointments for the patient by filtering from all appointments
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Filter appointments for this specific patient
        const patientAppointments = response.data.data.filter(appointment => appointment.patientId === id);
        setAppointments(patientAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchPatientData();
    fetchAppointments();
  }, [id]);

  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <h2 className="text-lg font-semibold mb-4">Patient Details</h2>

      {/* Patient Details Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img src="https://via.placeholder.com/150" alt="Patient" className="w-24 h-24 rounded-full" />
          <div>
            <h3 className="text-xl font-semibold">{`${patientData.firstName} ${patientData.lastName}`}</h3>
            <p>Patient Number: {patientData.phoneNumber}</p>
            <p>Patient Age: {patientData.age} Years</p>
            <p>Patient Gender: {patientData.gender}</p>
          </div>
        </div>
        <div className="text-right">
          <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
            + Add Record
          </Button>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">All Appointments</h3>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-sm font-semibold">Disease Name</th>
              <th className="p-3 text-left text-sm font-semibold">Patient Issue</th>
              <th className="p-3 text-left text-sm font-semibold">Appointment Date</th>
              <th className="p-3 text-left text-sm font-semibold">Appointment Time</th>
              <th className="p-3 text-left text-sm font-semibold">Appointment Type</th>
              <th className="p-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{appointment.diseaseName}</td>
                <td className="p-3">{appointment.patientIssue || "N/A"}</td>
                <td className="p-3">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td className="p-3 text-blue-600">{appointment.appointmentTime}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${appointment.appointmentType === 'Online' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
                    {appointment.appointmentType}
                  </span>
                </td>
                <td className="p-3">
                  <IconButton color="primary">
                    <Visibility />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Record Modal */}
      <AddRecordModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        patientId={id}
        doctorId={doctorId} // Pass the decoded doctorId
        onSuccess={() => {
          console.log("Record added successfully");
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default PatientDetail;

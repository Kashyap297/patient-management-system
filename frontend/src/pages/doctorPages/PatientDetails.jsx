import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
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

    // Fetch appointments for the patient by filtering from all appointments
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Filter appointments for this specific patient
        const patientAppointments = response.data.data.filter(appointment =>
          appointment.patientId === id
        );
        console.log(patientAppointments)
        // Set appointments to state
        setAppointments(patientAppointments);

        if (patientAppointments.length > 0) {
          // Get the first appointment to extract patient data
          const firstAppointment = patientAppointments[0];

          // Set patient data based on the structure of your appointment object
          setPatientData({
            firstName: firstAppointment.patientName,  // patientName
            lastName: '', // Assuming last name is not provided, set to empty
            phoneNumber: firstAppointment.patientPhoneNumber, // patientPhoneNumber
            age: firstAppointment.patientAge,  // patientAge
            patientIssue: firstAppointment.patientIssue, // patientIssue
            gender: firstAppointment.patientGender, // patientGender
            appointmentType: firstAppointment.appointmentType, // appointmentType
            address: firstAppointment.patientAddress, // patientAddress
            lastAppointmentDate: firstAppointment.appointmentDate.split('T')[0], // appointmentDate
            lastAppointmentTime: firstAppointment.appointmentTime, // appointmentTime
            doctorName: firstAppointment.doctorName, // doctorName
            profileImage: firstAppointment.profileImage
          });
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };



    fetchAppointments();
  }, [id]);

  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <h2 className="text-lg font-semibold mb-4">Patient Details</h2>
      {/* Patient Details Section */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 border">
        <div className="text-right mt-2 mb-2">
          <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
            + Add Record
          </Button>
        </div>
        <div className="flex justify-between items-start">
          <div className="flex-shrink-0">
            <img
              src={`http://localhost:8000/${patientData.profileImage}`}
              alt="Patient"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          <div className="flex-grow ml-6 mt-4">
            <div className="grid grid-cols-5 gap-x-12 gap-y-4">
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Patient Name</p>
                {`${patientData.firstName} ${patientData.lastName}`}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Patient Number</p>
                {patientData.phoneNumber}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Doctor Name</p>
                {`Dr. ${patientData.doctorName}`}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Patient Age</p>
                {patientData.age} Years
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Patient Issue</p>
                {patientData.patientIssue}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Patient Gender</p>
                {patientData.gender}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Appointment Type</p>
                {patientData.appointmentType}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Patient Address</p>
                {patientData.address}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Last Appointment Date</p>
                {patientData.lastAppointmentDate}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Last Appointment Time</p>
                {patientData.lastAppointmentTime}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* All Appointments Section */}
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
        doctorId={doctorId}
        onSuccess={() => {
          console.log("Record added successfully");
          setModalOpen(false);
        }}
      />
    </div>
  );


};

export default PatientDetail;

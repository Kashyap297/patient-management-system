import { useState, useEffect } from 'react';
import api from "../../api/api"; // Adjust the path according to your project structure
import { jwtDecode } from 'jwt-decode';
import CreatePrescription from "../../components/CreatePrescription";

const CreatePrescriptionScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found');
          return;
        }

        // Decode the token to get the doctor ID
        const decodedToken = jwtDecode(token);
        const doctorId = decodedToken.id;

        // Fetch all appointments
        const response = await api.get('/appointments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Filter for today's appointments associated with the logged-in doctor
        // Exclude appointments with status 'completed'
        const filteredAppointments = response.data.data.filter(appointment => {
          const appointmentDate = appointment.appointmentDate.split('T')[0];
          return appointment.doctorId === doctorId && appointmentDate === today && appointment.status !== 'Completed';
        });

        setAppointments(filteredAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Today's Appointments</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {appointments.map((appointment) => (
          <CreatePrescription
            key={appointment.id}
            id={appointment.id}
            patientid={appointment.patientId}
            name={appointment.patientName}
            age={appointment.patientAge}
            gender={appointment.patientGender} 
            appointmentType={appointment.appointmentType}
            time={appointment.appointmentTime}
            status={appointment.status}  // Pass the status to the component
          />
        ))}
      </div>
    </div>
  );
};

export default CreatePrescriptionScreen;

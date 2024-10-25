import { Button } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EventIcon from '@mui/icons-material/Event';
import { useNavigate } from 'react-router-dom';

// PatientCard component
const TeleConsultationCardPatient = ({ patient }) => {
  const navigate = useNavigate();

  const handleJoinCall = () => {
    // Assuming patient has a unique id for the appointment or roomId
    const appointmentId = patient.id; // This should be passed as a prop or fetched from the patient data
    // Navigate to the DoctorMeetingConference component with the appointmentId in the URL
    navigate(`/patient/patientMeetingConference/${appointmentId}`);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{patient.patientName}</h3>
        <p>
          <strong>Patient Issue: </strong>
          {patient.patientIssue}
        </p>
        <p>
          <strong>Disease Name: </strong>
          {patient.diseaseName}
        </p>
        <p>
          <strong>Appointment Date: </strong>
          {new Date(patient.appointmentDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Appointment Time: </strong>
          {patient.appointmentTime}
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          variant="contained"
          color="success"
          startIcon={<CallIcon />}
          className="hover:bg-green-700"
          onClick={handleJoinCall} // Using the handleJoinCall function
        >
          Join Call
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EventIcon />}
          className="hover:bg-blue-700"
        >
          Reschedule
        </Button>
      </div>
    </div>
  );
};

export default TeleConsultationCardPatient;

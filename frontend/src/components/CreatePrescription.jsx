import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

const CreatePrescription = ({ id,patientid, name, age, gender, appointmentType, time, status }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full relative hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-gray-800">{name}</h2>
        <div className="flex items-center">
          {status === 'completed' ? (
            <span className="bg-green-100 text-green-500 px-2 py-1 rounded-full text-sm font-medium mr-2">
              Completed
            </span>
          ) : (
            <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-sm font-medium mr-2">
              New
            </span>
          )}
          <VisibilityIcon className="text-gray-400 cursor-pointer" onClick={() => navigate(`/doctor/prescription-view/${patientid}`)} />
        </div>
      </div>
      <div className="text-sm text-gray-600 space-y-2 mb-4">
        <p>
          Appointment Type: <span className="text-blue-500 font-semibold">{appointmentType}</span>
        </p>
        <p>
          Patient Age: <span className="font-semibold">{age} Years</span>
        </p>
        <p>
          Patient Gender: <span className="font-semibold">{gender}</span>
        </p>
        <p>
          Appointment Time: <span className="font-semibold">{time}</span>
        </p>
      </div>
      <Button
        variant="contained"
        className="bg-blue-500 text-white w-full py-2"
        style={{
          borderRadius: "8px",
        }}
        onClick={() => navigate(`/doctor/create-prescription/${id}`)}
        disabled={status === 'completed'}  // Disable button if appointment is completed
      >
        {status === 'completed' ? 'Prescription Completed' : 'Create Prescription'}
      </Button>
    </div>
  );
};

export default CreatePrescription;

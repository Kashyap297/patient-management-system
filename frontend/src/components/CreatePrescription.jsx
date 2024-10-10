
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Material UI eye icon
import { useNavigate } from 'react-router-dom';

const CreatePrescription = ({ id, name, age, gender, appointmentType, time, isNew }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-gray-800">{name}</h2>
        <div className="flex items-center">
          {isNew ? (
            <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-sm font-medium mr-2">
              New
            </span>
          ) : (
            <span className="bg-green-100 text-green-500 px-2 py-1 rounded-full text-sm font-medium mr-2">
              Old
            </span>
          )}
          <VisibilityIcon className="text-gray-400" onClick={() => navigate(`/prescription-view/${id}`)} />
        </div>
      </div>
      <div className="text-sm text-gray-600 mb-4">
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
        onClick={() => navigate(`/create-prescription/${id}`)}
      >
        Create Prescription
      </Button>
      <div
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        style={{
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          zIndex: -1,
        }}
      ></div>
    </div>
  );
};

export default CreatePrescription;

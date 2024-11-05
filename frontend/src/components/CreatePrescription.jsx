import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const CreatePrescription = ({
  id,
  patientid,
  name,
  age,
  gender,
  appointmentType,
  time,
  status,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-xl w-full relative hover:shadow-xl transition-shadow duration-300 ease-in-out border">
      <div className="flex justify-between items-center px-4 py-2 mb-4 rounded-t-xl bg-[#f6f8fb]">
        <h2 className="font-bold text-lg text-gray-800 ">{name}</h2>
        <div className="flex items-center">
          {status === "completed" ? (
            <span className="bg-[#e3eee8] text-[#39973D] px-3 py-2 rounded-full text-sm font-medium mr-2">
              Old
            </span>
          ) : (
            <span className="bg-[#dff0f9] text-[#0EABEB] px-3 py-2 rounded-full text-sm font-medium mr-2">
              New
            </span>
          )}
          <VisibilityIcon
            className="text-gray-400 cursor-pointer hover:text-[#0EABEB] transition"
            onClick={() => navigate(`/doctor/prescription-view/${patientid}`)}
          />
        </div>
      </div>
      <div className="text-sm text-[#818194] space-y-2 px-4">
        <div className="flex justify-between">
          <p>Appointment Type</p>
          <span className="font-semibold text-[#5678E9]">
            {appointmentType}
          </span>
        </div>
        <div className="flex justify-between">
          <p>Patient Age</p>
          <span className="font-semibold text-[#4F4F4F]">{age} Years</span>
        </div>
        <div className="flex justify-between">
          <p>Patient Gender</p>
          <span className="font-semibold text-[#4F4F4F]">{gender}</span>
        </div>
        <div className="flex justify-between">
          <p>Appointment Time</p>
          <span className="font-semibold text-[#4F4F4F]">{time}</span>
        </div>
      </div>

      <div className="px-4 py-3">
        <button
          variant="contained"
          className="bg-[#0eabeb] text-white w-full py-2 rounded-xl"
          style={{
            borderRadius: "8px",
          }}
          onClick={() => navigate(`/doctor/create-prescription/${id}`)}
          disabled={status === "completed"} // Disable button if appointment is completed
        >
          {status === "completed"
            ? "Prescription Completed"
            : "Create Prescription"}
        </button>
      </div>
    </div>
  );
};

export default CreatePrescription;

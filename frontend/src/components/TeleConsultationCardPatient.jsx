import { Button } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EventIcon from '@mui/icons-material/Event';
import { FaTrashAlt, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TeleConsultationCardPatient = ({ patient, activeTab, openCancelModal }) => {
  const navigate = useNavigate();

  const handleJoinCall = () => {
    const appointmentId = patient.id;
    navigate(`/patient/patientMeetingConference/${appointmentId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-200 w-full relative">
      {/* Card Header */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#f6f8fb] rounded-t-xl border-b border-gray-300">
        <h3 className="text-lg font-bold text-gray-800">
          Dr. {patient.patientName || "Doctor Name"}
        </h3>
        {/* <div className="flex space-x-2">
          <div className="text-gray-400 cursor-pointer hover:text-[#0EABEB] transition">
            <EventIcon className="text-lg" />
          </div>
          <div className="text-gray-400 cursor-pointer hover:text-[#0EABEB] transition">
            <FaEye className="text-lg" />
          </div>
        </div> */}
      </div>

      {/* Card Body */}
      <div className="text-sm text-[#818194] space-y-2 px-4 py-4">
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Appointment Type</span>
          <span className="font-semibold text-[#FFC313]">{patient.appointmentType || "Online"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Hospital Name</span>
          <span className="font-semibold text-[#4F4F4F]">{patient.hospitalName || "Not specified"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Appointment Date</span>
          <span className="font-semibold text-[#4F4F4F]">
            {new Date(patient.appointmentDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Appointment Time</span>
          <span className="font-semibold text-[#4F4F4F]">{patient.appointmentTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 font-medium">Patient Issue</span>
          <span className="font-semibold text-[#4F4F4F]">{patient.patientIssue || "Feeling Tired"}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 flex justify-between space-x-2 bg-white rounded-b-xl">
        <button
          className="flex items-center justify-center space-x-1 border-2 px-3 py-2 rounded-xl text-gray-600 w-1/2 hover:bg-gray-100 transition"
          onClick={() => openCancelModal(patient)}
        >
          <EventIcon />
          <span>Cancel</span>
        </button>
        <button
          className="flex items-center justify-center space-x-1 bg-green-500 px-3 py-2 rounded-xl text-white w-1/2 hover:bg-green-600 transition"
          onClick={handleJoinCall}
        >
          <CallIcon />
          <span>Join Call</span>
        </button>
      </div>
    </div>
  );
};

export default TeleConsultationCardPatient;

import { useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa';

const TeleConsultationCard = ({ patient }) => {
  const navigate = useNavigate();

  const handleJoinCall = () => {
    const appointmentId = patient.id;
    navigate(`/doctor/doctorMeetingConference/${appointmentId}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl w-full relative hover:shadow-xl transition-shadow duration-300 ease-in-out border">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 rounded-t-xl bg-[#f6f8fb]">
        <h3 className="text-lg font-semibold text-gray-800">{patient.patientName}</h3>
      </div>

      {/* Details */}
      <div className="text-sm text-[#818194] space-y-2 px-4 py-2">
        <div className="flex justify-between">
          <p>Patient Issue</p>
          <span className="font-semibold text-[#4F4F4F]">{patient.patientIssue}</span>
        </div>
        <div className="flex justify-between">
          <p>Disease Name</p>
          <span className="font-semibold text-[#4F4F4F]">{patient.diseaseName}</span>
        </div>
        <div className="flex justify-between">
          <p>Appointment Date</p>
          <span className="font-semibold text-[#4F4F4F]">{new Date(patient.appointmentDate).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <p>Appointment Time</p>
          <span className="font-semibold text-[#4F4F4F]">{patient.appointmentTime}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 px-4 py-3">
        <button
          onClick={handleJoinCall}
          className="bg-[#39973d] text-white flex items-center justify-center gap-2 px-4 py-2 rounded-xl w-full transition hover:bg-green-700"
        >
          <FaPhoneAlt className="text-white" />
          <span>Join Call</span>
        </button>
        <button
          onClick={() => console.log("Reschedule Clicked")} // Placeholder for reschedule action
          className="bg-[#0eabeb] text-white flex items-center justify-center gap-2 px-4 py-2 rounded-xl w-full transition hover:bg-[#0c9ed1]"
        >
          <FaCalendarAlt className="text-white" />
          <span>Reschedule</span>
        </button>
      </div>
    </div>
  );
};

export default TeleConsultationCard;

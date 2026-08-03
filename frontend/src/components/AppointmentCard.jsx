import React from "react";

const AppointmentCard = ({ patientName, doctorName, diseaseName, appointmentTime, appointmentType }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white rounded-2xl shadow-sm hover:shadow-md p-5 min-w-[260px] max-w-[280px] transition-all duration-300 hover:-translate-y-1 relative group overflow-hidden">
      {/* Decorative side accent */}
      <div className={`absolute top-0 left-0 h-full w-1.5 ${appointmentType === "Onsite" ? "bg-blue-500" : "bg-yellow-500"}`}></div>

      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-secondary truncate pr-2">{patientName}</h3>
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full border ${appointmentType === "Onsite" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-yellow-50 text-yellow-600 border-yellow-100"
            }`}
        >
          {appointmentType}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Doctor</span>
          <span className="text-sm font-semibold text-gray-700">{doctorName}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Disease</span>
          <span className="text-sm font-semibold text-gray-700">{diseaseName}</span>
        </div>
        <div className="flex flex-col pt-1 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Time</span>
          <span className="text-sm font-bold text-primary">{appointmentTime}</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;

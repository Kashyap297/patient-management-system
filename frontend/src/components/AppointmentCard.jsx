import React from "react";

const AppointmentCard = ({ patientName, doctorName, diseaseName, appointmentTime, appointmentType }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4 min-w-[250px] max-w-[250px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold text-black">{patientName}</h3>
        <span
          className={`px-2 py-0.5 text-xs rounded-full ${appointmentType === "Onsite" ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-600"
            }`}
        >
          {appointmentType}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-1">
        <span className="font-medium">Doctor Name:</span> {doctorName}
      </p>
      <p className="text-sm text-gray-500 mb-1">
        <span className="font-medium">Disease Name:</span> {diseaseName}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-medium">Appointment Time:</span> {appointmentTime}
      </p>
    </div>
  );
};

export default AppointmentCard;

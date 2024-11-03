import React from "react";

const PatientDetailsModal = ({ open, handleClose, patient }) => {
  if (!patient) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-lg max-w-sm  w-full p-6 relative">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-lg font-semibold text-[#030229]">Patient Details</h2>
          <button onClick={handleClose} className="text-red-500 hover:text-red-600">
            X
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {/* Appointment Type */}
          <div className="flex justify-between">
            <span className="text-[#4f4f4f]">Appointment Type:</span>
            <span
              className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                patient?.appointmentType === "Online"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {patient?.appointmentType}
            </span>
          </div>

          {/* Appointment Date */}
          <div className="flex justify-between">
            <span className=" text-[#4f4f4f]">Appointment Date:</span>
            <span>{formatDate(patient?.appointmentDate)}</span>
          </div>

          {/* Appointment Time */}
          <div className="flex justify-between">
            <span className=" text-[#4f4f4f]">Appointment Time:</span>
            <span>{patient?.appointmentTime}</span>
          </div>

          {/* Patient Name */}
          <div className="flex justify-between">
            <span className=" text-[#4f4f4f]">Patient Name:</span>
            <span>{patient?.patientName}</span>
          </div>

          {/* Patient Phone Number */}
          <div className="flex justify-between">
            <span className=" text-[#4f4f4f]">Patient Phone Number:</span>
            <span>{patient?.patientPhoneNumber}</span>
          </div>

          {/* Patient Age */}
          <div className="flex justify-between">
            <span className=" text-[#4f4f4f]">Patient Age:</span>
            <span>{patient?.patientAge}</span>
          </div>

          {/* Patient Gender */}
          <div className="flex justify-between">
            <span className=" text-[#4f4f4f]">Patient Gender:</span>
            <span>{patient?.patientGender}</span>
          </div>

          {/* Patient Issue */}
          <div className="flex justify-between">
            <span className=" text-[#4f4f4f]">Patient Issue:</span>
            <span>{patient?.patientIssue}</span>
          </div>

          {/* Disease Name */}
          <div className="flex justify-between">
            <span className=" text-[#4f4f4f]">Disease Name:</span>
            <span>{patient?.diseaseName}</span>
          </div>

          {/* Doctor Name */}
          <div className="flex justify-between">
            <span className=" text-[#4f4f4f]">Doctor Name:</span>
            <span>{patient?.doctorName}</span>
          </div>

          {/* Patient Address */}
          <div className="flex justify-between">
            <span className=" text-[#4f4f4f]">Patient Address:</span>
            <span className="text-right">{patient?.patientAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal;

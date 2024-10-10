import React from "react";
import { FaHospital, FaUserMd, FaCalendarAlt, FaInfoCircle, FaUsers } from "react-icons/fa"; // FontAwesome Icons

const PatientStatus = () => {
  const status = {
    hospital: "Shamuba Hospital",
    doctor: "Dr. Mathew Best",
    date: "2 Jan, 2022",
    xyz: "Chance Carder",
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Patient Status</h2>
      
      {/* Grid Layout for the icons and text */}
      <div className="grid grid-cols-2 gap-4 h-[210px]">
        {/* First column: Hospital Name */}
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
            <FaHospital className="text-blue-600" size={24} />
          </div>
          <p className="font-semibold text-blue-900">{status.hospital}</p>
        </div>

        {/* Second column: Doctor's Name */}
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
            <FaUserMd className="text-green-500" size={24} />
          </div>
          <p className="font-semibold text-gray-800">{status.doctor}</p>
        </div>

        {/* First column: Date */}
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
            <FaCalendarAlt className="text-purple-500" size={24} />
          </div>
          <p className="text-gray-600">{status.date}</p>
        </div>

        {/* Second column: Additional Info */}
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
            <FaUsers className="text-purple-500" size={24} />
          </div>
          <p className="text-gray-600">{status.xyz}</p>
        </div>

        {/* Full row for description */}
        <div className="col-span-2 flex items-start space-x-2">
          <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
            <FaInfoCircle className="text-blue-500" size={24} />
          </div>
          <p className="text-gray-600 text-sm">{status.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientStatus;

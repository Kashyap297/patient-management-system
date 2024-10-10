import React from "react";
import { FaTimes } from "react-icons/fa";
import mask from "../../assets/images/offcanvas.png";
import user from "../../assets/images/user.png";
import { AiOutlineLeft } from "react-icons/ai";

const DoctorDetailsSidebar = ({ doctor, isVisible, onClose }) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-1/4 bg-white shadow-lg transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 ">
        <AiOutlineLeft />
        <h2 className="text-xl font-semibold"> Doctor Management</h2>
        <button onClick={onClose} className="text-white">
          <FaTimes />
        </button>
      </div>

      {/* Sidebar Body */}
      <div className="relative p-6 bg-white">
        {/* Doctor Details */}
        <div className="relative z-10 p-4 bg-gradient-to-br from-[#4C49ED] to-[#020067]  rounded-lg shadow-lg mb-6">
          <div className="flex items-center mb-4">
            <img
              src={user}
              alt="Doctor Profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="text-xl font-semibold text-white">
                {doctor.doctor}
              </h3>
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
                {doctor.specialization}
              </span>
            </div>
          </div>
          {/* Background Image and Overlay */}
          <img
            src={mask}
            alt="Background"
            className="absolute top-0 right-0 h-full opacity-25 z-0"
          />
        </div>

        {/* Doctor Details Information */}
        <div className="relative z-10 text-gray-700 bg-gray-50 p-4 rounded-xl">
          {/* First 3 rows with two columns */}
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong className="text-gray-500">Hospital Name:</strong>{" "}
              <span className="block">{doctor.hospital}</span>
            </p>
            <p>
              <strong className="text-gray-500">Doctor Qualification:</strong>{" "}
              <span className="block">{doctor.qualification}</span>
            </p>
            <p>
              <strong className="text-gray-500">Break Time:</strong>{" "}
              <span className="block">{doctor.breakTime}</span>
            </p>
            <p>
              <strong className="text-gray-500">Working Time:</strong>{" "}
              <span className="block">{doctor.workingTime}</span>
            </p>
            <p>
              <strong className="text-gray-500">Years Of Experience:</strong>{" "}
              <span className="block">{doctor.experience}+</span>
            </p>
            <p>
              <strong className="text-gray-500">
                Emergency Contact Number:
              </strong>{" "}
              <span className="block">{doctor.contactNumber}</span>
            </p>
          </div>

          {/* Last 2 rows with single column */}
          <div className="mt-4 space-y-3">
            <p>
              <strong className="text-gray-500">Specialty Type:</strong>{" "}
              {doctor.speciality}
            </p>
            <p>
              <strong className="text-gray-500">Description:</strong>
              <br />
              {doctor.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsSidebar;

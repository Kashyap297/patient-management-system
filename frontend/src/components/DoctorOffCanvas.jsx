import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import mask from "../assets/images/offcanvas.png";
import userImage from "../assets/images/user.png";

const DoctorOffCanvas = ({ doctor, isOpen, onClose }) => {
  if (!isOpen || !doctor) return null;

  // Determine the work type and assign a corresponding label and style
  const getWorkTypeLabel = (workType) => {
    if (workType === "Online") {
      return (
        <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm">
          Online
        </span>
      );
    } else if (workType === "Onsite") {
      return (
        <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm">
          Onsite
        </span>
      );
    } else if (workType === "Both") {
      return (
        <span className="bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full text-sm">
          Both
        </span>
      );
    }
    return null; // Return nothing if workType is not defined
  };

  // Render hospital details only
  // Render hospital details only with improved design
  const renderOnlineDetails = () => (
    <div className="bg-gray-50 p-4 rounded-xl">
      <h3 className="font-semibold text-gray-600 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        Working On Online
        <span className="text-blue-500 font-semibold mt-2 sm:mt-0">Hospital</span>
      </h3>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex justify-center items-center mb-2 sm:mb-0 sm:mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7v4a2 2 0 01-2 2h-1v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4H7a2 2 0 01-2-2V7m10 0h5M9 7h6" />
            </svg>
          </div>
          <div>
            <strong className="text-gray-500">Hospital Name:</strong>
            <span className="block text-sm sm:text-base">{doctor.doctorDetails.hospital.hospitalName || "N/A"}</span>
          </div>
        </div>
  
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex justify-center items-center mb-2 sm:mb-0 sm:mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.867 4.447c.69-.23 1.45.256 1.716.973l1.846 4.842a1.375 1.375 0 01-.75 1.743l-4.712 1.697a1.375 1.375 0 01-1.744-.75L9.48 9.24M12.832 8.713a4.992 4.992 0 11-2.585-2.585" />
            </svg>
          </div>
          <div>
            <strong className="text-gray-500">Hospital Website Link:</strong>
            <a href={doctor.doctorDetails.hospital.websiteLink} target="_blank" className="block text-blue-600 hover:underline text-sm sm:text-base">
              {doctor.doctorDetails.hospital.websiteLink || "N/A"}
            </a>
          </div>
        </div>
  
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex justify-center items-center mb-2 sm:mb-0 sm:mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18M9 12h6M7 17h10" />
            </svg>
          </div>
          <div>
            <strong className="text-gray-500">Emergency Contact Number:</strong>
            <span className="block text-sm sm:text-base">{doctor.doctorDetails.hospital.emergencyContactNumber || "N/A"}</span>
          </div>
        </div>
  
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex justify-center items-center mb-2 sm:mb-0 sm:mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13 21.314M6.343 19.657L10.657 15M9 10.657L12 7.657" />
            </svg>
          </div>
          <div>
            <strong className="text-gray-500">Hospital Address:</strong>
            <span className="block text-sm sm:text-base">{doctor.doctorDetails.hospital.hospitalAddress || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  

  // Render doctor details for work type onsite or both
  const renderDoctorDetails = () => (
    <div className="relative z-10 text-gray-700 bg-gray-50 p-4 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p>
          <strong className="text-gray-500">Doctor Qualification:</strong>
          <span className="block text-sm sm:text-base">{doctor.doctorDetails.qualification || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-500">Years Of Experience:</strong>
          <span className="block text-sm sm:text-base">{doctor.doctorDetails.experience} Years</span>
        </p>
        <p>
          <strong className="text-gray-500">Specialty Type:</strong>
          <span className="block text-sm sm:text-base">{doctor.doctorDetails.specialtyType || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-500">Working Time:</strong>
          <span className="block text-sm sm:text-base">{doctor.doctorDetails.workingHours.workingTime || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-500">Patient Check-Up Time:</strong>
          <span className="block text-sm sm:text-base">{doctor.doctorDetails.workingHours.checkupTime || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-500">Break Time:</strong>
          <span className="block text-sm sm:text-base">{doctor.doctorDetails.workingHours.breakTime || "N/A"}</span>
        </p>
      </div>
  
      {/* Description */}
      <div className="mt-4">
        <strong className="text-gray-500">Description:</strong>
        <p className="mt-1 text-sm sm:text-base">{doctor.doctorDetails.description || "No description provided"}</p>
      </div>
  
      {/* Signature */}
      <div className="mt-4">
        <strong className="text-gray-500 font-semibold pb-2">Signature:</strong>
        <img
          src={doctor.signatureImage ? `https://patient-management-system-vyv0.onrender.com/${doctor.signatureImage}` : ""}
          alt="Doctor Signature"
          className="w-full h-24 object-contain bg-white rounded border-gray-200"
        />
      </div>
  
      {/* Contact and Additional Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <p>
          <strong className="text-gray-500">Age:</strong>
          <span className="block text-sm sm:text-base">{doctor.age || "N/A"} Years</span>
        </p>
        <p>
          <strong className="text-gray-500">Email:</strong>
          <span className="block text-sm sm:text-base">{doctor.email || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-500">Phone:</strong>
          <span className="block text-sm sm:text-base">{doctor.phoneNumber || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-500">Online Consultation Rate:</strong>
          <span className="block text-sm sm:text-base">₹ {doctor.doctorDetails.onlineConsultationRate || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-500">Country:</strong>
          <span className="block text-sm sm:text-base">{doctor.country || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-500">State:</strong>
          <span className="block text-sm sm:text-base">{doctor.state || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-500">City:</strong>
          <span className="block text-sm sm:text-base">{doctor.city || "N/A"}</span>
        </p>
        <p>
          <strong className="text-gray-500">Hospital Address:</strong>
          <span className="block text-sm sm:text-base">{doctor.doctorDetails.hospital.hospitalAddress || "N/A"}</span>
        </p>
      </div>
    </div>
  );
  

  return (
    <div className="fixed inset-0 flex items-center justify-center sm:justify-end bg-black bg-opacity-50 z-50 custom-scroll">
    <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white p-4 sm:p-6 h-full overflow-y-auto">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-2 sm:p-4">
        <AiOutlineLeft onClick={onClose} className="cursor-pointer" />
        <h2 className="text-lg sm:text-xl font-semibold">Doctor Management</h2>
      </div>
  
      {/* Doctor Details Card */}
      <div className="relative p-4 bg-gradient-to-br from-[#4C49ED] to-[#020067] rounded-xl shadow-lg mb-6">
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <img
            src={doctor.profileImage ? `https://patient-management-system-vyv0.onrender.com/${doctor.profileImage}` : userImage}
            alt="Doctor Profile"
            className="w-16 h-16 rounded-full mb-2 sm:mb-0 sm:mr-4"
          />
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-white pb-2">
              Dr. {doctor.firstName} {doctor.lastName}
            </h3>
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs sm:text-sm">
                {doctor.gender}
              </span>
              {/* Work Type Label */}
              {getWorkTypeLabel(doctor.doctorDetails.workType)}
            </div>
          </div>
        </div>
        <img
          src={mask}
          alt="Background"
          className="absolute top-0 right-0 h-full opacity-25 z-0"
        />
      </div>
  
      {/* Render different content based on work type */}
      {doctor.doctorDetails.workType === "Online"
        ? renderOnlineDetails()
        : renderDoctorDetails()}
      {doctor.doctorDetails.workType === "Both" && (
        <>
          {renderDoctorDetails()}
          {renderOnlineDetails()}
        </>
      )}
    </div>
  </div>
  
  );
};

export default DoctorOffCanvas;

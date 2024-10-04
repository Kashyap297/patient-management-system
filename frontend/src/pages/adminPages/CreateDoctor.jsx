import React, { useState } from "react";
import { AiOutlineCamera, AiOutlineClockCircle } from "react-icons/ai"; // Icons
import { FiUpload } from "react-icons/fi"; // Upload icon

const CreateDoctor = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    specialtyType: "",
    checkUpTime: "",
    phoneNumber: "",
    country: "",
    zipCode: "",
    onlineConsultationRate: "",
    doctorQualification: "",
    gender: "",
    workOn: "",
    state: "",
    city: "",
    doctorAddress: "",
    description: "",
    hospitalName: "",
    hospitalAddress: "",
    emergencyContact: "",
    hospitalWebsite: "",
    experience: "",
    workingTime: "",
    breakTime: "",
    age: "",
    doctorEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col w-full px-6 py-4 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 className="text-2xl font-bold mb-4">Add New Doctor</h2>

      {/* Flex container for Profile, Signature, and Doctor Fields */}
      <div className="flex justify-between gap-8">
        {/* Left side (Profile photo and Upload Signature) */}
        <div className="flex flex-col w-1/6">
          {/* Profile Photo */}
          <div className="relative mb-4 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <AiOutlineCamera className="text-gray-400 text-3xl" />
            </div>
            <label className="mt-2 text-blue-500 cursor-pointer">
              <input
                type="file"
                className="hidden"
                name="profile"
                onChange={(e) => {
                  // Handle file upload
                }}
              />
              Choose Photo
            </label>
          </div>

          {/* Upload Signature */}
          <div className="relative mb-4 flex items-center justify-center border border-dashed border-gray-300 rounded-md h-28">
            <FiUpload className="text-gray-500" />
            <label className="absolute text-gray-500 cursor-pointer">
              <input
                type="file"
                className="hidden"
                name="signature"
                onChange={(e) => {
                  // Handle file upload
                }}
              />
              Upload Signature
            </label>
          </div>
        </div>

        {/* Right side (Doctor fields) */}
        <div className="w-2/3 grid grid-cols-2 gap-4">
          {/* Doctor Name */}
          <div className="relative mb-4">
            <input
              type="text"
              id="doctorName"
              name="doctorName"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter Doctor Name"
              value={formData.doctorName}
              onChange={handleChange}
            />
            <label
              htmlFor="doctorName"
              className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
            >
              Doctor Name<span className="text-red-500">*</span>
            </label>
          </div>

          {/* Doctor Qualification */}
          <div className="relative mb-4">
            <input
              type="text"
              id="doctorQualification"
              name="doctorQualification"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter Doctor Qualification"
              value={formData.doctorQualification}
              onChange={handleChange}
            />
            <label
              htmlFor="doctorQualification"
              className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
            >
              Doctor Qualification<span className="text-red-500">*</span>
            </label>
          </div>

          {/* Specialty Type */}
          <div className="relative mb-4">
            <input
              type="text"
              id="specialtyType"
              name="specialtyType"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter Specialty Type"
              value={formData.specialtyType}
              onChange={handleChange}
            />
            <label
              htmlFor="specialtyType"
              className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
            >
              Specialty Type<span className="text-red-500">*</span>
            </label>
          </div>

          {/* Work On */}
          <div className="relative mb-4">
            <select
              id="workOn"
              name="workOn"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none"
              value={formData.workOn}
              onChange={handleChange}
            >
              <option value="">Select Work On</option>
              <option value="Online">Online</option>
              <option value="Onsite">Onsite</option>
              <option value="Both">Both</option>
            </select>
            <label
              htmlFor="workOn"
              className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
            >
              Work On<span className="text-red-500">*</span>
            </label>
          </div>

          {/* Check-Up Time */}
          <div className="relative mb-4">
            <input
              type="text"
              id="checkUpTime"
              name="checkUpTime"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter Checkup Time"
              value={formData.checkUpTime}
              onChange={handleChange}
            />
            <label
              htmlFor="checkUpTime"
              className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
            >
              Check-Up Time<span className="text-red-500">*</span>
            </label>
            <AiOutlineClockCircle className="absolute right-3 top-3 text-gray-400" />
          </div>

          {/* More doctor fields */}
          {/* Add other fields as per your requirement */}
        </div>
      </div>

      {/* Hospital fields below */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Hospital Name */}
        <div className="relative mb-4">
          <input
            type="text"
            id="hospitalName"
            name="hospitalName"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter Hospital Name"
            value={formData.hospitalName}
            onChange={handleChange}
          />
          <label
            htmlFor="hospitalName"
            className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
          >
            Hospital Name
          </label>
        </div>

        {/* Hospital Address */}
        <div className="relative mb-4">
          <input
            type="text"
            id="hospitalAddress"
            name="hospitalAddress"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter Hospital Address"
            value={formData.hospitalAddress}
            onChange={handleChange}
          />
          <label
            htmlFor="hospitalAddress"
            className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
          >
            Hospital Address
          </label>
        </div>

        {/* Emergency Contact */}
        <div className="relative mb-4">
          <input
            type="text"
            id="emergencyContact"
            name="emergencyContact"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter Emergency Contact Number"
            value={formData.emergencyContact}
            onChange={handleChange}
          />
          <label
            htmlFor="emergencyContact"
            className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
          >
            Emergency Contact Number
          </label>
        </div>

        {/* Hospital Website */}
        <div className="relative mb-4">
          <input
            type="text"
            id="hospitalWebsite"
            name="hospitalWebsite"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Enter Hospital Website Link"
            value={formData.hospitalWebsite}
            onChange={handleChange}
          />
          <label
            htmlFor="hospitalWebsite"
            className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
          >
            Hospital Website Link
          </label>
        </div>
      </div>

      <button className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Add Doctor
      </button>
    </div>
  );
};

export default CreateDoctor;

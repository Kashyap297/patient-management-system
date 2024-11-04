import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/api"; // Import Axios instance or replace with your API call setup

const DoctorProfileView = ({ onEdit }) => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    hospital: {
      name: "", // Hospital name
      address: "", // Hospital address
      city: "", // Hospital city
      state: "", // Hospital state
    },
    city: "",
    state: "",
    country: "",
  });
  console.log(profileData)
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/users/profile"); // Adjust the endpoint as needed
        setProfileData(response.data); // Set profile data from response
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Profile</h3>
        <Link
          to="/doctor/edit-profile"
          className="border text-white bg-[#0eabeb] px-4 py-2 rounded-xl font-medium flex items-center"
        >
          <FaEdit className="mr-2" />
          Edit Profile
        </Link>
      </div>

      <form className="grid grid-cols-3 gap-4">
        {/* First Name */}
        <div className="relative mb-4">
          <input
            type="text"
            disabled
            id="firstName"
            name="firstName"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 text-gray-400 bg-white"
            value={profileData.firstName}
          />
          <label
            htmlFor="firstName"
            className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
          >
            First Name <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Last Name */}
        <div className="relative mb-4">
          <input
            type="text"
            disabled
            id="lastName"
            name="lastName"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 text-gray-400 bg-white"
            value={profileData.lastName}
          />
          <label
            htmlFor="lastName"
            className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <input
            type="email"
            disabled
            id="email"
            name="email"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 text-gray-400 bg-white"
            value={profileData.email}
          />
          <label
            htmlFor="email"
            className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Phone Number */}
        <div className="relative mb-4">
          <input
            type="text"
            disabled
            id="phoneNumber"
            name="phoneNumber"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 text-gray-400 bg-white"
            value={profileData.phoneNumber}
          />
          <label
            htmlFor="phoneNumber"
            className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Hospital Name */}
        <div className="relative mb-4">
          <input
            type="text"
            disabled
            id="hospitalName"
            name="hospitalName"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 text-gray-400 bg-white"
            value={profileData.doctorDetails?.hospital?.hospitalName || ""} // Hospital name from API
          />
          <label
            htmlFor="hospitalName"
            className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
          >
            Hospital Name <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Hospital Address */}
        <div className="relative mb-4">
          <input
            type="text"
            disabled
            id="hospitalAddress"
            name="hospitalAddress"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 text-gray-400 bg-white"
            value={profileData.doctorDetails?.hospital?.hospitalAddress || ""} // Hospital address from API
          />
          <label
            htmlFor="hospitalAddress"
            className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
          >
            Hospital Address <span className="text-red-500">*</span>
          </label>
        </div>

        {/* City */}
        <div className="relative mb-4">
          <input
            type="text"
            disabled
            id="city"
            name="city"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 text-gray-400 bg-white"
            value={profileData.city}
          />
          <label
            htmlFor="city"
            className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
          >
            City <span className="text-red-500">*</span>
          </label>
        </div>

        {/* State */}
        <div className="relative mb-4">
          <input
            type="text"
            disabled
            id="state"
            name="state"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 text-gray-400 bg-white"
            value={profileData.state}
          />
          <label
            htmlFor="state"
            className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
          >
            State <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Country */}
        <div className="relative mb-4">
          <input
            type="text"
            disabled
            id="country"
            name="country"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 text-gray-400 bg-white"
            value={profileData.country}
          />
          <label
            htmlFor="country"
            className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
          >
            Country <span className="text-red-500">*</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfileView;

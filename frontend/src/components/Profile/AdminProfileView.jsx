import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/api";

const   AdminProfileView = ({ onEdit }) => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    hospital: {
      name: "",
      address: "",
      city: "",
      state: "",
    },
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/users/profile");
        setProfileData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchProfileData();
  }, []);
  console.log(profileData)

  return (
    <div className="animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h3 className="text-2xl font-extrabold text-secondary tracking-tight">Profile Details</h3>
        <Link
          to="/admin/edit-profile"
          className="border border-primary/20 text-white bg-gradient-to-r from-primary to-blue-500 px-6 py-2.5 rounded-2xl font-bold flex items-center shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
        >
          <FaEdit className="mr-2" />
          Edit Profile
        </Link>
      </div>

      <div className="bg-gray-50/50 p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First Name */}
          <div className="relative group">
            <input
              type="text"
              disabled
              id="firstName"
              name="firstName"
              className="w-full px-5 py-3.5 bg-gray-100/80 border border-gray-200 rounded-2xl text-gray-500 font-medium outline-none cursor-not-allowed peer placeholder-transparent"
              value={profileData.firstName || ''}
              placeholder="First Name"
            />
            <label
              htmlFor="firstName"
              className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs"
            >
              First Name
            </label>
          </div>

          {/* Last Name */}
          <div className="relative group">
            <input
              type="text"
              disabled
              id="lastName"
              name="lastName"
              className="w-full px-5 py-3.5 bg-gray-100/80 border border-gray-200 rounded-2xl text-gray-500 font-medium outline-none cursor-not-allowed peer placeholder-transparent"
              value={profileData.lastName || ''}
              placeholder="Last Name"
            />
            <label
              htmlFor="lastName"
              className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs"
            >
              Last Name
            </label>
          </div>

          {/* Email */}
          <div className="relative group">
            <input
              type="email"
              disabled
              id="email"
              name="email"
              className="w-full px-5 py-3.5 bg-gray-100/80 border border-gray-200 rounded-2xl text-gray-500 font-medium outline-none cursor-not-allowed peer placeholder-transparent"
              value={profileData.email || ''}
              placeholder="Email Address"
            />
            <label
              htmlFor="email"
              className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs"
            >
              Email Address
            </label>
          </div>

          {/* Phone Number */}
          <div className="relative group">
            <input
              type="text"
              disabled
              id="phoneNumber"
              name="phoneNumber"
              className="w-full px-5 py-3.5 bg-gray-100/80 border border-gray-200 rounded-2xl text-gray-500 font-medium outline-none cursor-not-allowed peer placeholder-transparent"
              value={profileData.phoneNumber || ''}
              placeholder="Phone Number"
            />
            <label
              htmlFor="phoneNumber"
              className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs"
            >
              Phone Number
            </label>
          </div>

          {/* Hospital Name */}
          <div className="relative group">
            <input
              type="text"
              disabled
              id="hospitalName"
              name="hospitalName"
              className="w-full px-5 py-3.5 bg-gray-100/80 border border-gray-200 rounded-2xl text-gray-500 font-medium outline-none cursor-not-allowed peer placeholder-transparent"
              value={profileData.adminhospital?.name || ""}
              placeholder="Hospital Name"
            />
            <label
              htmlFor="hospitalName"
              className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs"
            >
              Hospital Name
            </label>
          </div>

          {/* Hospital Address */}
          <div className="relative group lg:col-span-1">
            <input
              type="text"
              disabled
              id="hospitalAddress"
              name="hospitalAddress"
              className="w-full px-5 py-3.5 bg-gray-100/80 border border-gray-200 rounded-2xl text-gray-500 font-medium outline-none cursor-not-allowed peer placeholder-transparent"
              value={profileData.adminhospital?.address || ""}
              placeholder="Hospital Address"
            />
            <label
              htmlFor="hospitalAddress"
              className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs"
            >
              Hospital Address
            </label>
          </div>

          {/* City */}
          <div className="relative group">
            <input
              type="text"
              disabled
              id="city"
              name="city"
              className="w-full px-5 py-3.5 bg-gray-100/80 border border-gray-200 rounded-2xl text-gray-500 font-medium outline-none cursor-not-allowed peer placeholder-transparent"
              value={profileData.city || ''}
              placeholder="City"
            />
            <label
              htmlFor="city"
              className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs"
            >
              City
            </label>
          </div>

          {/* State */}
          <div className="relative group">
            <input
              type="text"
              disabled
              id="state"
              name="state"
              className="w-full px-5 py-3.5 bg-gray-100/80 border border-gray-200 rounded-2xl text-gray-500 font-medium outline-none cursor-not-allowed peer placeholder-transparent"
              value={profileData.state || ''}
              placeholder="State"
            />
            <label
              htmlFor="state"
              className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs"
            >
              State
            </label>
          </div>

          {/* Country */}
          <div className="relative group">
            <input
              type="text"
              disabled
              id="country"
              name="country"
              className="w-full px-5 py-3.5 bg-gray-100/80 border border-gray-200 rounded-2xl text-gray-500 font-medium outline-none cursor-not-allowed peer placeholder-transparent"
              value={profileData.country || ''}
              placeholder="Country"
            />
            <label
              htmlFor="country"
              className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs"
            >
              Country
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfileView;

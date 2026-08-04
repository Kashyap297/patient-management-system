import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaLock, FaFileContract, FaShieldAlt } from "react-icons/fa";
import user from "../../assets/images/user.png";
import api from "../../api/api";

const ProfileSidebar = () => {
  const [profileImage, setProfileImage] = useState("");
  const [fullName, setFullName] = useState(""); // State to store full name

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/users/profile");
        setProfileImage(response.data.profileImage);
        setFullName(`${response.data.firstName} ${response.data.lastName}`); // Set the full name dynamically
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="flex flex-col items-center h-full pt-4">
      <div className="relative group mb-4">
        <img
          src={profileImage ? `${profileImage}` : user}
          alt="Profile"
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-sm z-10"
        />
      </div>
      <h3 className="text-xl font-extrabold text-gray-800 tracking-tight text-center">{fullName}</h3>

      {/* Navigation Links */}
      <div className="mt-10 w-full space-y-2 flex-1">
        <h6 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu</h6>

        <NavLink
          to=""
          end
          className={({ isActive }) =>
            `flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 font-bold ${
              isActive 
                ? "bg-[#ecfdf5] text-[#10b981]" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm"
            }`
          }
        >
          <FaUser className="inline-block w-5 h-5 mr-3" />
          Profile
        </NavLink>

        <NavLink
          to="change-password"
          className={({ isActive }) =>
            `flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 font-bold ${
              isActive 
                ? "bg-[#ecfdf5] text-[#10b981]" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm"
            }`
          }
        >
          <FaLock className="inline-block w-5 h-5 mr-3" />
          Change Password
        </NavLink>

        <NavLink
          to="terms-and-conditions"
          className={({ isActive }) =>
            `flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 font-bold ${
              isActive 
                ? "bg-[#ecfdf5] text-[#10b981]" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm"
            }`
          }
        >
          <FaFileContract className="inline-block w-5 h-5 mr-3" />
          Terms & Conditions
        </NavLink>

        <NavLink
          to="privacy-policy"
          className={({ isActive }) =>
            `flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 font-bold ${
              isActive 
                ? "bg-[#ecfdf5] text-[#10b981]" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm"
            }`
          }
        >
          <FaShieldAlt className="inline-block w-5 h-5 mr-3" />
          Privacy Policy
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileSidebar;

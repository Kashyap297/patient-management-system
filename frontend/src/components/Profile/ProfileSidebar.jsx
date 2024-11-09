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
    <div className="p-4 sm:p-6 text-center">
      <img
        src={profileImage ? `https://patient-management-system-vyv0.onrender.com/${profileImage}` : user}
        alt="Profile"
        className="w-24 h-24 sm:w-48 sm:h-48 mx-auto rounded-full mb-2 sm:mb-4"
      />
      <h3 className="text-lg sm:text-xl font-semibold">{fullName}</h3> {/* Display the dynamic full name */}

      {/* Navigation Links */}
      <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
        <h6 className="text-md font-semibold text-start">Menu</h6>

        <NavLink
          to=""
          end
          className={({ isActive }) =>
            `flex items-center px-3 sm:px-4 py-2 sm:py-4 bg-[#f6f8fb] rounded-xl ${
              isActive ? "text-customBlue font-semibold" : "text-gray-700"
            }`
          }
        >
          <FaUser className="inline-block w-5 h-5 mr-2" />
          Profile
        </NavLink>

        <NavLink
          to="change-password"
          className={({ isActive }) =>
            `flex items-center px-3 sm:px-4 py-2 sm:py-4 bg-[#f6f8fb] rounded-xl ${
              isActive ? "text-customBlue font-semibold" : "text-gray-700"
            }`
          }
        >
          <FaLock className="inline-block w-5 h-5 mr-2" />
          Change Password
        </NavLink>

        <NavLink
          to="terms-and-conditions"
          className={({ isActive }) =>
            `flex items-center px-3 sm:px-4 py-2 sm:py-4 bg-[#f6f8fb] rounded-xl ${
              isActive ? "text-customBlue font-semibold" : "text-gray-700"
            }`
          }
        >
          <FaFileContract className="inline-block w-5 h-5 mr-2" />
          Terms & Condition
        </NavLink>

        <NavLink
          to="privacy-policy"
          className={({ isActive }) =>
            `flex items-center px-3 sm:px-4 py-2 sm:py-4 bg-[#f6f8fb] rounded-xl ${
              isActive ? "text-customBlue font-semibold" : "text-gray-700"
            }`
          }
        >
          <FaShieldAlt className="inline-block w-5 h-5 mr-2" />
          Privacy Policy
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileSidebar;

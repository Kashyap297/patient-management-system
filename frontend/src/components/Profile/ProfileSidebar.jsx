import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaLock, FaFileContract, FaShieldAlt } from "react-icons/fa";
import user from '../../assets/images/user.png';
import api from "../../api/api";

const ProfileSidebar = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
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
    <div className="p-6 text-center">
      <img
        src={profileImage ? `http://localhost:8000/${profileImage}` : user}
        alt="Profile"
        className="w-48 h-48 mx-auto rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold">{fullName}</h3> {/* Display the dynamic full name */}

      {/* Navigation Links */}
      <div className="mt-8 space-y-3">
        <h6 className="text-l font-semibold text-start">Menu</h6>
        
        <NavLink
          to=""
          end
          className={({ isActive }) => 
            `flex items-center px-4 py-4 bg-[#f6f8fb] rounded-lg ${isActive ? "text-customBlue font-semibold" : "text-gray-700 "}`
          }
        >
          <FaUser className="inline-block w-5 h-5 mr-2" />
          Profile
        </NavLink>

        <NavLink
          to="change-password"
          className={({ isActive }) => 
            `flex items-center px-4 py-4 bg-[#f6f8fb] rounded-lg ${isActive ? "text-customBlue font-semibold" : "text-gray-700 "}`
          }
        >
          <FaLock className="inline-block w-5 h-5 mr-2" />
          Change Password
        </NavLink>

        <NavLink
          to="terms-and-conditions"
          className={({ isActive }) => 
            `flex items-center px-4 py-4 bg-[#f6f8fb] rounded-lg ${isActive ? "text-customBlue font-semibold" : "text-gray-700 "}`
          }
        >
          <FaFileContract className="inline-block w-5 h-5 mr-2" />
          Terms & Condition
        </NavLink>

        <NavLink
          to="privacy-policy"
          className={({ isActive }) => 
            `flex items-center px-4 py-4 bg-[#f6f8fb] rounded-lg ${isActive ? "text-customBlue font-semibold" : "text-gray-700 "}`
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

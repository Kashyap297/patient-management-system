import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaUser, FaKey, FaFileContract, FaLock } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-full shadow-lg p-5">
      <div className="mb-8">
        <img src={logo} alt="Logo" className="w-40 mx-auto mb-4" />
      </div>
      <ul>
        <li className="mb-4">
          <NavLink
            to="/profile"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
          >
            <FaUser className="mr-3" />
            Profile
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/change-password"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
          >
            <FaKey className="mr-3" />
            Change Password
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/terms"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
          >
            <FaFileContract className="mr-3" />
            Terms & Conditions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/privacy-policy"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md"
          >
            <FaLock className="mr-3" />
            Privacy Policy
          </NavLink>
        </li>
      </ul>
      <div className="absolute bottom-0 left-0 w-full p-5">
        <NavLink
          to="/logout"
          className="flex items-center px-4 py-2 text-red-500 hover:bg-red-100 rounded-md"
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

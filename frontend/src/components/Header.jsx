import React, { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { FaBell, FaHome, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import user from "../assets/images/user.png";
import { useBreadcrumb } from "../context/BreadcrumbContext";

const Header = ({ activeMenu }) => {
  const { breadcrumb } = useBreadcrumb();
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Fetch the token from localStorage
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      try {
        // Decode the token to get the user data
        const decoded = jwtDecode(token);
        setUserName(`${decoded.firstName} ${decoded.lastName}`);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4">
      {/* Profile Setting Path */}
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full space-x-2">
        <Link to={"/patient/patient-dashboard"}>
          <FaHome className="text-gray-500 text-lg" />
        </Link>
        {breadcrumb.map((item, index) => (
          <React.Fragment key={index}>
            <AiOutlineRight className="text-gray-400 text-sm" />
            <Link
              to={item.path}
              className="pro-text-color font-medium text-customBlue"
            >
              {item.label}
            </Link>
          </React.Fragment>
        ))}
      </div>

      {/* Right Side - Search, Notification, and Profile */}
      <div className="flex items-center space-x-4">
        {/* Search Bar with Icon */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Quick Search"
            className="bg-gray-100 focus:outline-none w-full"
          />
          <AiOutlineDown className="text-gray-500" />
        </div>

        {/* Notification Icon */}
        <div className="relative rounded-full bg-gray-100 p-3">
          <FaBell className="text-gray-700" />
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <img src={user} alt="user1" className="w-12 h-12 rounded-full" />
          <div>
            <span className="font-semibold text-sm">{userName}</span>
            <span className="block text-gray-500 text-xs">{userRole}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

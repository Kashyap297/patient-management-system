import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDown, AiOutlineMenu, AiOutlineRight } from "react-icons/ai";
import { FaBell, FaSearch } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Home from "../assets/images/home-2.png";

const Header = ({ activeMenu, onSearch, toggleSidebar }) => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [greeting, setGreeting] = useState("");
  const [filterOption, setFilterOption] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation(); // Access the current location (route)
  const notificationRef = useRef(null); // Ref for the notification dropdown

  const [notifications, setNotifications] = useState([
    { message: "Change Invoice Theme", time: "5 min ago" },
    { message: "Created Bill by dr.bharat.", time: "5 min ago" },
    { message: "Payment Received", time: "1:52 PM" },
    { message: "Payment Cancelled", time: "1:52 PM" },
    { message: "Dr.Bharat Patel has been appointed.", time: "1:34 PM" },
    { message: "Doctor Removed Rakesh Patel", time: "9:00 AM" }
  ]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(`${decoded.firstName} ${decoded.lastName}`);
        setUserRole(decoded.role);

        axios
          .get("https://patient-management-system-vyv0.onrender.com/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const userData = response.data;
            setProfileImage(`https://patient-management-system-vyv0.onrender.com/${userData.profileImage}`);
          })
          .catch((error) => console.error("Error fetching user profile:", error))
          .finally(() => setLoading(false));
      } catch (error) {
        console.error("Error decoding token:", error);
        setLoading(false);
      }
    }

    const currentHour = new Date().getHours();
    if (currentHour < 12) setGreeting("Good Morning");
    else if (currentHour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleFilterSelect = (option) => {
    setFilterOption(option);
    setDropdownOpen(false);
    onSearch(searchQuery, option);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query, filterOption);
  };

  // Only show greeting on specific routes (Dashboard pages for each role)
  const showGreeting =
    (userRole === "admin" &&
      (location.pathname === "/admin/dashboard" ||
        location.pathname === "/admin" ||
        location.pathname === "/admin/edit-profile" ||
        location.pathname === "/admin/change-password" ||
        location.pathname === "/admin/terms-and-conditions" ||
        location.pathname === "/admin/privacy-policy")) ||
    (userRole === "doctor" &&
      (location.pathname === "/doctor" ||
        location.pathname === "/doctor/edit-profile" ||
        location.pathname === "/doctor/change-password" ||
        location.pathname === "/doctor/terms-and-conditions" ||
        location.pathname === "/doctor/privacy-policy")) ||
    (userRole === "patient" && location.pathname === "/patient");

  // Show breadcrumb only on allowed routes
  const showBreadcrumb =
    !(userRole === "admin" &&
      (location.pathname === "/admin/dashboard" ||
        location.pathname === "/admin" ||
        location.pathname === "/admin/edit-profile" ||
        location.pathname === "/admin/change-password" ||
        location.pathname === "/admin/terms-and-conditions" ||
        location.pathname === "/admin/privacy-policy")) &&
    !(userRole === "doctor" &&
      (location.pathname === "/doctor" ||
        location.pathname === "/doctor/edit-profile" ||
        location.pathname === "/doctor/change-password" ||
        location.pathname === "/doctor/terms-and-conditions" ||
        location.pathname === "/doctor/privacy-policy")) &&
    !(userRole === "patient" && location.pathname === "/patient");

  // Breadcrumb path functionality
  const pathSegments = location.pathname.split("/").filter(Boolean); // Remove empty strings
  const lastSegment = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : "Home";
  return (
    <div className="w-full px-4 py-4 bg-white shadow-md flex items-center justify-between">
      {/* Left Section - Hamburger Menu */}
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle Button */}
        <AiOutlineMenu className="text-gray-700 text-2xl md:hidden cursor-pointer" onClick={toggleSidebar} />

        {/* Breadcrumb Path - Conditionally Rendered */}
        {showBreadcrumb && (
  <div className="hidden md:flex items-center space-x-2 bg-[#f8fcfe] px-4 py-2 rounded-full border border-gray-200">
    <img src={Home} alt="home" className="w-6 h-6" />
    <AiOutlineRight className="text-[#0eabeb]" />
    <span className="text-[#0eabeb] font-medium">{lastSegment}</span>
  </div>
)}

        {/* Greeting Section - Conditionally Rendered */}
        <div className="hidden md:block">
          {showGreeting && (
            <>
              <h1 className="text-lg font-bold text-gray-900">
                {loading ? <Skeleton width={150} /> : `${greeting}! ${userName.split(" ")[0]}`}
              </h1>
              <p className="text-gray-500 text-sm">
                {loading ? <Skeleton width={100} /> : "Hope you have a good day"}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right Section - Icons */}
      <div className="flex items-center space-x-4">
        {/* Search Bar - Only visible for admin on medium and above screens */}
        {userRole === "admin" && (
          <div className="relative flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-2 hidden md:flex">
            <FaSearch className="text-gray-500" />
            {loading ? (
              <Skeleton width={120} height={20} />
            ) : (
              <input
                type="text"
                placeholder="Quick Search"
                className="bg-gray-100 focus:outline-none w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            )}
            <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
              <span className="text-gray-500 mx-2">{filterOption}</span>
              <AiOutlineDown className="text-gray-500" />
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-32 z-10">
                {["All", "Doctor", "Patient"].map((option) => (
                  <div
                    key={option}
                    onClick={() => handleFilterSelect(option)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        
<div className="relative">
          <div className="rounded-full bg-gray-100 p-3 cursor-pointer" onClick={toggleDropdown}>
            {loading ? <Skeleton circle={true} width={30} height={30} /> : <FaBell className="text-gray-700" />}
          </div>

          {/* Notification Dropdown */}
          {dropdownOpen && (
            <div
              ref={notificationRef}
              className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-20"
            >
              <div className="p-4 text-lg font-medium text-gray-700 border-b">Notification</div>
              <div className="max-h-60 overflow-y-auto custom-scroll">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex items-center px-4 py-3 border-b last:border-b-0">
                    <div className="flex flex-col">
                      <span className="font-semibold">{notification.message}</span>
                      <span className="text-sm text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>


        {/* Profile Image */}
        <Link to={`/${userRole}`} className="flex items-center space-x-2">
          {loading ? (
            <Skeleton circle={true} width={40} height={40} />
          ) : (
            <img
              src={profileImage || "https://patient-management-system-vyv0.onrender.com/default-profile.png"}
              alt="user"
              className="w-10 h-10 rounded-full"
            />
          )}
          <div>
            <span className="font-semibold text-sm">
              {loading ? <Skeleton width={80} /> : userName}
            </span>
            <span className="block text-gray-500 text-xs">
              {loading ? <Skeleton width={40} /> : userRole}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaBell, FaSearch } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Header = ({ activeMenu, onSearch, toggleSidebar }) => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);

  const notificationRef = useRef(null); // Ref for the notification dropdown

  const [notifications, setNotifications] = useState([
    { message: "New appointment booked", time: "5 min ago" },
    { message: "Patient results available", time: "1:52 PM" },
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
          .get("http://localhost:8000/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const userData = response.data;
            setProfileImage(`${userData.profileImage}`);
          })
          .catch((error) => console.error("Error fetching user profile:", error))
          .finally(() => setLoading(false));
      } catch (error) {
        console.error("Error decoding token:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query, "All"); // Keeping basic search prop passed back
  };

  return (
    <div className="w-full px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-20">
      {/* Left Section - Hamburger Menu & Search */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Sidebar Toggle Button */}
        <div className="p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors md:hidden text-gray-500" onClick={toggleSidebar}>
          <AiOutlineMenu className="text-xl" />
        </div>

        {/* Search Bar - Flat SaaS Design */}
        {userRole === "admin" && (
          <div className="hidden sm:flex items-center bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 w-full max-w-md focus-within:bg-white focus-within:border-gray-300 transition-all">
            <FaSearch className="text-gray-400 mr-3 text-sm" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-full text-sm text-gray-700 font-medium placeholder-gray-400"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="flex items-center gap-1 opacity-50 ml-2">
              <span className="bg-white border border-gray-200 text-gray-500 font-mono text-[10px] px-1.5 py-0.5 rounded shadow-sm">⌘</span>
              <span className="bg-white border border-gray-200 text-gray-500 font-mono text-[10px] px-1.5 py-0.5 rounded shadow-sm">F</span>
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Icons & Profile */}
      <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
        
        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
          <FiMail className="text-lg" />
        </div>

        <div className="relative">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors relative" onClick={toggleDropdown}>
            {loading ? <Skeleton circle={true} width={20} height={20} /> : <FaBell className="text-lg" />}
            {/* Notification Badge */}
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </div>

          {/* Notification Dropdown */}
          {dropdownOpen && (
            <div
              ref={notificationRef}
              className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl z-30 overflow-hidden"
            >
              <div className="px-5 py-4 flex justify-between items-center border-b border-gray-100">
                <span className="text-base font-bold text-gray-800">Notifications</span>
              </div>
              <div className="max-h-72 overflow-y-auto custom-scroll">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex items-start px-5 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="mt-1 mr-3 p-2 bg-[#10b981]/10 rounded-full">
                      <FaBell className="text-[#10b981] text-xs" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-700 text-sm">{notification.message}</span>
                      <span className="text-xs text-gray-400 font-medium mt-0.5">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 text-center bg-gray-50/50 border-t border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors text-[#10b981] font-semibold text-sm">
                View All
              </div>
            </div>
          )}
        </div>

        {/* Profile Image & Name */}
        <Link to={`/${userRole}`} className="flex items-center gap-3 pl-2 border-l border-gray-200">
          {loading ? (
            <Skeleton circle={true} width={40} height={40} />
          ) : (
            <img
              src={profileImage ? (profileImage.startsWith('http') ? profileImage : `http://localhost:8000/${profileImage.replace(/\\/g, '/')}`) : "http://localhost:8000/default-profile.png"}
              alt="user"
              className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200"
            />
          )}
          <div className="hidden sm:block">
            <span className="font-bold text-sm text-gray-800 block">
              {loading ? <Skeleton width={60} /> : userName.split(" ")[0]}
            </span>
            <span className="text-gray-400 text-[11px] font-semibold block -mt-0.5 capitalize">
              {loading ? <Skeleton width={40} /> : userRole === "admin" ? "Admin" : userRole === "doctor" ? "Doctor" : "Patient"}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
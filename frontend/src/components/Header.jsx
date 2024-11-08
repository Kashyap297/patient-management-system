import React, { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineMenu } from "react-icons/ai";
import { FaBell, FaSearch } from "react-icons/fa";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Header = ({ activeMenu, onSearch, toggleSidebar }) => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [greeting, setGreeting] = useState("");
  const [filterOption, setFilterOption] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="w-full px-4 py-4 bg-white shadow-md flex items-center justify-between">
      {/* Left Section - Hamburger Menu */}
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle Button */}
        <AiOutlineMenu className="text-gray-700 text-2xl md:hidden cursor-pointer" onClick={toggleSidebar} />

        {/* Greeting Section - Visible only on medium and above screens */}
        <div className="hidden md:block">
          <h1 className="text-lg font-bold text-gray-900">
            {loading ? <Skeleton width={150} /> : `${greeting}! ${userName.split(" ")[0]}`}
          </h1>
          <p className="text-gray-500 text-sm">
            {loading ? <Skeleton width={100} /> : "Hope you have a good day"}
          </p>
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
              <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-md shadow-lg py-1 w-32 z-10">
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

        {/* Notification Icon */}
        <div className="relative rounded-full bg-gray-100 p-3">
          {loading ? <Skeleton circle={true} width={30} height={30} /> : <FaBell className="text-gray-700" />}
        </div>

        {/* Profile Image */}
        <Link to={`/${userRole}`} className="flex items-center space-x-2">
          {loading ? (
            <Skeleton circle={true} width={40} height={40} />
          ) : (
            <img
              src={profileImage || "https://patient-management-system-vyv0.onrender.com/default-profile.png"}
              alt="user"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
            />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;

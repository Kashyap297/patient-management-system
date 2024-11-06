import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { FaBell, FaSearch } from "react-icons/fa";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Header = ({ activeMenu, onSearch }) => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [greeting, setGreeting] = useState("");
  const [filterOption, setFilterOption] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(`${decoded.firstName} ${decoded.lastName}`);
        setUserRole(decoded.role);

        // Fetch user profile using the token
        axios
          .get("https://patient-management-system-vyv0.onrender.com/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const userData = response.data;
            setProfileImage(`https://patient-management-system-vyv0.onrender.com/${userData.profileImage}`);
          })
          .catch((error) => console.error("Error fetching user profile:", error))
          .finally(() => setLoading(false)); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error decoding token:", error);
        setLoading(false); // Stop loading if there's an error
      }
    }

    // Set greeting based on time of day
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
    <div>
      <div className="flex items-center justify-between bg-white shadow-md p-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {loading ? <Skeleton width={150} /> : `${greeting}! ${userName.split(" ")[0]}`}
          </h1>
          <p className="text-gray-500 text-sm">
            {loading ? <Skeleton width={100} /> : "Hope you have a good day"}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {userRole === "admin" && (
            <div className="relative flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-2">
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
                <div className="absolute right-0 mt-40 bg-white border border-gray-200 rounded-md shadow-lg py-1 w-32 z-10">
                  <div
                    onClick={() => handleFilterSelect("All")}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    All
                  </div>
                  <div
                    onClick={() => handleFilterSelect("Doctor")}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Doctor
                  </div>
                  <div
                    onClick={() => handleFilterSelect("Patient")}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Patient
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="relative rounded-full bg-gray-100 p-3">
            {loading ? <Skeleton circle={true} width={30} height={30} /> : <FaBell className="text-gray-700" />}
          </div>

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
    </div>
  );
};

export default Header;

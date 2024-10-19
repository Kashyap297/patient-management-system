import React from 'react'
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import user from '../../assets/images/user.png';

const ProfileNavbar = () => {
    return (
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2">
            <Link to="/profile-setting" className="text-gray-400 flex items-center">
              <FaUserCircle className="mr-1" />
              <span className="pro-text-color">Profile Setting</span>
            </Link>
          </div>
    
          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <FaSearch className="absolute top-2 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Quick Search"
                className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 text-gray-600 focus:outline-none"
              />
            </div>
    
            {/* Notification Icon */}
            <FaBell className="text-gray-400 text-xl hover:text-gray-600 cursor-pointer" />
    
            {/* User Profile */}
            <div className="flex items-center space-x-2">
             
              <img src={user} alt="Logo" className=" w-8 h-8 rounded-full" />
              <div className="text-right">
                <span className="block text-gray-700 font-semibold">Lincoln Philips</span>
                <span className="block text-sm text-gray-400 text-start">Admin</span>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default ProfileNavbar
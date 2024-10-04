import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Profile = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <div className="p-6 bg-gray-100 h-screen">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Profile</h2>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                Edit Profile
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  value="Lincoln"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                  readOnly
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  value="Philips"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                  readOnly
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  value="lincoln@gmail.com"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                  readOnly
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600">
                  Phone Number
                </label>
                <input
                  type="text"
                  value="99130 53322"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                  readOnly
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600">
                  Hospital Name
                </label>
                <input
                  type="text"
                  value="Silver Peak Medical Center"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                  readOnly
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600">
                  Gender
                </label>
                <input
                  type="text"
                  value="Male"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                  readOnly
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600">
                  City
                </label>
                <input
                  type="text"
                  value="Ahmedabad"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                  readOnly
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600">
                  State
                </label>
                <input
                  type="text"
                  value="Gujarat"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                  readOnly
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600">
                  Country
                </label>
                <input
                  type="text"
                  value="India"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

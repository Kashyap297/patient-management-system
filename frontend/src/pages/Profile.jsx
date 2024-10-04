import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../api/api"; // Use the existing Axios instance

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/users/profile");
        setProfileData(response.data); // Set the fetched profile data
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        setError("Error fetching profile data");
        setLoading(false); // Stop loading if there's an error
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
                  value={profileData.firstName || ""}
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
                  value={profileData.lastName || ""}
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
                  value={profileData.email || ""}
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
                  value={profileData.phoneNumber || ""}
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
                  value={profileData?.doctorDetails?.hospital || "N/A"}
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
                  value={profileData.city || ""}
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
                  value={profileData.state || ""}
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
                  value={profileData.country || ""}
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

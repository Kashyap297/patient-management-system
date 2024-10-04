import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import api from "../../api/api";
const PatientProfile = () => {
  const [patientData, setPatientData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch patient profile data from the API
    const fetchPatientData = async () => {
      try {
        const response = await api.get("/users/profile"); // API call to fetch user profile
        setPatientData(response.data); // Set fetched data to patientData state
        setLoading(false); // Stop loading after data is fetched
      } catch (err) {
        setError("Error fetching profile data");
        setLoading(false); // Stop loading if there's an error
      }
    };

    fetchPatientData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative p-8">
      {/* Gradient Background Header */}
      <div
        className="absolute top-0 left-0 right-0 h-48"
        style={{
          background:
            "linear-gradient(107.38deg, #4C49ED 2.61%, #020067 101.2%)",
        }}
      />

      {/* Profile Content */}
      <div
        className="relative z-10 bg-white shadow-lg rounded-lg p-8 flex"
        style={{ marginTop: "6rem" }}
      >
        {/* Left Side: Profile Picture */}
        <div className="flex flex-col items-center w-1/4 border-r pr-8">
          <div className="relative w-32 h-32 mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-1">
              <FiEdit />
            </button>
          </div>
          <h3 className="text-lg font-medium">
            {patientData.firstName} {patientData.lastName}
          </h3>
          <button className="text-blue-500 hover:underline mt-2">
            Change Profile
          </button>
        </div>

        {/* Right Side: Editable Profile Form */}
        <div className="w-3/4 pl-8">
          <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>
          <div className="grid grid-cols-3 gap-6">
            {/* Form Fields */}
            <div className="col-span-1">
              <label className="block text-gray-600">Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                value={`${patientData.firstName || ""} ${
                  patientData.lastName || ""
                }`}
                readOnly
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-600">Number</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                value={patientData.phoneNumber || ""}
                readOnly
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                value={patientData.email || ""}
                readOnly
              />
            </div>

            {/* Gender */}
            <div className="col-span-1">
              <label className="block text-gray-600">Gender</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                value={patientData.gender || "N/A"}
                readOnly
              />
            </div>

            {/* DOB */}
            <div className="col-span-1">
              <label className="block text-gray-600">DOB</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                value={patientData.dob || "N/A"}
                readOnly
              />
            </div>

            {/* Age */}
            <div className="col-span-1">
              <label className="block text-gray-600">Age</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                value={patientData.age || "N/A"}
                readOnly
              />
            </div>

            {/* Blood Group */}
            <div className="col-span-1">
              <label className="block text-gray-600">Blood Group</label>
              <select
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                value={patientData.bloodGroup || "N/A"}
                readOnly
              >
                <option>A+</option>
                <option>B+</option>
                <option>O+</option>
                <option>AB+</option>
              </select>
            </div>

            {/* Height */}
            <div className="col-span-1">
              <label className="block text-gray-600">Height (Cm)</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                value={patientData.height || "N/A"}
                readOnly
              />
            </div>

            {/* Weight */}
            <div className="col-span-1">
              <label className="block text-gray-600">Weight (Kg)</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                value={patientData.weight || "N/A"}
                readOnly
              />
            </div>

            {/* Country */}
            <div className="col-span-1">
              <label className="block text-gray-600">Country</label>
              <select
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                value={patientData.country || "N/A"}
                readOnly
              >
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </div>

            {/* State */}
            <div className="col-span-1">
              <label className="block text-gray-600">State</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                value={patientData.state || "N/A"}
                readOnly
              />
            </div>

            {/* City */}
            <div className="col-span-1">
              <label className="block text-gray-600">City</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                value={patientData.city || "N/A"}
                readOnly
              />
            </div>

            {/* Address */}
            <div className="col-span-3">
              <label className="block text-gray-600">Address</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
                value={patientData.address || "N/A"}
                readOnly
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button className="px-6 py-2 rounded bg-gray-200 text-gray-700">
              Cancel
            </button>
            <button className="px-6 py-2 rounded bg-blue-500 text-white">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;

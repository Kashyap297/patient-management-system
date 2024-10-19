import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/api";

const PatientDetails = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await api.get("/users/profile");
        console.log(response.data)
        setPatient(response.data); // Assuming response.data contains the patient object
        setLoading(false);
      } catch (error) {
        setError("Failed to load patient details. Please try again.");
        setLoading(false);
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, []);
  console.log(patient)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Heading and Edit Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Patient Details</h2>
        <Link
          to={`/patient/edit-patient-profile/${patient._id}`}
          className="flex items-center px-4 py-2 bg-customBlue text-white rounded-md shadow-md"
        >
          <FaEdit className="mr-2" />
          Edit Profile
        </Link>
      </div>

      <div className="flex justify-between items-start">
        {/* Patient Image */}
        <div className="flex-shrink-0">
          <img
            src={`http://localhost:8000/${patient.profileImage}`}
            alt="Patient"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        {/* Patient Information */}
        <div className="flex-grow ml-6">
          <div className="grid grid-cols-7 gap-x-12 gap-y-4">
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Name</p>
              {patient.firstName} {patient.lastName}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Number</p>
              {patient.phoneNumber}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Email</p>
              {patient.email}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Gender</p>
              {patient.gender}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">DOB</p>
              {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : "N/A"}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Age</p>
              {patient.age} Years
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Blood Group</p>
              {patient.bloodGroup}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Height (cm)</p>
              {patient.height}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Weight (Kg)</p>
              {patient.weight}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Country</p>
              {patient.country}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">State</p>
              {patient.state}
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">City</p>
              {patient.city}
            </div>
            <div className="col-span-2 font-semibold leading-5">
              <p className="text-gray-400">Address</p>
              {patient.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;

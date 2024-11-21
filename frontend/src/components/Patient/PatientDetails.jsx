import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PatientDetails = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await api.get("/users/profile");
        setPatient(response.data);
      } catch (error) {
        setError("Failed to load patient details. Please try again.");
        console.error("Error fetching patient details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 md:p-6 lg:p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <Skeleton width={150} height={30} />
          <Skeleton width={100} height={40} />
        </div>
        <div className="flex justify-between items-start">
          <div className="flex-shrink-0">
            <Skeleton circle width={128} height={128} />
          </div>
          <div className="flex-grow ml-6">
            <div className="grid grid-cols-7 gap-x-12 gap-y-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="font-semibold leading-5">
                  <Skeleton width={100} height={20} />
                  <Skeleton width={150} height={20} />
                </div>
              ))}
              <div className="col-span-2 font-semibold leading-5">
                <Skeleton width={100} height={20} />
                <Skeleton width="100%" height={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-semibold">Patient Details</h2>
        <Link
          to={`/patient/edit-patient-profile/${patient._id}`}
          className="flex items-center px-3 py-2 md:px-4 md:py-2 bg-customBlue text-white rounded-xl shadow-md hover:bg-[#0b8dc4] transition-all"
        >
          <FaEdit className="mr-1 md:mr-2" />
          Edit Profile
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-start">
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <img
            src={`https://patient-management-system-vyv0.onrender.com/${patient.profileImage}`}
            alt="Patient"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
          />
        </div>

        <div className="flex-grow md:ml-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-y-4 gap-x-12">
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
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 font-semibold leading-5">
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

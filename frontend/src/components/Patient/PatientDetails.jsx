import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const PatientDetails = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Heading and Edit Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Patient Details</h2>
        <Link to={"/patient/edit-patient-profile"} className="flex items-center px-4 py-2 bg-customBlue text-white rounded-md shadow-md">
          <FaEdit className="mr-2" />
          Edit Profile
        </Link>
      </div>

      <div className=" flex justify-between items-start">
        {/* Patient Image */}
        <div className="flex-shrink-0">
          <img
            src="https://via.placeholder.com/150"
            alt="Patient"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        {/* Patient Information */}
        <div className="flex-grow ml-6">
          <div className="grid grid-cols-7 gap-x-12 gap-y-4">
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Name</p> Marcus Philips
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Number</p> 99130 44537
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Email</p> John@gmail.com
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Gender</p> Male
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">DOB</p> 2 Jan, 2022
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Age</p> 20 Years
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Blood Group</p> B+
            </div>

            <div className="font-semibold leading-5">
              <p className="text-gray-400">Height (cm)</p> 160
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Weight (Kg)</p> 50
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">Country</p> India
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">State</p> Gujarat
            </div>
            <div className="font-semibold leading-5">
              <p className="text-gray-400">City</p> Ahmedabad
            </div>
            <div className="col-span-2 font-semibold leading-5">
              <p className="text-gray-400">Address</p> B-408, Swastik Society,
              Mota Varacha, Rajkot
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;

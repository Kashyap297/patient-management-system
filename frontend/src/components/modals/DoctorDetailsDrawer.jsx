import React from "react";
import { Drawer, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const DoctorDetailsDrawer = ({ open, onClose, doctor }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="p-4 w-96 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Doctor Management</h2>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>

        <div className="flex items-center mb-4 p-4 bg-blue-500 rounded-lg">
          <img
            src={
              doctor?.profileImage
                ? `http://localhost:8000/${doctor.profileImage}`
                : "https://via.placeholder.com/100"
            }
            alt={doctor?.firstName}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold text-white">
              {`${doctor?.firstName} ${doctor?.lastName}`}
            </h3>
            <p className="text-sm text-white">
              {doctor?.gender} •{" "}
              <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-xs">
                {doctor?.status || "Offline"}
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <p className="text-sm text-gray-600">Qualification</p>
            <p className="text-sm font-medium">
              {doctor?.doctorDetails?.qualification || "N/A"}
            </p>

            <p className="text-sm text-gray-600">Specialty Type</p>
            <p className="text-sm font-medium">
              {doctor?.doctorDetails?.specialtyType || "N/A"}
            </p>

            <p className="text-sm text-gray-600">Working Time</p>
            <p className="text-sm font-medium">
              {doctor?.doctorDetails?.workingHours?.workingTime || "N/A"}
            </p>

            <p className="text-sm text-gray-600">Check Up Time</p>
            <p className="text-sm font-medium">
              {doctor?.doctorDetails?.workingHours?.checkupTime || "N/A"}
            </p>

            <p className="text-sm text-gray-600">Break Time</p>
            <p className="text-sm font-medium">
              {doctor?.doctorDetails?.workingHours?.breakTime || "N/A"}
            </p>

            <p className="text-sm text-gray-600">Description</p>
            <p className="text-sm font-medium">
              {doctor?.doctorDetails?.description || "N/A"}
            </p>

            <p className="text-sm text-gray-600">Experience</p>
            <p className="text-sm font-medium">
              {doctor?.doctorDetails?.experience || "N/A"}
            </p>

            <p className="text-sm text-gray-600">Age</p>
            <p className="text-sm font-medium">{doctor?.age || "N/A"}</p>

            <p className="text-sm text-gray-600">Email</p>
            <p className="text-sm font-medium">{doctor?.email || "N/A"}</p>

            <p className="text-sm text-gray-600">Phone</p>
            <p className="text-sm font-medium">
              {doctor?.phoneNumber || "N/A"}
            </p>

            <p className="text-sm text-gray-600">Consultation Rate</p>
            <p className="text-sm font-medium">
              {doctor?.doctorDetails?.onlineConsultationRate || "N/A"}
            </p>

            <p className="text-sm text-gray-600">Country</p>
            <p className="text-sm font-medium">{doctor?.country || "N/A"}</p>

            <p className="text-sm text-gray-600">State</p>
            <p className="text-sm font-medium">{doctor?.state || "N/A"}</p>

            <p className="text-sm text-gray-600">City</p>
            <p className="text-sm font-medium">{doctor?.city || "N/A"}</p>

            <p className="text-sm text-gray-600">Zip Code</p>
            <p className="text-sm font-medium">
              {doctor?.doctorDetails?.zipCode || "N/A"}
            </p>

            <p className="text-sm text-gray-600 col-span-2">Address</p>
            <p className="text-sm font-medium col-span-2">
              {doctor?.address || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Signature</p>
            <img
              src={
                doctor?.signatureImage
                  ? `http://localhost:8000/${doctor.signatureImage}`
                  : "https://via.placeholder.com/100x50"
              }
              alt="Doctor Signature"
              className="border-t w-32 mt-2"
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default DoctorDetailsDrawer;

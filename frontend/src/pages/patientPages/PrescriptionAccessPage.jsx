import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaCross,
  FaDownload,
  FaEye,
  FaImage,
} from "react-icons/fa";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import logo from "../../assets/images/logo.png";
import PrescritionModal from "../../components/Patient/PrescritionModal";

const PrescriptionAccessPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    updateBreadcrumb([
      { label: "Prescription Access", path: "/patient/prescription-access" },
    ]);
  }, [updateBreadcrumb]);

  const prescriptions = [
    {
      doctor: "Dr. Ryan Vetrows",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      fileName: "Prescription.JPG",
      fileSize: "5.09 MB",
    },
    {
      doctor: "Marcus Septimus",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      fileName: "Prescription.JPG",
      fileSize: "5.09 MB",
    },
    {
      doctor: "Ahmad Arcand",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      fileName: "Prescription.JPG",
      fileSize: "5.09 MB",
    },
    {
      doctor: "Dr. Ryan Vetrows",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      fileName: "Prescription.JPG",
      fileSize: "5.09 MB",
    },
  ];

  const openModal = (prescription) => {
    setSelectedPrescription(prescription);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPrescription(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg m-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Prescription Access</h2>
        <button className="bg-customBlue text-white px-4 py-2 rounded flex items-center space-x-2">
          <FaCalendarAlt />
          <span>Date Range</span>
        </button>
      </div>

      {/* Prescription Cards */}
      <div className="grid grid-cols-4 gap-4 overflow-y-auto custom-scroll">
        {prescriptions.map((prescription, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md bg-white transition"
          >
            {/* Card Header */}
            <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-t-lg">
              <h4 className="font-semibold ">{prescription.doctor}</h4>
              <div className="flex">
                <div className="text-customBlue text-lg cursor-pointer rounded-lg bg-white p-2">
                  <FaDownload onClick={() => openModal(prescription)} />
                </div>
                <div className="text-customBlue text-lg cursor-pointer rounded-lg bg-white p-2 mr-2">
                  <FaEye onClick={() => openModal(prescription)} />
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 text-sm text-gray-700 space-y-1">
              <p className="flex justify-between font-semibold">
                <span className="text-gray-500">Hospital Name</span>{" "}
                {prescription.hospital}
              </p>
              <p className="flex justify-between font-semibold">
                <span className="text-gray-500">Disease Name</span>{" "}
                {prescription.disease}
              </p>
              <p className="flex justify-between font-semibold">
                <span className="text-gray-500">Date</span> {prescription.date}
              </p>
              <p className="flex justify-between font-semibold">
                <span className="text-gray-500">Time</span> {prescription.time}
              </p>
            </div>

            {/* Prescription File */}
            <div className="flex items-center border-2 m-4 rounded-lg p-2">
              <div className="text-customBlue rounded-lg p-4 text-3xl bg-gray-50">
                <FaImage />
              </div>
              <div className="ml-2">
                <p className=" font-semibold">{prescription.fileName}</p>
                <p className="text-xs text-gray-500">{prescription.fileSize}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prescription Modal */}
      {showModal && selectedPrescription && <PrescritionModal closeModal={closeModal}/>}
    </div>
  );
};

export default PrescriptionAccessPage;

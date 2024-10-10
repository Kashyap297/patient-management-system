import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaDownload,
  FaEye,
  FaImage,
} from "react-icons/fa";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import logo from "../../assets/images/logo.png";
import PrescriptionModal from "../../components/Patient/PrescritionModal";
import api from "../../api/api";

const PrescriptionAccessPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    updateBreadcrumb([
      { label: "Prescription Access", path: "/patient/prescription-access" },
    ]);
  }, []);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await api.get("/prescription");
        console.log("API Response:", response.data);
        setPrescriptions(response.data.prescriptions || []);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const openModal = (prescriptionId) => {
    setSelectedPrescriptionId(prescriptionId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPrescriptionId(null);
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
        {prescriptions.map((prescription) => (
          <div
            key={prescription._id}
            className="border rounded-lg shadow-md bg-white transition"
          >
            {/* Card Header */}
            <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-t-lg">
              <h4 className="font-semibold ">
                Dr. {prescription.doctor.firstName} {prescription.doctor.lastName}
              </h4>
              <div className="flex">
                <div className="text-customBlue text-lg cursor-pointer rounded-lg bg-white p-2">
                  <FaDownload onClick={() => openModal(prescription._id)} />
                </div>
                <div className="text-customBlue text-lg cursor-pointer rounded-lg bg-white p-2 mr-2">
                  <FaEye onClick={() => openModal(prescription._id)} />
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 text-sm text-gray-700 space-y-1">
              <p className="flex justify-between font-semibold">
                <span className="text-gray-500">Hospital Name</span>{" "}
                {prescription.appointmentId.hospital}
              </p>
              <p className="flex justify-between font-semibold">
                <span className="text-gray-500">Disease Name</span>{" "}
                {prescription.medicines[0]?.name || "N/A"}
              </p>
              <p className="flex justify-between font-semibold">
                <span className="text-gray-500">Date</span> {new Date(prescription.prescriptionDate).toLocaleDateString()}
              </p>
              <p className="flex justify-between font-semibold">
                <span className="text-gray-500">Time</span> {prescription.appointmentId.appointmentTime}
              </p>
            </div>

            {/* Prescription File */}
            <div className="flex items-center border-2 m-4 rounded-lg p-2">
              <div className="text-customBlue rounded-lg p-4 text-3xl bg-gray-50">
                <FaImage />
              </div>
              <div className="ml-2">
                <p className=" font-semibold">Prescription.jpg</p>
                <p className="text-xs text-gray-500">5.09 MB</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prescription Modal */}
      {showModal && selectedPrescriptionId && (
        <PrescriptionModal closeModal={closeModal} prescriptionId={selectedPrescriptionId} />
      )}
    </div>
  );
};

export default PrescriptionAccessPage;

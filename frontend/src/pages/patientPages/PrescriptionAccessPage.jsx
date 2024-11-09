import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaDownload, FaEye, FaImage } from "react-icons/fa";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import PrescriptionModal from "../../components/Patient/PrescritionModal";
import api from "../../api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PrescriptionAccessPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    updateBreadcrumb([
      { label: "Prescription Access", path: "/patient/prescription-access" },
    ]);
  }, []);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/prescription");
        console.log("API Response:", response.data);

        if (response.data && response.data.prescriptions) {
          setPrescriptions(response.data.prescriptions);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        setError("Failed to load prescriptions. Please try again later.");
      } finally {
        setLoading(false);
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
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Prescription Access</h2>
        <button className="bg-customBlue text-white px-4 py-2 rounded flex items-center space-x-2">
          <FaCalendarAlt />
          <span>Date Range</span>
        </button>
      </div>

      {/* Prescription Cards */}
      <div className="grid grid-cols-4 gap-4 overflow-y-auto custom-scroll">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="border rounded-xl shadow-md p-4">
              <Skeleton height={24} width="60%" className="mb-2" />
              <div className="flex space-x-2">
                <Skeleton height={32} width={32} />
                <Skeleton height={32} width={32} />
              </div>
              <Skeleton height={16} width="80%" className="my-2" />
              <Skeleton height={16} width="70%" />
              <Skeleton height={16} width="50%" />
            </div>
          ))
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : prescriptions.length > 0 ? (
          prescriptions.map((prescription) => (
            <div
              key={prescription._id}
              className="border rounded-xl shadow-md bg-white transition"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-t-lg">
                <h4 className="font-semibold ">
                  {prescription.doctor ? (
                    <>
                      Dr. {prescription.doctor.firstName}{" "}
                      {prescription.doctor.lastName}
                    </>
                  ) : (
                    <span className="text-red-500">Doctor info not available</span>
                  )}
                </h4>
                <div className="flex">
                  <div className="text-customBlue text-lg cursor-pointer rounded-xl bg-white p-2">
                    <FaDownload onClick={() => openModal(prescription._id)} />
                  </div>
                  <div className="text-customBlue text-lg cursor-pointer rounded-xl bg-white p-2 mr-2">
                    <FaEye onClick={() => openModal(prescription._id)} />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 text-sm text-gray-700 space-y-1">
                <p className="flex justify-between font-semibold">
                  <span className="text-gray-500">Hospital Name</span>{" "}
                  {prescription.appointmentId
                    ? prescription.appointmentId.hospital
                    : "N/A"}
                </p>
                <p className="flex justify-between font-semibold">
                  <span className="text-gray-500">Disease Name</span>{" "}
                  {prescription.medicines && prescription.medicines.length > 0
                    ? prescription.medicines[0].name
                    : "N/A"}
                </p>
                <p className="flex justify-between font-semibold">
                  <span className="text-gray-500">Date</span>{" "}
                  {prescription.prescriptionDate
                    ? new Date(prescription.prescriptionDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="flex justify-between font-semibold">
                  <span className="text-gray-500">Time</span>{" "}
                  {prescription.appointmentId
                    ? prescription.appointmentId.appointmentTime
                    : "N/A"}
                </p>
              </div>

              {/* Prescription File */}
              <div className="flex items-center border-2 m-4 rounded-xl p-2">
                <div className="text-customBlue rounded-xl p-4 text-3xl bg-gray-50">
                  <FaImage />
                </div>
                <div className="ml-2">
                  <p className="font-semibold">Prescription.jpg</p>
                  <p className="text-xs text-gray-500">5.09 MB</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No prescriptions found.</div>
        )}
      </div>

      {/* Prescription Modal */}
      {showModal && selectedPrescriptionId && (
        <PrescriptionModal closeModal={closeModal} prescriptionId={selectedPrescriptionId} />
      )}
    </div>
  );
};

export default PrescriptionAccessPage;

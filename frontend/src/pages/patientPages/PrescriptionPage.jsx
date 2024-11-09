import React, { useEffect, useState } from "react";
import { FaEye, FaSearch } from "react-icons/fa";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import PrescriptionModal from "../../components/Patient/PrescritionModal";
import api from "../../api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PrescriptionPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateBreadcrumb([
      { label: "Personal Health Record", path: "/patient/patient-dashboard" },
      { label: "Prescriptions", path: "/patient/prescriptions" },
    ]);
  }, []);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await api.get("/prescription");
        setPrescriptions(response.data.prescriptions || []);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchPrescriptions();
  }, []);

  const openModal = (prescription) => {
    setSelectedPrescriptionId(prescription._id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPrescriptionId(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Prescriptions</h2>
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search Here"
            className="rounded-3xl py-2 px-4 pr-10 w-64 bg-gray-50 bottom-0"
          />
          <FaSearch className="absolute top-2/4 right-4 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Grid Layout for Prescriptions */}
      <div className="grid grid-cols-4 gap-4 overflow-y-auto custom-scroll">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="border rounded-xl shadow-md p-4">
              <Skeleton height={20} width={150} className="mb-4" />
              <Skeleton height={20} width={100} className="mb-2" />
              <Skeleton height={20} width={120} className="mb-2" />
              <Skeleton height={20} width={90} />
            </div>
          ))
        ) : (
          prescriptions.map((prescription, index) => (
            <div
              key={prescription._id || index}
              className="border rounded-xl shadow-md transition"
            >
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-t-lg mb-4">
                <h4 className="font-semibold">
                  Dr. {prescription.doctor.firstName} {prescription.doctor.lastName}
                </h4>
                <div className="text-customBlue p-2 rounded-full bg-white shadow">
                  <FaEye onClick={() => openModal(prescription)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 p-2">
                <p className="text-gray-500">Hospital Name</p>
                <p className="text-gray-900 font-medium">
                  {prescription.appointmentId.hospital}
                </p>

                <p className="text-gray-500">Disease Name</p>
                <p className="text-gray-900 font-medium">
                  {prescription.medicines[0]?.name || "N/A"}
                </p>

                <p className="text-gray-500">Date</p>
                <p className="text-gray-900 font-medium">
                  {new Date(prescription.prescriptionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Prescription Modal */}
      {showModal && selectedPrescriptionId && (
        <PrescriptionModal
          closeModal={closeModal}
          prescriptionId={selectedPrescriptionId}
        />
      )}
    </div>
  );
};

export default PrescriptionPage;

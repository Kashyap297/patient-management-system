import React, { useEffect, useState } from "react";
import { FaEye, FaSearch } from "react-icons/fa";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import PrescriptionModal from "../../components/Patient/PrescritionModal";
import api from "../../api/api";

const PrescriptionPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

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
        setPrescriptions(response.data.prescriptions || []); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const openModal = (prescription) => {
    setSelectedPrescriptionId(prescription._id); // Set prescription ID
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPrescriptionId(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg m-6 h-full">
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
        {prescriptions.map((prescription, index) => (
          <div
            key={prescription._id || index} // Use prescription ID if available, otherwise fallback to index
            className="border rounded-lg shadow-md transition"
          >
            {/* Card header with doctor name and eye icon */}
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-t-lg mb-4">
              <h4 className="font-semibold">
                Dr. {prescription.doctor.firstName} {prescription.doctor.lastName}
              </h4>
              <div className="text-customBlue p-2 rounded-full bg-white shadow">
                <FaEye onClick={() => openModal(prescription)} />
              </div>
            </div>

            {/* Hospital, Disease, and Date Information */}
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
        ))}
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

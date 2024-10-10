import React, { useEffect, useState } from "react";
import { FaEye, FaSearch } from "react-icons/fa";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import PrescritionModal from "../../components/Patient/PrescritionModal";

const PrescriptionPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);


  useEffect(() => {
    updateBreadcrumb([
      { label: "Personal Health Record", path: "/patient/patient-dashboard" },
      { label: "Prescriptions", path: "/patient/prescriptions" },
    ]);
  }, [updateBreadcrumb]);

  const prescriptions = [
    {
      doctor: "Dr. Ryan Vetrows",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Omar Herwitz",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Corey Dorwart",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Kadin Workman",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Leo Workman",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Emerson Levin",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Emerson Press",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Ryan Herwitz",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Jaylon Lubin",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Ruben Septimus",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Zaire Dorwart",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
    },
    {
      doctor: "Dr. Phillip Rhiel Madsen",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
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
        <h2 className="text-2xl font-semibold">Prescriptions</h2>
        {/* Search Bar */}
        <div className="relative ">
          <input
            type="text"
            placeholder="Search Here"
            className=" rounded-3xl py-2 px-4 pr-10 w-64 bg-gray-50 bottom-0"
          />
          <FaSearch className="absolute top-2/4 right-4 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Grid Layout for Prescriptions */}
      <div className="grid grid-cols-4 gap-4 overflow-y-auto custom-scroll">
        {prescriptions.map((prescription, index) => (
          <div
            key={index}
            className="border rounded-lg  shadow-md   transition"
          >
            {/* Card header with doctor name and eye icon */}
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-t-lg  mb-4">
              <h4 className="font-semibold">{prescription.doctor}</h4>
              <div className="text-customBlue p-2 rounded-full bg-white shadow">
                <FaEye onClick={() => openModal(prescription)}/>
              </div>
            </div>

            {/* Hospital, Disease, and Date Information */}
            <div className="grid grid-cols-2 gap-2 p-2">
              <p className="text-gray-500">Hospital Name</p>
              <p className="text-gray-900 font-medium">
                {prescription.hospital}
              </p>

              <p className="text-gray-500">Disease Name</p>
              <p className="text-gray-900 font-medium">
                {prescription.disease}
              </p>

              <p className="text-gray-500">Date</p>
              <p className="text-gray-900 font-medium">{prescription.date}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Prescription Modal */}
      {showModal && selectedPrescription && <PrescritionModal closeModal={closeModal}/>}
    </div>
  );
};

export default PrescriptionPage;

import React, { useEffect } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaEye, FaSearch } from "react-icons/fa";

const MedicalHistoryPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Personal Health Record", path: "/patient/patient-dashboard" },
      { label: "Medical History", path: "/patient/medical-history" },
    ]);
  }, [updateBreadcrumb]);

  const medicalHistory = [
    {
      patient: "Dulce Schleifer",
      date: "2 Jan, 2022",
      issue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      patient: "Alfredo Carder",
      date: "2 Jan, 2022",
      issue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      patient: "Justin Rhiel Madsen",
      date: "2 Jan, 2022",
      issue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      patient: "Wilson Workman",
      date: "2 Jan, 2022",
      issue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      patient: "Lydia Dodkis",
      date: "2 Jan, 2022",
      issue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      patient: "Chance Westervelt",
      date: "2 Jan, 2022",
      issue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      patient: "Giana Cahoon",
      date: "2 Jan, 2022",
      issue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      patient: "Ryan Amirhoff",
      date: "2 Jan, 2022",
      issue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      patient: "Dulce Press",
      date: "2 Jan, 2022",
      issue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      patient: "Lydia Torfi",
      date: "2 Jan, 2022",
      issue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
      patient: "Cristofer Pascuaringuhi Arcand",
      date: "2 Jan, 2022",
      issue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg m-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Medical History</h2>
      </div>

      {/* Grid Layout for Medical History */}
      <div className="grid grid-cols-4 gap-4 overflow-y-auto custom-scroll">
        {medicalHistory.map((record, index) => (
          <div key={index} className="border rounded-lg shadow-md transition ">
            {/* Patient Name and Date */}
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-t-lg  mb-2">
              <h4 className="font-semibold">{record.patient}</h4>
              <div className="text-customBlue p-2 rounded-full bg-white shadow">
                <FaEye />
              </div>
            </div>
            <div className="flex justify-between items-center  p-2">
              <h4 className="font-semibold">
                Date</h4>
              <span className="text-gray-500 text-sm">{record.date}</span>
            </div>
            {/* Patient Issue */}
            <div className="px-2">
              <p className="text-gray-500 font-semibold mb-2 ">Patient Issue</p>
              <p className="text-gray-700 pb-2">{record.issue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalHistoryPage;

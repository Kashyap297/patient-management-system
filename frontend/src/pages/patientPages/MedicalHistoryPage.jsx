import React, { useEffect, useState } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaEye } from "react-icons/fa";
import api from "../../api/api";

const MedicalHistoryPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [medicalHistory, setMedicalHistory] = useState([]);

  useEffect(() => {
    updateBreadcrumb([
      { label: "Personal Health Record", path: "/patient/patient-dashboard" },
      { label: "Medical History", path: "/patient/medical-history" },
    ]);
  }, []);

  // Fetch the appointments for the logged-in user
  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await api.get("/appointments"); // Adjust the endpoint as necessary
        setMedicalHistory(response.data.data || []); // Assuming the data is in response.data.data
      } catch (error) {
        console.error("Error fetching medical history:", error);
      }
    };

    fetchMedicalHistory();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg m-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Medical History</h2>
      </div>

      {/* Grid Layout for Medical History */}
      <div className="grid grid-cols-4 gap-4 overflow-y-auto custom-scroll">
        {medicalHistory.map((record, index) => (
          <div key={record.id || index} className="border rounded-lg shadow-md transition">
            {/* Patient Name and Date */}
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-t-lg mb-2">
              <h4 className="font-semibold">
                {record.patientName || "Patient Name"}
              </h4>
              <div className="text-customBlue p-2 rounded-full bg-white shadow">
                <FaEye />
              </div>
            </div>
            <div className="flex justify-between items-center p-2">
              <h4 className="font-semibold">Date</h4>
              <span className="text-gray-500 text-sm">
                {new Date(record.appointmentDate).toLocaleDateString()}
              </span>
            </div>
            {/* Patient Issue */}
            <div className="px-2">
              <p className="text-gray-500 font-semibold mb-2">Patient Issue</p>
              <p className="text-gray-700 pb-2">
                {record.diseaseName || "No description provided."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalHistoryPage;

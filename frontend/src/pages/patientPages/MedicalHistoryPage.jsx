import React, { useEffect, useState } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaEye } from "react-icons/fa";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";
import DoctorDetailsSidebar from "../../components/Patient/DoctorDetailsSidebar"; // Import the sidebar component

const MedicalHistoryPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to store the selected doctor
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State to control sidebar visibility

  useEffect(() => {
    updateBreadcrumb([
      { label: "Personal Health Record", path: "/patient/patient-dashboard" },
      { label: "Medical History", path: "/patient/medical-history" },
    ]);
  }, []);

  // Fetch the appointments for the logged-in user
  useEffect(() => {
    const fetchMedicalHistory = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage
      if (!token) return; // If no token, do not proceed

      const { id } = jwtDecode(token); // Decode the token to get the user ID
      try {
        const response = await api.get("/appointments"); // Fetch all appointments
        // Filter appointments for the logged-in user
        const userAppointments = response.data.data.filter(appointment => appointment.patientId === id);
        setMedicalHistory(userAppointments); // Set the filtered appointments
      } catch (error) {
        console.error("Error fetching medical history:", error);
      }
    };

    fetchMedicalHistory();
  }, []);

  const handleViewDetails = (appointment) => {
    setSelectedDoctor(appointment); // Set the selected doctor's details
    setIsSidebarVisible(true); // Show the sidebar
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg m-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Medical History</h2>
      </div>

      {/* Grid Layout for Medical History */}
      <div className="grid grid-cols-4 gap-4 overflow-y-auto custom-scroll">
        {medicalHistory.length > 0 ? (
          medicalHistory.map((record, index) => (
            <div key={record.id || index} className="border rounded-lg shadow-md transition">
              {/* Patient Name and Date */}
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-t-lg mb-2">
                <h4 className="font-semibold">
                  {record.doctorName || "Doctor Name"}
                </h4>
                <div
                  className="text-customBlue p-2 rounded-full bg-white shadow cursor-pointer"
                  onClick={() => handleViewDetails(record)} // Handle view details
                >
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
          ))
        ) : (
          <p className="text-gray-500">No medical history available.</p>
        )}
      </div>

      {/* Doctor Details Sidebar */}
      {selectedDoctor && (
        <DoctorDetailsSidebar
          doctor={selectedDoctor}
          isVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)} // Close sidebar function
        />
      )}
    </div>
  );
};

export default MedicalHistoryPage;

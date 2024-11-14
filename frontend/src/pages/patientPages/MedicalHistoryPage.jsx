import React, { useEffect, useState } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaEye } from "react-icons/fa";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";
import DoctorDetailsSidebar from "../../components/Patient/DoctorDetailsSidebar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MedicalHistoryPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateBreadcrumb([
      { label: "Personal Health Record", path: "/patient/patient-dashboard" },
      { label: "Medical History", path: "/patient/medical-history" },
    ]);
  }, []);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { id } = jwtDecode(token);
      try {
        const response = await api.get("/appointments");
        const userAppointments = response.data.data.filter(
          (appointment) => appointment.patientId === id
        );
        setMedicalHistory(userAppointments);
      } catch (error) {
        console.error("Error fetching medical history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalHistory();
  }, []);

  const handleViewDetails = (appointment) => {
    setSelectedDoctor(appointment);
    setIsSidebarVisible(true);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">Medical History</h2>
      </div>

      {/* Responsive Grid Layout for Medical History */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto custom-scroll h-[500px] md:h-[690px]">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="border rounded-xl shadow-md p-4"
              >
                <Skeleton height={20} width="80%" className="mb-2" />
                <Skeleton height={20} width="70%" className="mb-2" />
                <Skeleton height={20} width="60%" className="mb-2" />
                <Skeleton height={40} />
              </div>
            ))
          : medicalHistory.length > 0
          ? medicalHistory.map((record, index) => (
              <div
                key={record.id || index}
                className="border rounded-xl shadow-md transition"
              >
                <div className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded-t-xl mb-2">
                  <h4 className="font-semibold">
                    {record.doctorName || "Doctor Name"}
                  </h4>
                  <div
                    className="text-customBlue p-2 rounded-full bg-white shadow cursor-pointer"
                    onClick={() => handleViewDetails(record)}
                  >
                    <FaEye />
                  </div>
                </div>
                <div className="flex justify-between items-center px-3 py-2">
                  <h4 className="font-semibold">Date</h4>
                  <span className="text-gray-500 text-sm">
                    {new Date(record.appointmentDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="px-3">
                  <p className="text-gray-500 font-semibold mb-2">
                    Patient Issue
                  </p>
                  <p className="text-gray-700 pb-2">
                    {record.diseaseName || "No description provided."}
                  </p>
                </div>
              </div>
            ))
          : (
            <p className="text-gray-500">No medical history available.</p>
          )}
      </div>

      {/* Doctor Details Sidebar */}
      {selectedDoctor && (
        <DoctorDetailsSidebar
          doctor={selectedDoctor}
          isVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
        />
      )}
    </div>
  );
};

export default MedicalHistoryPage;

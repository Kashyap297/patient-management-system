import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MedicalHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch all appointments for the logged-in user
  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { id } = jwtDecode(token);
      try {
        const response = await api.get(`/appointments`);
        const userAppointments = response.data.data.filter(
          (appointment) => appointment.patientId === id
        );
        setHistory(userAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchAppointments();
  }, []);

  const handleViewAll = () => {
    navigate("/patient/medical-history");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Medical History</h2>
        <a
          href=""
          className="text-blue-600 hover:underline"
          onClick={handleViewAll}
        >
          View All History
        </a>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="overflow-x-auto">
        <div className="flex space-x-4 w-full max-w-full overflow-x-auto custom-scroll">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="min-w-[300px] max-w-[300px] bg-white rounded-xl shadow-md border mb-4"
              >
                <div className="flex align-center justify-between bg-gray-100 px-4 py-2 rounded-t-lg">
                  <Skeleton width={100} height={20} />
                  <Skeleton width={70} height={20} />
                </div>
                <div className="p-4">
                  <Skeleton width="60%" height={15} className="mb-2" />
                  <Skeleton width="80%" height={15} />
                </div>
              </div>
            ))
          ) : history.length > 0 ? (
            history.map((record, index) => (
              <div
                key={record.id || index}
                className="min-w-[300px] max-w-[300px] bg-white rounded-xl shadow-md border mb-4"
              >
                <div className="flex align-center justify-between bg-gray-100 px-4 py-2 rounded-t-lg">
                  <h4 className="font-semibold text-customBlue">
                    {record.doctorName || "Doctor Name"}
                  </h4>
                  <p className="text-gray-500">
                    {new Date(record.appointmentDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="p-4">
                  <p className="font-semibold">Patient Issue</p>
                  <p className="mt-2 text-gray-600 text-sm">
                    {record.diseaseName || "No additional information provided."}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No medical history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;

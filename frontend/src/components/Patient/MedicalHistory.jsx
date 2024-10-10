import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const MedicalHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  // Fetch all appointments for the logged-in user
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments"); // Adjust API endpoint as needed
        setHistory(response.data.data || []); // Assuming response.data.data contains the appointments array
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleViewAll = () => {
    navigate("/patient/medical-history");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Medical History</h2>
        <a
          href="#"
          className="text-blue-600 hover:underline"
          onClick={handleViewAll}
        >
          View All History
        </a>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="overflow-x-auto">
        <div className="flex space-x-4 w-full max-w-full overflow-x-auto custom-scroll">
          {history.map((record, index) => (
            <div
              key={record.id || index} // Use unique identifier if available
              className="min-w-[300px] max-w-[300px] bg-white rounded-lg shadow-md border mb-4"
            >
              {/* Gray Header with Name and Date */}
              <div className="flex align-center justify-between bg-gray-100 px-4 py-2 rounded-t-lg">
                <h4 className="font-semibold text-customBlue">
                  {record.doctorName || "Doctor Name"}
                </h4>
                <p className="text-gray-500">
                  {new Date(record.appointmentDate).toLocaleDateString()}
                </p>
              </div>

              {/* Patient Issue and Description */}
              <div className="p-4">
                <p className="font-semibold">{record.diseaseName || "Patient Issue"}</p>
                <p className="mt-2 text-gray-600 text-sm">
                  {record.description || "No additional information provided."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;

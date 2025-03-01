import React, { useEffect, useState } from "react";
import { Eye, X } from "lucide-react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // To decode token and extract patient ID
import { useNavigate } from "react-router-dom";

const TestReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Decode the token to get patient ID
    const getPatientIdFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setPatientId(decoded.id); // Assuming `id` in token is the patient ID
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        console.error("No token found in localStorage.");
      }
    };

    getPatientIdFromToken();
  }, []);

  useEffect(() => {
    if (!patientId) return;

    const fetchTestReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/patients/patient/test-reports/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReports(response.data.data);
      } catch (error) {
        console.error("Error fetching test reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestReports();
  }, [patientId]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Test Reports</h2>
        <button
          onClick={() => navigate("/patient/test-report")}
          className="text-blue-600 hover:underline"
        >
          View All Reports
        </button>
      </div>
      <div className="max-w-6xl mx-auto">

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            No test reports available
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className="h-48 w-full overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(report.fileUrl)}
                >
                  <img
                    src={report.fileUrl}
                    alt="Medical Report"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{report.doctor}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(report.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedImage(report.fileUrl)}
                      className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">{report.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Full size medical report"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestReports;

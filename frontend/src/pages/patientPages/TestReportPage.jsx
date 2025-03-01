import React, { useEffect, useState } from "react";
import { Eye, X } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TestReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    // Decode token to get patient ID
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setPatientId(decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
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
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">All Test Reports</h2>
      </div>

      {/* Grid layout for test reports */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto custom-scroll ">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="border rounded-xl shadow-md p-4">
                <Skeleton height={150} className="mb-2" />
                <Skeleton height={20} width="80%" className="mb-2" />
                <Skeleton height={20} width="70%" className="mb-2" />
                <Skeleton height={40} />
              </div>
            ))
          : reports.length > 0
          ? reports.map((report, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
            ))
          : (
            <p className="text-gray-500">No test reports available.</p>
          )}
      </div>

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
  );
};

export default TestReportsPage;

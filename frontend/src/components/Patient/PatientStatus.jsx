import React, { useEffect, useState } from "react";
import { FaHospital, FaUserMd, FaCalendarAlt, FaInfoCircle, FaUsers } from "react-icons/fa"; // FontAwesome Icons
import api from "../../api/api"; // Adjust the path according to your project structure
import { jwtDecode } from "jwt-decode";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PatientStatus = () => {
  const [status, setStatus] = useState({
    hospital: "",
    doctor: "",
    date: "",
    xyz: "",
    description: "",
  });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchLastAppointment = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { id } = jwtDecode(token);
      try {
        const response = await api.get("/appointments");
        const userAppointments = response.data.data.filter(
          (appointment) => appointment.patientId === id
        );

        const sortedAppointments = userAppointments.sort(
          (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
        );
        const lastAppointment = sortedAppointments[0];

        if (lastAppointment) {
          setStatus({
            hospital: lastAppointment.hospitalName || "Shamuba Hospital",
            doctor: lastAppointment.doctorName || "Dr. Mathew Best",
            date: new Date(lastAppointment.appointmentDate).toLocaleDateString() || "2 Jan, 2022",
            xyz: lastAppointment.patientIssue || "Chance Carder",
            description:
              lastAppointment.description ||
              "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
          });
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchLastAppointment();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Patient Status</h2>

      {/* Grid Layout for the icons and text */}
      <div className="grid grid-cols-2 gap-4 h-[210px]">
        {/* First column: Hospital Name */}
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
            <FaHospital className="text-blue-600" size={24} />
          </div>
          <p className="font-semibold text-blue-900">
            {loading ? <Skeleton width={100} /> : status.hospital}
          </p>
        </div>

        {/* Second column: Doctor's Name */}
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
            <FaUserMd className="text-green-500" size={24} />
          </div>
          <p className="font-semibold text-gray-800">
            {loading ? <Skeleton width={100} /> : status.doctor}
          </p>
        </div>

        {/* First column: Date */}
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
            <FaCalendarAlt className="text-purple-500" size={24} />
          </div>
          <p className="text-gray-600">
            {loading ? <Skeleton width={80} /> : status.date}
          </p>
        </div>

        {/* Second column: Additional Info */}
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
            <FaUsers className="text-purple-500" size={24} />
          </div>
          <p className="text-gray-600">
            {loading ? <Skeleton width={80} /> : status.xyz}
          </p>
        </div>

        {/* Full row for description */}
        <div className="col-span-2 flex items-start space-x-2">
          <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
            <FaInfoCircle className="text-blue-500" size={24} />
          </div>
          <p className="text-gray-600 text-sm">
            {loading ? <Skeleton count={2} /> : status.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientStatus;

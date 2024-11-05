import { useState, useEffect } from "react";
import {
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import { Search, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../api/api"; // Adjust the path according to your project structure
import { FaEye, FaSearch } from "react-icons/fa";
import NoDataFound from "../../assets/images/NoDataFound.png";

const PatientRecordAccess = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState("Month"); // Default filter to 'Month'
  const [anchorEl, setAnchorEl] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found");
          return;
        }

        // Decode token to get the doctor ID
        const decodedToken = jwtDecode(token);
        const doctorId = decodedToken.id;

        // Fetch appointments associated with this doctor
        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allAppointments = response.data.data || [];

        // Filter for only the completed appointments of the logged-in doctor
        const completedAppointments = allAppointments.filter((appointment) => {
          return (
            appointment.doctorId === doctorId &&
            appointment.status === "Completed"
          );
        });

        setAppointments(completedAppointments);
        setFilteredAppointments(completedAppointments); // Initially show all completed appointments
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Filter patients based on search term and date filter
  const getFilteredPatients = () => {
    const today = new Date();
    let filteredList = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate);

      // Apply date filter logic
      if (dateFilter === "Day") {
        return (
          appointmentDate.toDateString() === today.toDateString() // Only today
        );
      } else if (dateFilter === "Week") {
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7); // Last 7 days
        return appointmentDate >= lastWeek && appointmentDate <= today;
      } else if (dateFilter === "Month") {
        const lastMonth = new Date(today);
        lastMonth.setDate(today.getDate() - 30); // Last 30 days
        return appointmentDate >= lastMonth && appointmentDate <= today;
      }

      return true; // default case, show all appointments if no filter selected
    });

    // Apply search term filtering
    if (searchTerm) {
      filteredList = filteredList.filter(
        (appointment) =>
          appointment.patientName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          appointment.diseaseName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (appointment.patientIssue &&
            appointment.patientIssue
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    return filteredList;
  };

  // Update filtered appointments whenever search term or date filter changes
  useEffect(() => {
    setFilteredAppointments(getFilteredPatients());
  }, [searchTerm, dateFilter, appointments]);

  const handleFilterChange = (filter) => {
    setDateFilter(filter);
    setAnchorEl(null);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#030229]">
          Patient Record Access
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#f6f8fb] rounded-full px-4 py-2 max-w-lg">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Patient"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#f6f8fb] focus:outline-none w-full"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="border px-5 py-2 rounded-xl flex items-center w-full text-gray-600"
            >
              {dateFilter}
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg z-10">
                <div
                  onClick={() => setDateFilter("Day")}
                  className="cursor-pointer px-4 py-2 text-gray-700 hover:text-[#0eabeb] hover:bg-gray-100"
                >
                  Day
                </div>
                <div
                  onClick={() => setDateFilter("Week")}
                  className="cursor-pointer px-4 py-2 text-gray-700 hover:text-[#0eabeb] hover:bg-gray-100"
                >
                  Week
                </div>
                <div
                  onClick={() => setDateFilter("Month")}
                  className="cursor-pointer px-4 py-2 text-gray-700 hover:text-[#0eabeb] hover:bg-gray-100"
                >
                  Month
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table of Completed Appointments */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-2xl overflow-hidden">
          <thead className="bg-[#f6f8fb]">
            <tr>
              <th className="px-6 py-4 text-center font-semibold">
                Patient Name
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Disease Name
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Patient Issue
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Last Appointment Date
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Last Appointment Time
              </th>
              <th className="px-6 py-4 text-center font-semibold">Age</th>
              <th className="px-6 py-4 text-center font-semibold">Gender</th>
              <th className="px-6 py-4 text-center font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="text-center ">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4 text-[#4F4F4F]">
                    {appointment.patientName}
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F]">
                    {appointment.diseaseName}
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F]">
                    {appointment.patientIssue}
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F]">
                    {new Date(appointment.appointmentDate).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                  <td className="px-6 py-4 text-[#718EBF]">
                    <span className={"px-4 py-2 rounded-full bg-[#f6f8fb]"}>
                      {appointment.appointmentTime}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F]">
                    {appointment.patientAge} Years
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F]">
                    <span className={"px-4 py-2 rounded-full bg-[#f6f8fb]"}>
                      {appointment.patientGender === "Male" ? "♂" : "♀"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        navigate(
                          `/doctor/patient-detail/${appointment.patientId}`
                        )
                      }
                      className="text-blue-500 hover:bg-gray-100 p-2 rounded-lg"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-16 text-gray-500">
                  <div className="flex flex-col items-center">
                    <img
                      src={NoDataFound}
                      alt="No Patient Found"
                      className="w-60 mb-4"
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientRecordAccess;

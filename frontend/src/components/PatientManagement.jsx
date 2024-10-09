import { useState, useEffect } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Search, Visibility } from "@mui/icons-material";
import PatientDetailsModal from "../components/modals/PatientDetailModal";
import api from "../api/api"; // Import your API utility

const PatientManagement = () => {
  const [activeTab, setActiveTab] = useState("Today Appointment");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  // Fetch all appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
          },
        });
        setAppointments(response.data.data);
        filterAppointments(response.data.data, activeTab);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [activeTab]);

  // Filter appointments based on the selected tab
  const filterAppointments = (appointments, tab) => {
    const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format

    let filtered = [];
    switch (tab) {
      case "Today Appointment":
        filtered = appointments.filter(
          (appointment) =>
            appointment.appointmentDate === today &&
            appointment.status !== "Cancelled"
        );
        break;
      case "Upcoming Appointment":
        filtered = appointments.filter(
          (appointment) =>
            appointment.appointmentDate > today &&
            appointment.status !== "Cancelled"
        );
        break;
      case "Previous Appointment":
        filtered = appointments.filter(
          (appointment) =>
            appointment.appointmentDate < today &&
            appointment.status !== "Cancelled"
        );
        break;
      case "Cancel Appointment":
        filtered = appointments.filter(
          (appointment) => appointment.status === "Cancelled"
        );
        break;
      default:
        filtered = appointments;
    }
    setFilteredAppointments(filtered);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    filterAppointments(appointments, tab);
  };

  const handleViewPatient = async (appointmentId) => {
    if (!appointmentId) {
      console.error("Appointment ID is undefined");
      return;
    }

    try {
      const response = await api.get(`/appointments/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
        },
      });

      // Set the selected patient data for the modal
      setSelectedPatient(response.data.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const filteredAndSearchedAppointments = filteredAppointments.filter(
    (appointment) =>
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.patientIssue
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (appointment.doctorName &&
        appointment.doctorName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      appointment.diseaseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const appointmentTypeStyles = {
    Online: "bg-yellow-100 text-yellow-600",
    Onsite: "bg-blue-100 text-blue-600",
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-8 text-sm font-semibold text-gray-500">
          {[
            "Today Appointment",
            "Upcoming Appointment",
            "Previous Appointment",
            "Cancel Appointment",
          ].map((tab) => (
            <Button
              key={tab}
              className={
                activeTab === tab
                  ? "!text-blue-600 !border-b-2 !border-blue-600"
                  : "text-gray-400"
              }
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
        <TextField
          variant="outlined"
          placeholder="Search Patient"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        <table className="min-w-full table-auto">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th className="p-3 text-left text-sm font-semibold">
                Patient Name
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Patient Issue
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Doctor Name
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Disease Name
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Appointment Time
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Appointment Type
              </th>
              <th className="p-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSearchedAppointments.map((appointment, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{appointment.patientName}</td>
                <td className="p-3">{appointment.patientIssue}</td>
                <td className="p-3">{appointment.doctorName || "N/A"}</td>
                <td className="p-3">{appointment.diseaseName}</td>
                <td className="p-3 text-blue-600">
                  {appointment.appointmentTime}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      appointmentTypeStyles[appointment.appointmentType]
                    }`}
                  >
                    {appointment.appointmentType}
                  </span>
                </td>
                <td className="p-3">
                  <IconButton
                    color="primary"
                    onClick={() => handleViewPatient(appointment.id)} // Use 'id' instead of '_id'
                  >
                    <Visibility />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PatientDetailsModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        patient={selectedPatient}
      />
    </div>
  );
};

export default PatientManagement;

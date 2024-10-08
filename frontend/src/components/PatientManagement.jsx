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

  // Fetch appointments from your API based on the active tab
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get(`/appointments/${activeTab}`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleViewPatient = async (patientId) => {
    try {
      const response = await api.get(`/users/patients/${patientId}`);
      setSelectedPatient(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.patientIssue
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{appointment.patientName}</td>
                  <td className="p-3">{appointment.patientIssue}</td>
                  <td className="p-3">{appointment.doctorName}</td>
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
                      onClick={() => handleViewPatient(appointment.patientId)}
                    >
                      <Visibility />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No Appointments Found
                </td>
              </tr>
            )}
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

import { useState } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Search, Visibility } from "@mui/icons-material";
import PatientDetailsModal from "./modals/PatientDetailModal";

const PatientManagement = () => {
  const [activeTab, setActiveTab] = useState("Today Appointment"); // Tracks active tab
  const [searchTerm, setSearchTerm] = useState(""); // Tracks search input
  const [selectedPatient, setSelectedPatient] = useState(null); // Selected patient for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const allAppointments = {
    today: [
      {
        patientName: "Marcus Philips",
        patientIssue: "Stomach Ache",
        doctorName: "Dr. Mathew Best",
        diseaseName: "Viral Infection",
        appointmentTime: "4:30 PM",
        appointmentType: "Online",
      },
      {
        patientName: "London Shaffer",
        patientIssue: "Feeling Tired",
        doctorName: "Dr. Annabella Porter",
        diseaseName: "Blood Pressure",
        appointmentTime: "5:00 AM",
        appointmentType: "Onsite",
      },
      {
        patientName: "Leslie Mccray",
        patientIssue: "Dizziness",
        doctorName: "Dr. Yaretzi Bright",
        diseaseName: "Diabetes",
        appointmentTime: "7:30 PM",
        appointmentType: "Online",
      },
      {
        patientName: "Daniela Cash",
        patientIssue: "Neck Pain",
        doctorName: "Dr. Layla Pollard",
        diseaseName: "Neck Pain",
        appointmentTime: "6:00 AM",
        appointmentType: "Onsite",
      },
      // Add more dummy data
    ],
    upcoming: [
      {
        patientName: "Olive Valencia",
        patientIssue: "Headache",
        doctorName: "Dr. Tessa Lee",
        diseaseName: "Headache",
        appointmentTime: "3:30 PM",
        appointmentType: "Online",
      },
      {
        patientName: "Rowen Floyd",
        patientIssue: "Fever",
        doctorName: "Dr. Winter Strong",
        diseaseName: "Fever",
        appointmentTime: "2:00 AM",
        appointmentType: "Onsite",
      },
      // Add more dummy data
    ],
    previous: [
      {
        patientName: "Gaige Castillo",
        patientIssue: "Fever",
        doctorName: "Dr. Yusuf Mercado",
        diseaseName: "Viral Infection",
        appointmentTime: "1:30 PM",
        appointmentType: "Onsite",
      },
      {
        patientName: "Kayla Maddox",
        patientIssue: "Feeling Tired",
        doctorName: "Dr. Titan Grant",
        diseaseName: "Blood Pressure",
        appointmentTime: "5:00 AM",
        appointmentType: "Online",
      },
      // Add more dummy data
    ],
    canceled: [
      {
        patientName: "Trenton Mejia",
        patientIssue: "Fever",
        doctorName: "Dr. Keenan Tucker",
        diseaseName: "Viral Infection",
        appointmentTime: "4:30 PM",
        appointmentType: "Online",
      },
      {
        patientName: "Julianna Warren",
        patientIssue: "Headache",
        doctorName: "Dr. Ari Bullock",
        diseaseName: "Headache",
        appointmentTime: "6:00 AM",
        appointmentType: "Onsite",
      },
      // Add more dummy data
    ],
  };

  // This should be declared before using it
  const getAppointments = () => {
    switch (activeTab) {
      case "Today Appointment":
        return allAppointments.today;
      case "Upcoming Appointment":
        return allAppointments.upcoming;
      case "Previous Appointment":
        return allAppointments.previous;
      case "Cancel Appointment":
        return allAppointments.canceled;
      default:
        return [];
    }
  };

  // Handle tab change and switch data
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle modal view for patient details
  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  // Filter appointments based on search term
  const filteredAppointments = getAppointments().filter(
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
      {/* Tabs for Appointment Categories */}
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

      {/* Scrollable Table */}
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
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => handleViewPatient(appointment)}
                    >
                      <Visibility />
                    </Button>
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

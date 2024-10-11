import React, { useState, useEffect } from 'react';
import { Tabs, Tab, TextField, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Badge } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PrescriptionModal from '../../components/modals/PrescriptionModal';
import api from "../../api/api"; // Assuming api.js is set up with the Axios instance

const ManagePrescription = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [todayPatients, setTodayPatients] = useState([]);
  const [olderPatients, setOlderPatients] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Fetch appointments for today and older appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments');
        const appointments = response.data.data;
        
        // Filter today's appointments and older appointments
        const today = new Date().setHours(0, 0, 0, 0);
        const todayData = appointments.filter(appt => new Date(appt.appointmentDate).setHours(0, 0, 0, 0) === today);
        const olderData = appointments.filter(appt => new Date(appt.appointmentDate).setHours(0, 0, 0, 0) < today);

        setTodayPatients(todayData);
        setOlderPatients(olderData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Handle modal open with prescription details
  const handleModalOpen = async (appointmentId) => {
    try {
      const response = await api.get('/prescription');
      const prescriptions = response.data.prescriptions;
      const prescription = prescriptions.find(prescription => prescription.appointmentId._id === appointmentId);

      if (prescription) {
        setSelectedPrescription(prescription);
        setModalOpen(true);
      } else {
        console.error("Prescription not found for this appointment.");
      }
    } catch (error) {
      console.error("Error fetching prescription:", error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPrescription(null);
  };

  // Choose the appropriate data based on the active tab
  const currentPatients = activeTab === 0 ? todayPatients : olderPatients;

  // Filter the patient data based on search input
  const filteredPatients = currentPatients.filter(
    (patient) =>
      patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientPhoneNumber.includes(searchTerm) ||
      patient.patientAge.toString().includes(searchTerm)
  );

  return (
    <div className="p-8 bg-white min-h-screen shadow-lg rounded-lg">
      {/* Tabs */}
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
        <Tab label="Today Prescription" />
        <Tab label="Older Prescription" />
      </Tabs>

      {/* Search Field */}
      <div className="mt-4 mb-6">
        <TextField
          label="Search Patient"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell>Patient Number</TableCell>
            <TableCell>Appointment Type</TableCell>
            <TableCell>Appointment Time</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPatients.map((patient, index) => (
            <TableRow key={index}>
              <TableCell>{patient.patientName}</TableCell>
              <TableCell>{patient.patientPhoneNumber}</TableCell>
              <TableCell>
                <Badge
                  badgeContent={patient.appointmentType}
                  color={patient.appointmentType === 'Online' ? 'warning' : 'primary'}
                />
              </TableCell>
              <TableCell>{patient.appointmentTime}</TableCell>
              <TableCell>{patient.patientAge}</TableCell>
              <TableCell>
                {patient.patientGender === 'Male' ? (
                  <MaleIcon style={{ color: 'blue' }} />
                ) : (
                  <FemaleIcon style={{ color: 'red' }} />
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleModalOpen(patient.id)}>
                  <Visibility />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Prescription Modal */}
      {selectedPrescription && (
        <PrescriptionModal
          open={modalOpen}
          handleClose={handleModalClose}
          prescriptionData={selectedPrescription}
        />
      )}
    </div>
  );
};

export default ManagePrescription;

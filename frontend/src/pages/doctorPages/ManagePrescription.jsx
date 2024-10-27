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
  const [todayPrescriptions, setTodayPrescriptions] = useState([]);
  const [olderPrescriptions, setOlderPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Fetch prescriptions for today and older ones
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await api.get('/prescription'); // Fetch all prescriptions for the logged-in user
        const prescriptions = response.data.prescriptions;

        // Filter today's prescriptions and older prescriptions
        const today = new Date().setHours(0, 0, 0, 0); // Start of today's date
        const todayData = prescriptions.filter(
          (pres) => new Date(pres.createdAt).setHours(0, 0, 0, 0) === today
        );
        const olderData = prescriptions.filter(
          (pres) => new Date(pres.createdAt).setHours(0, 0, 0, 0) < today
        );

        setTodayPrescriptions(todayData);
        setOlderPrescriptions(olderData);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  console.log(todayPrescriptions)
  console.log(olderPrescriptions)

  // Handle modal open with prescription details
  const handleModalOpen = (prescriptionId) => {
    const prescription = todayPrescriptions.find((pres) => pres._id === prescriptionId)
      || olderPrescriptions.find((pres) => pres._id === prescriptionId);

    if (prescription) {
      setSelectedPrescription(prescription);
      setModalOpen(true);
    } else {
      console.error('Prescription not found.');
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPrescription(null);
  };

  // Choose the appropriate data based on the active tab
  const currentPrescriptions = activeTab === 0 ? todayPrescriptions : olderPrescriptions;

  // Filter the prescription data based on search input
  const filteredPrescriptions = currentPrescriptions.filter(
    (prescription) =>
      prescription.patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.patient.phoneNumber.includes(searchTerm) ||
      prescription.patient.age.toString().includes(searchTerm)
  );

  return (
    <div className="p-8 bg-white min-h-screen shadow-lg rounded-lg">
      {/* Tabs */}
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
        <Tab label="Today's Prescriptions" />
        <Tab label="Older Prescriptions" />
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
            <TableCell>Phone Number</TableCell>
            <TableCell>Appointment Date</TableCell>
            <TableCell>Appointment Time</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPrescriptions.map((prescription, index) => (
            <TableRow key={index}>
              <TableCell>{prescription.patient.firstName} {prescription.patient.lastName}</TableCell>
              <TableCell>{prescription.patient.phoneNumber}</TableCell>
              <TableCell>{new Date(prescription.appointmentId.appointmentDate).toLocaleDateString()}</TableCell>
              <TableCell>{prescription.appointmentId.appointmentTime}</TableCell>
              <TableCell>{prescription.patient.age}</TableCell>
              <TableCell>
                {prescription.patient.gender === 'Male' ? (
                  <MaleIcon style={{ color: 'blue' }} />
                ) : (
                  <FemaleIcon style={{ color: 'red' }} />
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleModalOpen(prescription._id)}>
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

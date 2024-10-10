import React, { useState } from 'react';
import { Tabs, Tab, TextField, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Badge } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PrescriptionModal from '../../components/modals/PrescriptionModal';

// Dummy Data for Patients
const todayPatients = [
  { name: 'Marcus Philips', number: '89564 25462', type: 'Online', time: '4:30 PM', age: '22 Years', gender: 'Male' },
  { name: 'London Shaffer', number: '89564 25462', type: 'Onsite', time: '5:00 PM', age: '74 Years', gender: 'Female' },
  { name: 'Julianna Warren', number: '89564 25462', type: 'Onsite', time: '4:30 PM', age: '44 Years', gender: 'Female' },
  { name: 'Marcus Philips', number: '89564 25462', type: 'Online', time: '5:00 PM', age: '22 Years', gender: 'Male' },
];

const olderPatients = [
  { name: 'Julianna Warren', number: '89564 25462', type: 'Onsite', time: '8:30 AM', age: '55 Years', gender: 'Female' },
  { name: 'London Shaffer', number: '89564 25462', type: 'Online', time: '4:30 PM', age: '22 Years', gender: 'Female' },
  { name: 'Marcus Philips', number: '89564 25462', type: 'Onsite', time: '8:30 AM', age: '22 Years', gender: 'Male' },
  { name: 'Marcus Philips', number: '89564 25462', type: 'Online', time: '5:00 PM', age: '22 Years', gender: 'Male' },
];

const prescriptionData = {
  patientName: 'Albatrao Bhajirao',
  prescriptionDate: '2 Jan, 2022',
  gender: 'Male',
  age: '36 Years',
  address: 'B-105 Virat Bungalows Punagam Motavaracha Jamnagar.',
  medicines: [
    { name: 'Calcium carbonate', strength: '100 Mg', dose: '1-0-1', duration: '2 Day', whenToTake: 'Before Food' },
    { name: 'Cyclobenzaprine', strength: '200 Mg', dose: '1-1-1', duration: '4 Day', whenToTake: 'With Food' },
  ],
  additionalNote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
};


const ManagePrescription = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Choose the appropriate data based on the active tab
  const currentPatients = activeTab === 0 ? todayPatients : olderPatients;

  // Filtering the patient data based on search input
  const filteredPatients = currentPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.number.includes(searchTerm) ||
      patient.age.includes(searchTerm)
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
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.number}</TableCell>
              <TableCell>
                <Badge
                  badgeContent={patient.type}
                  color={patient.type === 'Online' ? 'warning' : 'primary'}
                />
              </TableCell>
              <TableCell>{patient.time}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>
                {patient.gender === 'Male' ? (
                  <MaleIcon style={{ color: 'blue' }} />
                ) : (
                  <FemaleIcon style={{ color: 'red' }} />
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={handleModalOpen} >
                  <Visibility />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PrescriptionModal open={modalOpen} handleClose={handleModalClose} prescriptionData={prescriptionData} />
    </div>
  );
};

export default ManagePrescription;

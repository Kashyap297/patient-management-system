import { useState } from 'react';
import { IconButton, TextField, InputAdornment, MenuItem, Select } from '@mui/material';
import { Search, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PatientRecordAccess = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('Month');
  const navigate = useNavigate();
  
  const patients = [
    { patientName: 'Marcus Philips', diseaseName: 'Viral Infection', patientIssue: 'Feeling Tired', lastAppointmentDate: '2 Jan, 2022', lastAppointmentTime: '4:30 PM', age: '22 Years', gender: 'Male' },
    { patientName: 'London Shaffer', diseaseName: 'Diabetes', patientIssue: 'Stomach Ache', lastAppointmentDate: '5 Jan, 2022', lastAppointmentTime: '5:00 PM', age: '45 Years', gender: 'Female' },
    // Add more data...
  ];

  // Filter patients based on search term
  const filteredPatients = patients.filter((patient) => 
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patientIssue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <h2 className="text-lg font-semibold mb-4">Patient Record Access</h2>

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <TextField
          variant="outlined"
          placeholder="Search Patient"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          variant="outlined"
        >
          <MenuItem value="Month">Month</MenuItem>
          <MenuItem value="Week">Week</MenuItem>
          <MenuItem value="Day">Day</MenuItem>
        </Select>
      </div>

      {/* Table of Patient Records */}
      <div className="max-h-[600px] overflow-y-auto">
        <table className="min-w-full table-auto">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th className="p-3 text-left text-sm font-semibold">Patient Name</th>
              <th className="p-3 text-left text-sm font-semibold">Disease Name</th>
              <th className="p-3 text-left text-sm font-semibold">Patient Issue</th>
              <th className="p-3 text-left text-sm font-semibold">Last Appointment Date</th>
              <th className="p-3 text-left text-sm font-semibold">Last Appointment Time</th>
              <th className="p-3 text-left text-sm font-semibold">Age</th>
              <th className="p-3 text-left text-sm font-semibold">Gender</th>
              <th className="p-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{patient.patientName}</td>
                <td className="p-3">{patient.diseaseName}</td>
                <td className="p-3">{patient.patientIssue}</td>
                <td className="p-3">{patient.lastAppointmentDate}</td>
                <td className="p-3 text-blue-600">{patient.lastAppointmentTime}</td>
                <td className="p-3">{patient.age}</td>
                <td className="p-3">
                  <span className={patient.gender === 'Male' ? 'text-blue-500' : 'text-pink-500'}>
                    {patient.gender === 'Male' ? '♂' : '♀'}
                  </span>
                </td>
                <td className="p-3">
                  <IconButton color="primary">
                    <Visibility onClick={() => navigate(`/patient-detail/${patient.id}`)} />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientRecordAccess;

import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import api from "../../api/api";  // Assuming you have Axios setup in this file
import patientImage from "../../assets/images/patient-image.png";
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Importing jwt-decode to decode the token
import Table from '@mui/material/Table';  // Import Material-UI Table components
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const PrescriptionView = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [patient, setPatient] = useState(null);
  const [files, setFiles] = useState([]); // For Documents and Descriptions
  const [prescriptions, setPrescriptions] = useState([]);  // For prescriptions data
  const { id: patientId } = useParams();  // Patient ID from route params
  const token = localStorage.getItem('token');  // Fetch token from localStorage
  const decodedToken = jwtDecode(token);  // Decode the token
  const doctorId = decodedToken.id;  // Extract doctorId from the token

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Fetch patient data
        const response = await api.get(`/users/patients/${patientId}`);
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    const fetchRecords = async () => {
      try {
        // Fetch records for patient and doctor
        const response = await api.get(`/patients/patient/records/${patientId}/${doctorId}`);
        setFiles(response.data.data.files);  // Assuming files come under the 'files' key
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    const fetchPrescriptions = async () => {
      try {
        // Fetch prescriptions for the patient
        const response = await api.get(`/prescription`);
        setPrescriptions(response.data.prescriptions);  // Set the prescriptions data
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPatientData();
    fetchRecords();
    fetchPrescriptions();  // Fetch prescriptions data
  }, [patientId, doctorId]);

  if (!patient) {
    return <p>Loading patient details...</p>;
  }

  return (
    <div className="p-8 bg-white min-h-screen shadow-lg rounded-lg">
      <div className="flex items-center mb-6">
        <img
          src={patientImage}
          alt={patient.firstName}
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">Patient Details</h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>Patient Name: {patient.firstName} {patient.lastName}</div>
            <div>Patient Number: {patient.phoneNumber}</div>
            <div>Patient Age: {patient.age} Years</div>
            <div>Patient Gender: {patient.gender}</div>
            <div>Blood Group: {patient.bloodGroup}</div>
            <div>Patient Address: {patient.address}</div>
          </div>
        </div>
      </div>

      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <TabList className="flex border-b-2 mb-4">
          <Tab className={`px-4 py-2 cursor-pointer outline-none ${activeTab === 0 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>
            All Documents
          </Tab>
          <Tab className={`px-4 py-2 cursor-pointer outline-none ${activeTab === 1 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>
            All Prescriptions
          </Tab>
          <Tab className={`px-4 py-2 cursor-pointer outline-none ${activeTab === 2 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>
            Description
          </Tab>
        </TabList>

        {/* All Documents */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {files.length > 0 ? files.map((file, index) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <img src={`http://localhost:8000/${file.url}`} alt="Document" className="w-full h-48 object-cover mb-4" />
              </div>
            )) : (
              <p>No documents available.</p>
            )}
          </div>
        </TabPanel>

        {/* All Prescriptions */}
        <TabPanel>
          <div className="space-y-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {prescriptions.length > 0 ? prescriptions.map((prescription, index) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-blue-600">Hospital</h2>
                    <p>{prescription.appointmentId.hospital}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-600">{prescription.doctor.firstName} {prescription.doctor.lastName}</h3>
                    <p>{prescription.doctor.specialty || "Specialty not provided"}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Patient Name: {prescription.patient.firstName} {prescription.patient.lastName}</div>
                    <div>Prescription Date: {new Date(prescription.prescriptionDate).toLocaleDateString()}</div>
                    <div>Gender: {prescription.patient.gender}</div>
                    <div>Age: {prescription.patient.age}</div>
                    <div>Address: {prescription.patient.address}</div>
                  </div>
                </div>

                <Table className="mt-4">
                  <TableHead>
                    <TableRow>
                      <TableCell>Medicine Name</TableCell>
                      <TableCell>Strength</TableCell>
                      <TableCell>Dose</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>When to Take</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {prescription.medicines.map((medicine, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{medicine.name}</TableCell>
                        <TableCell>{medicine.strength}</TableCell>
                        <TableCell>{medicine.dose}</TableCell>
                        <TableCell>{medicine.duration}</TableCell>
                        <TableCell>{medicine.whenToTake}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4">
                  <h3 className="font-bold">Additional Note:</h3>
                  <p>{prescription.additionalNote}</p>
                </div>
              </div>
            )) : (
              <p>No prescriptions available.</p>
            )}
          </div>
        </TabPanel>

        {/* Description */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {files.length > 0 ? files.map((file, index) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <p>{file.description}</p>
              </div>
            )) : (
              <p>No descriptions available.</p>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PrescriptionView;

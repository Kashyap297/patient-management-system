import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import patientImage from "../../assets/images/user.png";
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../../api/api';
import noRecord from "../../assets/images/noappointmentrecord.png";

const PrescriptionView = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [patient, setPatient] = useState(null);
  const [files, setFiles] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const { id: patientId } = useParams();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const doctorId = decodedToken.id;

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await api.get(`/users/patients/${patientId}`);
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    const fetchRecords = async () => {
      try {
        const response = await api.get(`/patients/patient/records/${patientId}/${doctorId}`);
        setFiles(response.data.data.files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    const fetchPrescriptions = async () => {
      try {
        const response = await api.get(`/prescriptions/${patientId}`);
        setPrescriptions(response.data.prescriptions);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPatientData();
    fetchRecords();
    fetchPrescriptions();
  }, [patientId, doctorId]);

  if (!patient) {
    return <p>Loading patient details...</p>;
  }

  return (
    <div className="p-8 bg-white min-h-screen shadow-lg rounded-lg">
      {/* Patient Information */}
      <div className="bg-white p-4 rounded-lg ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Patient Details</h2>
        </div>

        <div className="flex justify-between items-start">
          <div className="flex-shrink-0">
            <img
              src={patient.profileImage ? `http://localhost:8000/${patient.profileImage}` : patientImage}
              alt="Patient"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          <div className="flex-grow ml-6">
            <div className="grid grid-cols-7 gap-x-12 gap-y-4">
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Name</p> {patient.firstName} {patient.lastName}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Number</p> {patient.phoneNumber}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Email</p> {patient.email}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Gender</p> {patient.gender}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">DOB</p> {new Date(patient.dateOfBirth).toLocaleDateString()}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Age</p> {patient.age} Years
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Blood Group</p> {patient.bloodGroup}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Height (cm)</p> {patient.height}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Weight (Kg)</p> {patient.weight}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">Country</p> {patient.country}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">State</p> {patient.state}
              </div>
              <div className="font-semibold leading-5">
                <p className="text-gray-400">City</p> {patient.city}
              </div>
              <div className="col-span-2 font-semibold leading-5">
                <p className="text-gray-400">Address</p> {patient.address}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Documents, Prescriptions, Description */}
      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <TabList className="flex border-b-2 mb-4">
          <Tab className={`px-4 py-2 cursor-pointer outline-none ${activeTab === 0 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>All Documents</Tab>
          <Tab className={`px-4 py-2 cursor-pointer outline-none ${activeTab === 1 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>All Prescriptions</Tab>
          <Tab className={`px-4 py-2 cursor-pointer outline-none ${activeTab === 2 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>Description</Tab>
        </TabList>

        {/* Documents Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {files.length > 0 ? files.map((file, index) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <img src={`http://localhost:8000/${file.url}`} alt="Document" className="w-full h-48 object-cover mb-4" />
              </div>
            )) : (
              <div className="flex justify-center">
                <img src={noRecord} alt="No record found" className="w-48 h-48" />
              </div>
            )}
          </div>
        </TabPanel>

        {/* Prescriptions Tab */}
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

                <div className="overflow-x-auto mt-4">
                  <table className="w-full border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">Medicine Name</th>
                        <th className="p-2 border">Strength</th>
                        <th className="p-2 border">Dose</th>
                        <th className="p-2 border">Duration</th>
                        <th className="p-2 border">When to Take</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescription.medicines.map((medicine, idx) => (
                        <tr key={idx} className="text-center">
                          <td className="p-2 border">{medicine.name}</td>
                          <td className="p-2 border">{medicine.strength}</td>
                          <td className="p-2 border">{medicine.dose}</td>
                          <td className="p-2 border">{medicine.duration}</td>
                          <td className="p-2 border">{medicine.whenToTake}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4">
                  <h3 className="font-bold">Additional Note:</h3>
                  <p>{prescription.additionalNote}</p>
                </div>
              </div>
            )) : (
              <div className="flex justify-center">
                <img src={noRecord} alt="No record found" className="w-48 h-48" />
              </div>
            )}
          </div>
        </TabPanel>

        {/* Description Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {files.length > 0 ? files.map((file, index) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <p>{file.description}</p>
              </div>
            )) : (
              <div className="flex justify-center">
                <img src={noRecord} alt="No record found" className="w-48 h-48" />
              </div>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PrescriptionView;
import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import api from "../../api/api";
import medical from "../../assets/images/medical-certificate.png";
import prescription from "../../assets/images/prescription.png";
import patientImage from "../../assets/images/patient-image.png";

const PrescriptionView = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const patientId = "6706ee8fd4338cafbacd95ca"; // Example patient ID

  // Fetch Patient and Prescriptions
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await api.get(`/users/patients/${patientId}`);
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    const fetchPrescriptions = async () => {
      try {
        const response = await api.get('/prescription');
        setPrescriptions(response.data.prescriptions);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPatientData();
    fetchPrescriptions();
  }, [patientId]);

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
            <div>Patient Address: {patient.address}, {patient.city}, {patient.state}, {patient.country}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <TabList className="flex border-b-2 mb-4">
          <Tab className={`px-4 py-2 cursor-pointer outline-none ${activeTab === 0 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>
            All Documents
          </Tab>
          <Tab className={`px-4 py-2 cursor-pointer outline-none ${activeTab === 1 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}>
            All Prescriptions
          </Tab>
        </TabList>

        {/* All Documents */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {prescriptions.map((prescription, index) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <h3 className="text-gray-600">Prescription Date</h3>
                <p className="text-sm text-gray-500">{new Date(prescription.createdAt).toLocaleDateString()}</p>
                <img src={medical} alt="Medical Document" />
                <p className="text-sm text-gray-700 mt-2">{prescription.additionalNote}</p>
              </div>
            ))}
          </div>
        </TabPanel>

        {/* All Prescriptions */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {prescriptions.map((prescription, index) => (
              <div key={index} className="border p-4 rounded-lg shadow">
                <h3 className="text-gray-600">Prescription Date</h3>
                <p className="text-sm text-gray-500">{new Date(prescription.prescriptionDate).toLocaleDateString()}</p>
                <ul className="list-disc pl-5 text-sm text-gray-700 mt-2">
                  {prescription.medicines.map((med, idx) => (
                    <li key={idx}>{med.name} - {med.strength} - {med.dose} ({med.whenToTake}) for {med.duration}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PrescriptionView;

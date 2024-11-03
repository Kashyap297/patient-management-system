import React, { useState } from 'react';
import CreatePrescriptionForm from './CreatePrescriptionForm';
import PrescriptionPreview from './PrescriptionPreview';

const CreatePrescriptionPage = () => {
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null); // New state for appointmentId

  const handleFormUpdate = (data, id) => {
    setPrescriptionData(data);
    setAppointmentId(id); // Set appointment ID
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 bg-gray-100 min-h-full">
      {/* Left side: Prescription Form (60%) */}
      <div className="bg-white p-6 rounded-lg shadow-lg h-full">
        <CreatePrescriptionForm onFormUpdate={handleFormUpdate} />
      </div>

      {/* Right side: Prescription Preview (40%) */}
      <div className="bg-white p-6 rounded-lg shadow-lg h-full">
        <PrescriptionPreview prescriptionData={prescriptionData} appointmentId={appointmentId} />
      </div>
    </div>
  );
};

export default CreatePrescriptionPage;

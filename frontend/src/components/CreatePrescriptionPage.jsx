import React, { useState } from 'react';
import CreatePrescriptionForm from './CreatePrescriptionForm';
import PrescriptionPreview from './PrescriptionPreview';

const CreatePrescriptionPage = () => {
  const [prescriptionData, setPrescriptionData] = useState(null);

  const handleFormUpdate = (data) => {
    setPrescriptionData(data);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 bg-gray-100 ">
      {/* Left side: Prescription Form (60%) */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <CreatePrescriptionForm onFormUpdate={handleFormUpdate} />
      </div>

      {/* Right side: Prescription Preview (40%) */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <PrescriptionPreview prescriptionData={prescriptionData} />
      </div>
    </div>
  );
};

export default CreatePrescriptionPage;

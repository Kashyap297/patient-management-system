import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../api/api"; // Adjust the path according to your project structure

const CreatePrescriptionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    appointmentId: id,
    patientName: '',
    patientAge: '',
    patientGender: '',
    medicines: [
      { medicineName: '', strength: '', dose: '', duration: '', whenToTake: '', isEnabled: true },
      { medicineName: '', strength: '', dose: '', duration: '', whenToTake: '', isEnabled: false },
    ],
    additionalNote: '',
  });

  const doseOptions = ['1-1-1', '1-1-0', '1-0-1', '1-0-0', '0-1-1', '0-0-1'];
  const whenToTakeOptions = ['Before Food', 'After Food', 'With Food'];

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await api.get(`/appointments/${id}`);
        const appointment = response.data.data;

        setFormValues((prevValues) => ({
          ...prevValues,
          patientName: appointment.patientName,
          patientAge: appointment.patientAge,
          patientGender: appointment.patientGender,
        }));
      } catch (error) {
        console.error('Error fetching appointment details:', error);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...formValues.medicines];
    updatedMedicines[index][field] = value;
    setFormValues({ ...formValues, medicines: updatedMedicines });
  };

  const handleAddRow = (index) => {
    const updatedMedicines = [...formValues.medicines];
    updatedMedicines[index].isEnabled = true;

    // Add a new disabled row if it's the last row
    if (index === formValues.medicines.length - 1) {
      updatedMedicines.push({ medicineName: '', strength: '', dose: '', duration: '', whenToTake: '', isEnabled: false });
    }

    setFormValues({ ...formValues, medicines: updatedMedicines });
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = formValues.medicines.filter((_, i) => i !== index);
    setFormValues({ ...formValues, medicines: updatedMedicines });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        appointmentId: formValues.appointmentId,
        medicines: formValues.medicines.filter(med => med.isEnabled).map((med) => ({
          name: med.medicineName,
          strength: med.strength,
          dose: med.dose,
          duration: med.duration,
          whenToTake: med.whenToTake,
        })),
        additionalNote: formValues.additionalNote,
      };

      await api.post('/prescription', payload);
      await api.patch(`/appointments/${formValues.appointmentId}`, {
        status: 'Completed',
      });
      alert('Prescription created successfully and appointment marked as Completed');
      navigate(`/doctor/prescription-tools/create`);
    } catch (error) {
      console.error('Error creating prescription or updating appointment status:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Create Prescription</h2>

      {/* Patient Info */}
      <div className="grid grid-cols-3 gap-4">
        <div className="relative mb-2">
          <input
            type="text"
            name="patientName"
            value={formValues.patientName}
            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-50"
            placeholder=" "
            disabled
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
            Patient Name
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="number"
            name="patientAge"
            value={formValues.patientAge}
            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-50"
            placeholder=" "
            disabled
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
            Age
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            name="patientGender"
            value={formValues.patientGender}
            className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-50"
            placeholder=" "
            disabled
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
            Gender
          </label>
        </div>
      </div>

      {/* Medicines Table */}
      <h2 className="text-2xl font-semibold mb-4">Drug Prescription</h2>
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_auto] gap-4 text-sm font-semibold p-3 rounded-t-2xl bg-[#F6F8FB]">
        <div>Medicine Name</div>
        <div>Strength</div>
        <div>Dose</div>
        <div>Duration</div>
        <div>When to Take</div>
        <div></div>
      </div>
      {formValues.medicines.map((medicine, index) => (
        <div
          key={index}
          className={`grid grid-cols-[2fr_1fr_1fr_1fr_2fr_auto] gap-4 items-center mb-4 ${
            medicine.isEnabled ? 'bg-white' : 'bg-gray-100'
          }`}
        >
          <div className="relative">
            <input
              type="text"
              name={`medicineName`}
              value={medicine.medicineName}
              onChange={(e) => handleMedicineChange(index, 'medicineName', e.target.value)}
              className="peer w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Enter Medicine"
              disabled={!medicine.isEnabled}
            />
          </div>
          <div className="relative">
            <input
              type="text"
              name={`strength`}
              value={medicine.strength}
              onChange={(e) => handleMedicineChange(index, 'strength', e.target.value)}
              className="peer w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Strength"
              disabled={!medicine.isEnabled}
            />
          </div>
          <div className="relative">
            <select
              name="dose"
              value={medicine.dose}
              onChange={(e) => handleMedicineChange(index, 'dose', e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none"
              disabled={!medicine.isEnabled}
            >
              <option value="">Dose</option>
              {doseOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              name={`duration`}
              value={medicine.duration}
              onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
              className="peer w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Duration"
              disabled={!medicine.isEnabled}
            />
          </div>
          <div className="relative">
            <select
              name="whenToTake"
              value={medicine.whenToTake}
              onChange={(e) => handleMedicineChange(index, 'whenToTake', e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none"
              disabled={!medicine.isEnabled}
            >
              <option value="">When to take</option>
              {whenToTakeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <IconButton
            onClick={() => medicine.isEnabled ? handleRemoveMedicine(index) : handleAddRow(index)}
            className={medicine.isEnabled ? 'text-red-500' : 'text-green-500'}
          >
            {medicine.isEnabled ? <DeleteIcon /> : <AddIcon />}
          </IconButton>
        </div>
      ))}

      {/* Additional Note */}
      <div className="relative mb-6">
  <textarea
    name="additionalNote"
    className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 resize-none"
    placeholder=" "
    value={formValues.additionalNote}
    onChange={handleChange}
    rows="4"
  />
  <label
    htmlFor="additionalNote"
    className="absolute left-4 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-4"
  >
    Additional Note
  </label>
</div>


      {/* Submit Button */}
      <button type="submit" className="bg-blue-600 text-white rounded-md px-6 py-2">
        Submit
      </button>
    </form>
  );
};

export default CreatePrescriptionForm;

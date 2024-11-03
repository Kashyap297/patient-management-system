import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api/api"; // Adjust the path according to your project structure

const CreatePrescriptionForm = ({ onFormUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State to manage form values
  const [formValues, setFormValues] = useState({
    appointmentId: id,
    patientName: "",
    patientAge: "",
    patientGender: "",
    medicines: [
      { 
        medicineName: "",
        strength: "",
        dose: "",
        duration: "",
        whenToTake: "",
        isEnabled: true,
      },
      {
        medicineName: "",
        strength: "",
        dose: "",
        duration: "",
        whenToTake: "",
        isEnabled: false,
      },
    ],
    additionalNote: "",
  });

  // State to manage validation errors
  const [errors, setErrors] = useState({});

  const doseOptions = ["1-1-1", "1-1-0", "1-0-1", "1-0-0", "0-1-1", "0-0-1"];
  const whenToTakeOptions = ["Before Food", "After Food", "With Food"];

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
        console.error("Error fetching appointment details:", error);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  useEffect(() => {
    onFormUpdate(formValues, id);
  }, [formValues, onFormUpdate, id]);

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

    if (index === formValues.medicines.length - 1) {
      updatedMedicines.push({
        medicineName: "",
        strength: "",
        dose: "",
        duration: "",
        whenToTake: "",
        isEnabled: false,
      });
    }

    setFormValues({ ...formValues, medicines: updatedMedicines });
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = formValues.medicines.filter((_, i) => i !== index);
    setFormValues({ ...formValues, medicines: updatedMedicines });
  };

  // Validation function
  const validateForm = () => {
    let formErrors = {};
    if (!formValues.patientName) formErrors.patientName = "Patient name is required.";
    if (!formValues.patientAge || formValues.patientAge <= 0) formErrors.patientAge = "Valid age is required.";
    if (!formValues.patientGender) formErrors.patientGender = "Gender is required.";

    formValues.medicines.forEach((medicine, index) => {
      if (medicine.isEnabled) {
        if (!medicine.medicineName) formErrors[`medicineName${index}`] = "Medicine name is required.";
        if (!medicine.strength) formErrors[`strength${index}`] = "Strength is required.";
        if (!medicine.dose) formErrors[`dose${index}`] = "Dose is required.";
        if (!medicine.duration) formErrors[`duration${index}`] = "Duration is required.";
        if (!medicine.whenToTake) formErrors[`whenToTake${index}`] = "When to take is required.";
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  return (
    <form className="flex flex-col gap-6 bg-white w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold">Create Prescription</h2>

      {/* Patient Info */}
      <div className="grid grid-cols-3 gap-4">
        <div className="relative mb-2">
          <input
            type="text"
            name="patientName"
            value={formValues.patientName}
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none bg-gray-50"
            placeholder=" "
            disabled
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
            Patient Name
          </label>
          {errors.patientName && <p className="text-red-500 text-sm">{errors.patientName}</p>}
        </div>

        <div className="relative mb-2">
          <input
            type="number"
            name="patientAge"
            value={formValues.patientAge}
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none bg-gray-50"
            placeholder=" "
            disabled
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
            Age
          </label>
          {errors.patientAge && <p className="text-red-500 text-sm">{errors.patientAge}</p>}
        </div>

        <div className="relative mb-2">
          <input
            type="text"
            name="patientGender"
            value={formValues.patientGender}
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none bg-gray-50"
            placeholder=" "
            disabled
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
            Gender
          </label>
          {errors.patientGender && <p className="text-red-500 text-sm">{errors.patientGender}</p>}
        </div>
      </div>

      {/* Medicines Table */}
      <h2 className="text-3xl font-bold">Drug Prescription</h2>
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_auto] gap-4 text-sm font-semibold p-3 mt-0 rounded-t-2xl bg-[#F6F8FB]">
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
          className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_auto] gap-2 items-center mb-4"
        >
          <div className="relative">
            <input
              type="text"
              name={`medicineName${index}`}
              value={medicine.medicineName}
              onChange={(e) => handleMedicineChange(index, "medicineName", e.target.value)}
              className="peer w-full px-4 py-2 border rounded-xl focus:outline-none"
              placeholder="Enter Medicine"
              disabled={!medicine.isEnabled}
            />
            {errors[`medicineName${index}`] && <p className="text-red-500 text-sm">{errors[`medicineName${index}`]}</p>}
          </div>

          <div className="relative">
            <input
              type="text"
              name={`strength${index}`}
              value={medicine.strength}
              onChange={(e) => handleMedicineChange(index, "strength", e.target.value)}
              className="peer w-full px-4 py-2 border rounded-xl focus:outline-none"
              placeholder="Strength"
              disabled={!medicine.isEnabled}
            />
            {errors[`strength${index}`] && <p className="text-red-500 text-sm">{errors[`strength${index}`]}</p>}
          </div>

          <div className="relative">
            <select
              name={`dose${index}`}
              value={medicine.dose}
              onChange={(e) => handleMedicineChange(index, "dose", e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none"
              disabled={!medicine.isEnabled}
            >
              <option value="">Dose</option>
              {doseOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[`dose${index}`] && <p className="text-red-500 text-sm">{errors[`dose${index}`]}</p>}
          </div>

          <div className="relative">
            <input
              type="text"
              name={`duration${index}`}
              value={medicine.duration}
              onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
              className="peer w-full px-4 py-2 border rounded-xl focus:outline-none"
              placeholder="Duration"
              disabled={!medicine.isEnabled}
            />
            {errors[`duration${index}`] && <p className="text-red-500 text-sm">{errors[`duration${index}`]}</p>}
          </div>

          <div className="relative">
            <select
              name={`whenToTake${index}`}
              value={medicine.whenToTake}
              onChange={(e) => handleMedicineChange(index, "whenToTake", e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none"
              disabled={!medicine.isEnabled}
            >
              <option value="">When to take</option>
              {whenToTakeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[`whenToTake${index}`] && <p className="text-red-500 text-sm">{errors[`whenToTake${index}`]}</p>}
          </div>

          <IconButton
            onClick={() => (medicine.isEnabled ? handleRemoveMedicine(index) : handleAddRow(index))}
            className={medicine.isEnabled ? "text-red-500" : "text-green-500"}
          >
            {medicine.isEnabled ? <DeleteIcon /> : <AddIcon />}
          </IconButton>
        </div>
      ))}

      {/* Additional Note at the Bottom */}
      <div className="relative mb-6">
        <textarea
          name="additionalNote"
          className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 resize-none"
          placeholder=" "
          value={formValues.additionalNote}
          onChange={handleChange}
          rows="2"
        />
        <label
          htmlFor="additionalNote"
          className="absolute left-4 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-4"
        >
          Additional Note
        </label>
      </div>

      {/* Submit Button */}
      {/* <button
        type="submit"
        className="bg-blue-600 text-white rounded-md px-6 py-2"
      >
        Submit
      </button> */}
    </form>
  );
};

export default CreatePrescriptionForm;

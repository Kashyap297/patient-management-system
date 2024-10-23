import { useState, useEffect } from 'react';
import { TextField, Button, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldArray, Formik, Form } from 'formik';
import * as Yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../api/api"; // Adjust the path according to your project structure

const CreatePrescriptionForm = () => {
  const { id } = useParams(); // Get the appointment ID from route params
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    appointmentId: id,
    patientName: '',
    patientAge: '',
    patientGender: '',
    medicines: [{ medicineName: '', strength: '', dose: '', duration: '', whenToTake: '' }],
    additionalNote: '',
  });

  const doseOptions = ['1-1-1', '1-1-0', '1-0-1', '1-0-0', '0-1-1', '0-0-1'];
  const whenToTakeOptions = ['Before Food', 'After Food', 'With Food'];

  // Fetch the appointment data to pre-fill the patient details
  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await api.get(`/appointments/${id}`);
        const appointment = response.data.data;

        setInitialValues({
          appointmentId: id,
          patientName: appointment.patientName,
          patientAge: appointment.patientAge,
          patientGender: appointment.patientGender,
          medicines: [{ medicineName: '', strength: '', dose: '', duration: '', whenToTake: '' }],
          additionalNote: '',
        });
      } catch (error) {
        console.error('Error fetching appointment details:', error);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  const validationSchema = Yup.object().shape({
    medicines: Yup.array().of(
      Yup.object().shape({
        medicineName: Yup.string().required('Required'),
        strength: Yup.string().required('Required'),
        dose: Yup.string().required('Required'),
        duration: Yup.string().required('Required'),
        whenToTake: Yup.string().required('Required'),
      })
    ),
    additionalNote: Yup.string(),
  });

  const handleSubmit = async (values) => {
    try {
      const payload = {
        appointmentId: values.appointmentId,
        medicines: values.medicines.map((med) => ({
          name: med.medicineName,
          strength: med.strength,
          dose: med.dose,
          duration: med.duration,
          whenToTake: med.whenToTake,
        })),
        additionalNote: values.additionalNote,
      };

      // Step 1: Create the prescription
      const response = await api.post('/prescription', payload);
      console.log('Prescription created successfully:', response.data);

      // Step 2: Update the appointment status to "Completed"
      await api.patch(`/appointments/${values.appointmentId}`, {
        status: 'Completed',
      });
      alert('Prescription created successfully and appointment marked as Completed');

      // Navigate back after successful submission
      navigate(`/doctor/prescription-tools/create`);
    } catch (error) {
      console.error('Error creating prescription or updating appointment status:', error);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form className="flex flex-col gap-6 p-8 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Create Prescription</h2>
          
          {/* Patient Info */}
          <div className="grid grid-cols-3 gap-4">
            <TextField
              label="Patient Name"
              name="patientName"
              value={values.patientName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.patientName && Boolean(errors.patientName)}
              helperText={touched.patientName && errors.patientName}
              fullWidth
              disabled
              className="bg-gray-50"
            />
            <TextField
              label="Age"
              name="patientAge"
              type="number"
              value={values.patientAge}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.patientAge && Boolean(errors.patientAge)}
              helperText={touched.patientAge && errors.patientAge}
              fullWidth
              disabled
              className="bg-gray-50"
            />
            <TextField
              label="Gender"
              name="patientGender"
              value={values.patientGender}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.patientGender && Boolean(errors.patientGender)}
              helperText={touched.patientGender && errors.patientGender}
              fullWidth
              disabled
              className="bg-gray-50"
            />
          </div>

          {/* Medicines Table */}
          <h2 className="text-2xl font-semibold mb-4">Drug Prescription</h2>
          <FieldArray name="medicines">
            {({ push, remove }) => (
              <>
                <div className="grid grid-cols-6 gap-4 text-sm font-semibold mb-2">
                  <div>Medicine Name</div>
                  <div>Strength</div>
                  <div>Dose</div>
                  <div>Duration</div>
                  <div>When to Take</div>
                  <div></div>
                </div>
                {values.medicines.map((medicine, index) => (
                  <div key={index} className="grid grid-cols-6 gap-4 mb-4">
                    <TextField
                      label="Medicine Name"
                      name={`medicines[${index}].medicineName`}
                      value={medicine.medicineName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                    />
                    <TextField
                      label="Strength"
                      name={`medicines[${index}].strength`}
                      value={medicine.strength}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                    />
                    <FormControl fullWidth>
                      <InputLabel>Dose</InputLabel>
                      <Select
                        name={`medicines[${index}].dose`}
                        value={medicine.dose}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {doseOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label="Duration"
                      name={`medicines[${index}].duration`}
                      value={medicine.duration}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                    />
                    <FormControl fullWidth>
                      <InputLabel>When to Take</InputLabel>
                      <Select
                        name={`medicines[${index}].whenToTake`}
                        value={medicine.whenToTake}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {whenToTakeOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <IconButton onClick={() => remove(index)} className="text-red-500">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
                <Button
                  variant="contained"
                  onClick={() =>
                    push({ medicineName: '', strength: '', dose: '', duration: '', whenToTake: '' })
                  }
                  className="bg-blue-500 text-white"
                >
                  Add Medicine
                </Button>
              </>
            )}
          </FieldArray>

          {/* Additional Note */}
          <TextField
            label="Additional Note"
            name="additionalNote"
            value={values.additionalNote}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            multiline
            rows={4}
            className="mt-6 bg-gray-50"
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" className="mt-6 bg-blue-500 text-white">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePrescriptionForm;

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

      const response = await api.post('/prescription', payload);
      alert('Prescription created successfully')
      console.log('Prescription created successfully:', response.data);
      navigate(`/doctor/prescription-tools/create`)
    } catch (error) {
      console.error('Error creating prescription:', error);
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
        <Form>
          <div className="flex flex-col gap-8 p-8 bg-white min-h-screen shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Create Prescription</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
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
              />
            </div>

            {/* Medicines Table */}
            <h2 className="text-xl font-bold mb-4">Drug Prescription</h2>
            <FieldArray name="medicines">
              {({ push, remove }) => (
                <>
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
                      <IconButton
                        onClick={() => remove(index)}
                        className="text-red-500"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button variant="contained" onClick={() => push({ medicineName: '', strength: '', dose: '', duration: '', whenToTake: '' })}>
                    Add Medicine
                  </Button>
                </>
              )}
            </FieldArray>

            <TextField
              label="Additional Note"
              name="additionalNote"
              value={values.additionalNote}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              multiline
              rows={4}
              className="mt-6"
            />

            <Button type="submit" variant="contained" color="primary" className="mt-6">
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePrescriptionForm;

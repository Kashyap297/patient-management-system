import { useState } from 'react';
import { TextField, Button, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FieldArray, Formik, Form } from 'formik';
import * as Yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';

const CreatePrescriptionForm = () => {
  const { id } = useParams(); // Get the patient ID from route params
  const [prescriptionData, setPrescriptionData] = useState([]);

  const doseOptions = ['1-1-1', '1-1-0', '1-0-1', '1-0-0', '0-1-1', '0-0-1'];

  // When to take options
  const whenToTakeOptions = ['Before Food', 'After Food', 'With Food'];

  // Initial values for formik
  const initialValues = {
    patientName: 'Marcus Philips',
    age: 22,
    gender: 'Male',
    medicines: [
      {
        medicineName: '',
        strength: '',
        dose: '',
        duration: '',
        whenToTake: '',
      },
    ],
    additionalNote: '',
  };

  // Validation schema for formik with Yup
  const validationSchema = Yup.object().shape({
    patientName: Yup.string().required('Required'),
    age: Yup.number().required('Required').positive('Must be positive').integer('Must be an integer'),
    gender: Yup.string().required('Required'),
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setPrescriptionData(values);
        console.log(values);
      }}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form>
          <div className="flex gap-8 p-8 bg-white min-h-screen shadow-lg rounded-lg">
            {/* Left Side - Form */}
            <div className="flex-1">
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
                  name="age"
                  type="number"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.age && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Gender"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.gender && Boolean(errors.gender)}
                  helperText={touched.gender && errors.gender}
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
                          error={
                            touched.medicines?.[index]?.medicineName && Boolean(errors.medicines?.[index]?.medicineName)
                          }
                          helperText={touched.medicines?.[index]?.medicineName && errors.medicines?.[index]?.medicineName}
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
                          <InputLabel id={`dose-label-${index}`}>Dose</InputLabel>
                          <Select
                            labelId={`dose-label-${index}`}
                            name={`medicines[${index}].dose`}
                            value={medicine.dose}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Dose"
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
                          <InputLabel id={`whenToTake-label-${index}`}>When to Take</InputLabel>
                          <Select
                            labelId={`whenToTake-label-${index}`}
                            name={`medicines[${index}].whenToTake`}
                            value={medicine.whenToTake}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="When to Take"
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

              {/* Additional Notes */}
              <TextField
                label="Additional Note"
                name="additionalNote"
                value={values.additionalNote}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                multiline
                rows={4}
                className="!mt-6"
              />

              <Button type="submit" variant="contained" color="primary" className="!mt-6">
                Submit
              </Button>
            </div>

            {/* Right Side - Prescription Preview */}
            {/* <div className="w-96 border-l pl-8">
              <h2 className="text-xl font-bold mb-4">Prescription Preview</h2>
              <div className="border p-4 rounded-lg">
                <p>Hospital Name: Medical Center</p>
                <p>Doctor: Dr. Bharat Patel</p>
                <p>Patient Name: {values.patientName}</p>
                <p>Age: {values.age} Years</p>
                <p>Gender: {values.gender}</p>
                <table className="w-full mt-4 border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2">Medicine Name</th>
                      <th className="border p-2">Strength</th>
                      <th className="border p-2">Dose</th>
                      <th className="border p-2">Duration</th>
                      <th className="border p-2">When to Take</th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.medicines.map((medicine, index) => (
                      <tr key={index}>
                        <td className="border p-2">{medicine.medicineName}</td>
                        <td className="border p-2">{medicine.strength}</td>
                        <td className="border p-2">{medicine.dose}</td>
                        <td className="border p-2">{medicine.duration}</td>
                        <td className="border p-2">{medicine.whenToTake}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h3 className="mt-4 font-bold">Additional Note:</h3>
                <p>{values.additionalNote}</p>
              </div>
            </div> */}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePrescriptionForm;

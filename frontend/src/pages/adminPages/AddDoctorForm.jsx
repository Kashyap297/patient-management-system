import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, TextField, MenuItem, IconButton } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  doctorName: Yup.string().required("Doctor Name is required"),
  qualification: Yup.string().required("Qualification is required"),
  gender: Yup.string().required("Gender is required"),
  specialty: Yup.string().required("Specialty is required"),
  checkupTime: Yup.string().required("Checkup Time is required"),
  workingTime: Yup.string().required("Working Time is required"),
  breakTime: Yup.string().required("Break Time is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  onlineRate: Yup.number().required("Online Consultation Rate is required"),
  zipCode: Yup.string().required("Zip Code is required"),
  doctorAddress: Yup.string().required("Doctor Address is required"),
  description: Yup.string().required("Description is required"),
  currentHospital: Yup.string().required("Current Hospital is required"),
  hospitalName: Yup.string().required("Hospital Name is required"),
  hospitalAddress: Yup.string().required("Hospital Address is required"),
  emergencyContact: Yup.string().required(
    "Emergency Contact Number is required"
  ),
});

const AddDoctorForm = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [signature, setSignature] = useState(null);

  const handlePhotoUpload = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSignatureUpload = (e) => {
    setSignature(e.target.files[0]);
  };

  const handleSubmit = (values) => {
    console.log("Form Data", values);
    // Implement form submission logic
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md m-6">
      <h2 className="text-xl font-semibold mb-6">Add New Doctor</h2>
      <Formik
        initialValues={{
          doctorName: "",
          qualification: "",
          gender: "",
          specialty: "",
          checkupTime: "",
          workingTime: "",
          breakTime: "",
          email: "",
          phoneNumber: "",
          country: "",
          state: "",
          city: "",
          onlineRate: "",
          zipCode: "",
          doctorAddress: "",
          description: "",
          currentHospital: "",
          hospitalName: "",
          hospitalAddress: "",
          websiteLink: "",
          emergencyContact: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className="grid grid-cols-4 gap-6">
            {/* Profile Section */}
            <div className="col-span-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center">
                <input
                  accept="image/*"
                  type="file"
                  onChange={handlePhotoUpload}
                  id="profile-upload"
                  hidden
                />
                <label htmlFor="profile-upload">
                  <div className="cursor-pointer text-center mb-4">
                    <img
                      src={
                        profilePhoto
                          ? URL.createObjectURL(profilePhoto)
                          : "/placeholder.jpg"
                      }
                      alt="Profile"
                      className="rounded-full w-28 h-28 mb-2"
                    />
                    <Button component="span" color="primary">
                      Choose Photo
                    </Button>
                  </div>
                </label>
              </div>

              <div className="w-full flex flex-col items-center border p-4 rounded-lg mb-6">
                <input
                  accept=".png,.jpg,.jpeg"
                  type="file"
                  onChange={handleSignatureUpload}
                  id="signature-upload"
                  hidden
                />
                <label htmlFor="signature-upload">
                  <div className="cursor-pointer text-center">
                    {signature ? signature.name : "Upload Signature"}
                    <IconButton component="span" color="primary">
                      <UploadFile />
                    </IconButton>
                  </div>
                </label>
              </div>
            </div>

            {/* Doctor Information Section */}
            <div className="col-span-3 grid grid-cols-3 gap-4">
              <div>
                <Field
                  name="doctorName"
                  as={TextField}
                  label="Doctor Name"
                  fullWidth
                />
                <ErrorMessage
                  name="doctorName"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field
                  name="qualification"
                  as={TextField}
                  label="Doctor Qualification"
                  fullWidth
                />
                <ErrorMessage
                  name="qualification"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field
                  name="gender"
                  as={TextField}
                  select
                  label="Gender"
                  fullWidth
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field
                  name="specialty"
                  as={TextField}
                  label="Specialty Type"
                  fullWidth
                />
                <ErrorMessage
                  name="specialty"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field
                  name="checkupTime"
                  as={TextField}
                  label="Checkup Time"
                  fullWidth
                />
                <ErrorMessage
                  name="checkupTime"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field
                  name="workingTime"
                  as={TextField}
                  label="Working Time"
                  fullWidth
                />
                <ErrorMessage
                  name="workingTime"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field
                  name="breakTime"
                  as={TextField}
                  label="Break Time"
                  fullWidth
                />
                <ErrorMessage
                  name="breakTime"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field
                  name="email"
                  as={TextField}
                  label="Doctor Email"
                  fullWidth
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field
                  name="phoneNumber"
                  as={TextField}
                  label="Phone Number"
                  fullWidth
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field
                  name="country"
                  as={TextField}
                  label="Country"
                  fullWidth
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field name="state" as={TextField} label="State" fullWidth />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field name="city" as={TextField} label="City" fullWidth />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field
                  name="onlineRate"
                  as={TextField}
                  label="Online Consultation Rate"
                  type="number"
                  placeholder="₹ 0000"
                  fullWidth
                />
                <ErrorMessage
                  name="onlineRate"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field
                  name="zipCode"
                  as={TextField}
                  label="Zip Code"
                  fullWidth
                />
                <ErrorMessage
                  name="zipCode"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field
                  name="doctorAddress"
                  as={TextField}
                  label="Doctor Address"
                  fullWidth
                />
                <ErrorMessage
                  name="doctorAddress"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <Field
                  name="description"
                  as={TextField}
                  label="Description"
                  fullWidth
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              {/* Hospital Details - Next Line */}
              <div className="col-span-3 grid grid-cols-3 gap-4 mt-6">
                <div>
                  <Field
                    name="currentHospital"
                    as={TextField}
                    label="Doctor Current Hospital"
                    fullWidth
                  />
                </div>

                <div>
                  <Field
                    name="hospitalName"
                    as={TextField}
                    label="Hospital Name"
                    fullWidth
                  />
                </div>

                <div>
                  <Field
                    name="hospitalAddress"
                    as={TextField}
                    label="Hospital Address"
                    fullWidth
                  />
                </div>

                <div>
                  <Field
                    name="websiteLink"
                    as={TextField}
                    label="Hospital Website Link"
                    fullWidth
                  />
                </div>

                <div>
                  <Field
                    name="emergencyContact"
                    as={TextField}
                    label="Emergency Contact Number"
                    fullWidth
                  />
                </div>
              </div>
            </div>

            <div className="col-span-4 flex justify-end mt-6">
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDoctorForm;

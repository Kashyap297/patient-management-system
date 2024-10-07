import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, MenuItem } from "@mui/material";

// Sample data (you would normally get this from an API)
const sampleDoctorData = {
  1: {
    name: "Dr. Marcus Philips",
    gender: "Male",
    qualification: "MBBS",
    specialty: "Internal Medicine",
    workingTime: "6 Hour",
    checkupTime: "4 Hour",
    breakTime: "1 Hour",
    phoneNumber: "9876543210",
    country: "India",
    city: "Gujarat",
    zipCode: "382200",
    onlineConsultationRate: "1000",
    description: "Specialist in Internal Medicine",
  },
  2: {
    name: "Dr. Haylie Schleifer",
    gender: "Female",
    qualification: "BDS",
    specialty: "Anesthesiology",
    workingTime: "5 Hour",
    checkupTime: "4 Hour",
    breakTime: "2 Hour",
    phoneNumber: "9876543211",
    country: "India",
    city: "Delhi",
    zipCode: "110001",
    onlineConsultationRate: "1200",
    description: "Anesthesiology specialist",
  },
  3: {
    name: "Dr. Haylie Schleifer",
    gender: "Female",
    qualification: "BDS",
    specialty: "Anesthesiology",
    workingTime: "5 Hour",
    checkupTime: "4 Hour",
    breakTime: "2 Hour",
    phoneNumber: "9876543211",
    country: "India",
    city: "Delhi",
    zipCode: "110001",
    onlineConsultationRate: "1200",
    description: "Anesthesiology specialist",
  },
  // Add more sample data as needed
};

// Validation schema for the form
const validationSchema = yup.object({
  name: yup.string().required("Doctor Name is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  qualification: yup.string().required("Qualification is required"),
  specialty: yup.string().required("Specialty is required"),
  workingTime: yup.string().required("Working Time is required"),
  onlineConsultationRate: yup
    .number()
    .required("Online Consultation Rate is required"),
});

const EditDoctor = ({ isViewOnly = false }) => {
  const { id } = useParams(); // Get the doctor ID from the URL
  const navigate = useNavigate();

  // Fetch the doctor's details based on ID (this would normally come from an API)
  const doctorDetails = sampleDoctorData[id] || {};

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      name: doctorDetails.name || "",
      gender: doctorDetails.gender || "",
      qualification: doctorDetails.qualification || "",
      specialty: doctorDetails.specialty || "",
      workingTime: doctorDetails.workingTime || "",
      checkupTime: doctorDetails.checkupTime || "",
      breakTime: doctorDetails.breakTime || "",
      phoneNumber: doctorDetails.phoneNumber || "",
      country: doctorDetails.country || "",
      city: doctorDetails.city || "",
      zipCode: doctorDetails.zipCode || "",
      onlineConsultationRate: doctorDetails.onlineConsultationRate || "",
      description: doctorDetails.description || "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form data", values);
      navigate("/doctor-management"); // Redirect after saving
    },
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <h2 className="text-lg font-semibold mb-4">
        {isViewOnly ? "View Doctor Details" : "Edit Doctor Details"}
      </h2>

      <form onSubmit={formik.handleSubmit}>
        {/* Doctor details form */}
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Doctor Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            disabled={isViewOnly}
          />
          <TextField
            select
            label="Gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
            fullWidth
            disabled={isViewOnly}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            label="Qualification"
            name="qualification"
            value={formik.values.qualification}
            onChange={formik.handleChange}
            error={
              formik.touched.qualification &&
              Boolean(formik.errors.qualification)
            }
            helperText={
              formik.touched.qualification && formik.errors.qualification
            }
            fullWidth
            disabled={isViewOnly}
          />
          <TextField
            label="Specialty"
            name="specialty"
            value={formik.values.specialty}
            onChange={formik.handleChange}
            error={formik.touched.specialty && Boolean(formik.errors.specialty)}
            helperText={formik.touched.specialty && formik.errors.specialty}
            fullWidth
            disabled={isViewOnly}
          />
          <TextField
            label="Working Time"
            name="workingTime"
            value={formik.values.workingTime}
            onChange={formik.handleChange}
            error={
              formik.touched.workingTime && Boolean(formik.errors.workingTime)
            }
            helperText={formik.touched.workingTime && formik.errors.workingTime}
            fullWidth
            disabled={isViewOnly}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            fullWidth
            disabled={isViewOnly}
          />
          <TextField
            label="City"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            fullWidth
            disabled={isViewOnly}
          />
          <TextField
            label="Zip Code"
            name="zipCode"
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
            helperText={formik.touched.zipCode && formik.errors.zipCode}
            fullWidth
            disabled={isViewOnly}
          />
          <TextField
            label="Online Consultation Rate"
            name="onlineConsultationRate"
            type="number"
            value={formik.values.onlineConsultationRate}
            onChange={formik.handleChange}
            error={
              formik.touched.onlineConsultationRate &&
              Boolean(formik.errors.onlineConsultationRate)
            }
            helperText={
              formik.touched.onlineConsultationRate &&
              formik.errors.onlineConsultationRate
            }
            fullWidth
            disabled={isViewOnly}
          />
          <TextField
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            fullWidth
            multiline
            rows={4}
            disabled={isViewOnly}
          />
        </div>

        {/* Buttons */}
        {!isViewOnly && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="!mt-4"
          >
            Save Changes
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          className="!mt-4 !ml-2"
          onClick={() => navigate("/doctor-management")}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default EditDoctor;

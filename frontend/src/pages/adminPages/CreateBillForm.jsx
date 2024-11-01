import { useEffect, useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import api from "../../api/api"; // Assuming your API utility is setup
import selectImage from "../../assets/images/select-image.png"; // Placeholder image path
import AddFieldModal from "../../components/modals/AddFieldModal";
import { Delete } from "@mui/icons-material";

const CreateBill = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [hospitalFields, setHospitalFields] = useState([]);
  const [patientFields, setPatientFields] = useState([]);
  const [isHospitalModalOpen, setIsHospitalModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);

  const [hospitals, setHospitals] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formValues, setFormValues] = useState({
    hospitalId: "",
    hospitalName: "",
    hospitalAddress: "",
    otherText: "",
    billDate: "",
    billTime: "",
    billNumber: "",
    phoneNumber: "",
    email: "",
    address: "",
    patientId: "",
    patientName: "",
    patientPhoneNumber: "",
    patientEmail: "",
    diseaseName: "",
    doctorName: "",
    description: "",
    amount: "",
    tax: "",
    doctorId: "", // New field for doctorId
    discount: "",
    totalAmount: "",
    paymentType: "Cash",
    gender: "Male",
    age: "",
    insuranceCompany: "",
    insurancePlan: "",
    claimAmount: "",
    claimedAmount: "",
    status: "Unpaid",
  });

  // Fetch hospitals from API
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await api.get("/hospitals");
        setHospitals(response.data.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    fetchHospitals();
  }, []);

 // Calculate total amount whenever amount, tax, or discount changes
 useEffect(() => {
  if (formValues.amount && formValues.tax && formValues.discount !== null) {
    const amount = parseFloat(formValues.amount);
    const tax = parseFloat(formValues.tax);
    const discount = parseFloat(formValues.discount);

    // Calculate total amount
    const calculatedTotal = amount + (amount * (tax / 100)) - discount;

    // Round off total amount to two decimal places
    setFormValues((prevValues) => ({
      ...prevValues,
      totalAmount: calculatedTotal.toFixed(2),
    }));
  }
}, [formValues.amount, formValues.tax, formValues.discount]);

  // Fetch patients from API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/users/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/users/doctors");
        setDoctors(response.data); // Set doctor data
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle hospital selection
  const handleHospitalSelect = (e) => {
    const selectedHospital = hospitals.find(
      (hospital) => hospital._id === e.target.value
    );
    setFormValues({
      ...formValues,
      hospitalId: selectedHospital._id,
      hospitalName: selectedHospital.name,
      hospitalAddress: selectedHospital.address, // auto-fill address
    });
  };

  // Handle patient selection
  const handlePatientSelect = (e) => {
    const selectedPatient = patients.find(
      (patient) => patient._id === e.target.value
    );
    setFormValues({
      ...formValues,
      patientId: selectedPatient._id,
      patientName: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
      patientPhoneNumber: selectedPatient.phoneNumber, // auto-fill phone
      patientEmail: selectedPatient.email, // auto-fill email
      age: selectedPatient.age, // auto-fill age
      gender: selectedPatient.gender, // auto-fill gender
      address: selectedPatient.address, // auto-fill address
    });
  };

  // Handle doctor selection
  const handleDoctorSelect = (e) => {
    const selectedDoctor = doctors.find(
      (doctor) => doctor._id === e.target.value
    );
    setFormValues({
      ...formValues,
      doctorId: selectedDoctor._id,
      doctorName: `${selectedDoctor.firstName} ${selectedDoctor.lastName}`,
      // Add other details if needed from doctor object
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("hospital", formValues.hospitalId); // Correct key for hospital ID
      formData.append("patient", formValues.patientId); // Correct key for patient ID
      formData.append("doctor", formValues.doctorId); // Correct key for doctor ID
      // Append other form values
      Object.keys(formValues).forEach((key) => {
        if (key !== "hospitalId" && key !== "patientId" && key !== "doctorId") {
          // Skip these as we added them above
          formData.append(key, formValues[key]);
        }
      });
      if (selectedFile) {
        formData.append("logo", selectedFile);
      }

      const response = await api.post("/invoice", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Invoice created successfully:", response.data);
      alert("Invoice created successfully!");

      // Reset form values after submission
      setFormValues({
        hospitalId: "",
        patientId: "",
        doctorId: "",
        // Reset other form values as before
        hospitalName: "",
        hospitalAddress: "",
        otherText: "",
        billDate: "",
        billTime: "",
        billNumber: "",
        phoneNumber: "",
        email: "",
        address: "",
        patientName: "",
        patientPhoneNumber: "",
        patientEmail: "",
        diseaseName: "",
        doctorName: "",
        description: "",
        amount: "",
        tax: "",
        discount: "",
        totalAmount: "",
        paymentType: "Cash",
        gender: "Male",
        age: "",
        insuranceCompany: "",
        insurancePlan: "",
        claimAmount: "",
        claimedAmount: "",
        status: "Unpaid",
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Error creating invoice. Please try again.");
    }
  };

  // Add field functions
  const handleAddHospitalField = (field) => {
    setHospitalFields([...hospitalFields, field]);
  };

  const handleAddPatientField = (field) => {
    setPatientFields([...patientFields, field]);
  };

  const handleRemoveHospitalField = (index) => {
    setHospitalFields(hospitalFields.filter((_, i) => i !== index));
  };

  const handleRemovePatientField = (index) => {
    setPatientFields(patientFields.filter((_, i) => i !== index));
  };

  console.log("Hospital ID:", formValues.hospitalId);
  console.log("Patient ID:", formValues.patientId);
  console.log("Doctor ID:", formValues.doctorId);

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Create Bill</h1>

        <h2 className="text-lg font-semibold mb-4">Hospital Details</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="upload-logo"
                onChange={handleFileChange}
              />
              <label htmlFor="upload-logo">
                <div>
                  <img
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : selectImage
                    }
                    alt="Hospital Logo"
                    style={{ width: "200px", marginBottom: "8px" }}
                  />
                  <div>
                    {selectedFile
                      ? selectedFile.name
                      : "Upload a file or drag and drop"}
                  </div>
                </div>
                <Button variant="outlined" component="span">
                  Upload Logo
                </Button>
              </label>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Hospital</InputLabel>
              <Select
                name="hospitalId"
                value={formValues.hospitalId}
                onChange={handleHospitalSelect}
              >
                {hospitals.map((hospital) => (
                  <MenuItem key={hospital._id} value={hospital._id}>
                    {hospital.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Other Text"
              name="otherText"
              value={formValues.otherText}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Bill Date"
              name="billDate"
              type="date"
              value={formValues.billDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Bill Time"
              name="billTime"
              type="time"
              value={formValues.billTime}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Bill Number"
              name="billNumber"
              value={formValues.billNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Hospital Address"
              name="hospitalAddress"
              value={formValues.hospitalAddress}
              onChange={handleInputChange}
              disabled
            />
          </Grid>
          {hospitalFields.map((field, index) => (
            <Grid item xs={12} md={4} key={index}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {field.type === "Dropdown" ? (
                  <FormControl fullWidth>
                    <InputLabel>{field.label || "Select"}</InputLabel>
                    <Select>
                      {field.options.map((option, idx) => (
                        <MenuItem key={idx} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField fullWidth label={field.label || "Text Field"} />
                )}
                <IconButton
                  color="error"
                  onClick={() => handleRemoveHospitalField(index)}
                >
                  <Delete />
                </IconButton>
              </div>
            </Grid>
          ))}

          <Button
            className="!ml-4"
            variant="outlined"
            onClick={() => setIsHospitalModalOpen(true)}
            style={{ marginTop: "16px" }}
          >
            + Add New Field (Hospital)
          </Button>
        </Grid>

        <h2 className="text-lg font-semibold mt-6 mb-4">Patient Details</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Patient</InputLabel>
              <Select
                name="patientId"
                value={formValues.patientId}
                onChange={handlePatientSelect}
              >
                {patients.map((patient) => (
                  <MenuItem key={patient._id} value={patient._id}>
                    {patient.firstName} {patient.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Disease Name"
              name="diseaseName"
              value={formValues.diseaseName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Doctor</InputLabel>
              <Select
                name="doctorId"
                value={formValues.doctorId}
                onChange={handleDoctorSelect}
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor._id} value={doctor._id}>
                    {doctor.firstName} {doctor.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              type="number"
              value={formValues.amount}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Tax (%)"
              name="tax"
              type="number"
              value={formValues.tax}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Discount"
              name="discount"
              type="number"
              value={formValues.discount}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Total Amount"
              name="totalAmount"
              value={formValues.totalAmount}
              onChange={handleInputChange}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Payment Type</InputLabel>
              <Select
                name="paymentType"
                value={formValues.paymentType}
                onChange={handleInputChange}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Insurance">Insurance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formValues.gender}
                onChange={handleInputChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              value={formValues.age}
              onChange={handleInputChange}
            />
          </Grid>
          {/* Additional dynamic patient fields */}
          {patientFields.map((field, index) => (
            <Grid item xs={12} md={4} key={index}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {field.type === "Dropdown" ? (
                  <FormControl fullWidth>
                    <InputLabel>{field.label || "Select"}</InputLabel>
                    <Select>
                      {field.options.map((option, idx) => (
                        <MenuItem key={idx} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField fullWidth label={field.label || "Text Field"} />
                )}
                <IconButton
                  color="error"
                  onClick={() => handleRemovePatientField(index)}
                >
                  <Delete />
                </IconButton>
              </div>
            </Grid>
          ))}

          <Button
            className="!ml-4"
            variant="outlined"
            onClick={() => setIsPatientModalOpen(true)}
            style={{ marginTop: "16px" }}
          >
            + Add New Field (Patient)
          </Button>

          {formValues.paymentType === "Insurance" && (
            <>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Insurance Company"
                  name="insuranceCompany"
                  value={formValues.insuranceCompany}
                  onChange={handleInputChange}
                  required={formValues.paymentType === "Insurance"}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Insurance Plan"
                  name="insurancePlan"
                  value={formValues.insurancePlan}
                  onChange={handleInputChange}
                  required={formValues.paymentType === "Insurance"}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Claim Amount"
                  name="claimAmount"
                  value={formValues.claimAmount}
                  onChange={handleInputChange}
                  required={formValues.paymentType === "Insurance"}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Claimed Amount"
                  name="claimedAmount"
                  value={formValues.claimedAmount}
                  onChange={handleInputChange}
                  required={formValues.paymentType === "Insurance"}
                />
              </Grid>
            </>
          )}
        </Grid>
        {/* Add Field Modals */}
        <AddFieldModal
          open={isHospitalModalOpen}
          handleClose={() => setIsHospitalModalOpen(false)}
          handleAddField={handleAddHospitalField}
        />
        <AddFieldModal
          open={isPatientModalOpen}
          handleClose={() => setIsPatientModalOpen(false)}
          handleAddField={handleAddPatientField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "24px" }}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default CreateBill;

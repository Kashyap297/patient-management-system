import { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import selectImage from "../../assets/images/select-image.png"; // Placeholder image path
import AddFieldModal from "../../components/modals/AddFieldModal";

const EditInvoice = () => {
  const [hospitalFields, setHospitalFields] = useState([]);
  const [patientFields, setPatientFields] = useState([]);
  const [isHospitalModalOpen, setIsHospitalModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formValues, setFormValues] = useState({
    hospitalName: "Silver Medical Center",
    otherText: "Lorem ipsum dolor sit amet, consectetur",
    billDate: "2 Jan, 2022",
    billTime: "12:19 PM",
    billNumber: "102",
    phoneNumber: "99130 23830",
    email: "slivermedical@gmail.com",
    address: "501, Shamruddh Avenyu",
    patientName: "Jenny Wilson",
    diseaseName: "Meningococcal Disease",
    doctorName: "Dr. Marcus Philips",
    discount: "10%",
    tax: "₹ 256",
    amount: "₹ 2,520",
    totalAmount: "₹ 2,520",
    patientAddress: "501, Shamruddh Avenyu",
    gender: "Male",
    paymentType: "Online",
  });

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAddHospitalField = (field) => {
    setHospitalFields([...hospitalFields, field]);
  };

  const handleAddPatientField = (field) => {
    setPatientFields([...patientFields, field]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formValues, {
      hospitalFields,
      patientFields,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold mb-6">Edit Invoice Design</h1>
          <Button
            variant="contained"
            onClick={() => navigate("/select-template")}
          >
            Edit Invoice Design
          </Button>
        </div>

        {/* Hospital Details Section */}
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
                {selectedFile ? (
                  <div>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected Logo"
                      style={{ width: "150px", marginBottom: "8px" }}
                    />
                    <div>
                      {selectedFile.name} (Upload:{" "}
                      {Math.round(selectedFile.size / 1024)} KB)
                    </div>
                  </div>
                ) : (
                  <div>
                    <img
                      src={selectImage}
                      alt="Hospital Logo"
                      style={{ width: "200px", marginBottom: "8px" }}
                    />
                    <div>Upload a file or drag and drop</div>
                  </div>
                )}
                <Button variant="outlined" component="span">
                  Upload Logo
                </Button>
              </label>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Name"
              name="hospitalName"
              value={formValues.hospitalName}
              onChange={handleInputChange}
            />
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
              value={formValues.billDate}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Bill Time"
              name="billTime"
              value={formValues.billTime}
              onChange={handleInputChange}
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
              label="Address"
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Additional dynamic hospital fields */}
          {hospitalFields.map((field, index) => (
            <Grid item xs={12} md={4} key={index}>
              <TextField fullWidth label={field.label || "Text Field"} />
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

        {/* Patient Details Section */}
        <h2 className="text-lg font-semibold mt-6 mb-4">Patient Details</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Name"
              name="patientName"
              value={formValues.patientName}
              onChange={handleInputChange}
            />
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
            <TextField
              fullWidth
              label="Doctor Name"
              name="doctorName"
              value={formValues.doctorName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Discount (%)"
              name="discount"
              value={formValues.discount}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Tax"
              name="tax"
              value={formValues.tax}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              value={formValues.amount}
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
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Address"
              name="patientAddress"
              value={formValues.patientAddress}
              onChange={handleInputChange}
            />
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

          {/* Additional dynamic patient fields */}
          {patientFields.map((field, index) => (
            <Grid item xs={12} md={4} key={index}>
              <TextField fullWidth label={field.label || "Text Field"} />
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

export default EditInvoice;

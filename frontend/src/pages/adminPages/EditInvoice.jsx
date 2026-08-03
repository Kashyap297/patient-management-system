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
    <form onSubmit={handleSubmit} className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>

      <div className="relative z-10 animate-slide-up">
        <div className="glass p-8 md:p-10 rounded-3xl shadow-sm border border-white/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h1 className="text-3xl font-extrabold text-secondary tracking-tight">Edit Invoice Design</h1>
            <button
              type="button"
              onClick={() => navigate("/select-template")}
              className="px-6 py-2.5 bg-white text-primary border border-primary font-semibold rounded-xl shadow-sm hover:bg-primary hover:text-white transition-colors duration-300"
            >
              Change Invoice Template
            </button>
          </div>

          {/* Hospital Details Section */}
          <div className="mb-8 p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm">
            <h2 className="text-xl font-bold text-secondary mb-6 border-b border-gray-200/50 pb-3">Hospital Details</h2>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <div className="flex flex-col items-center justify-center h-full">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="upload-logo"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="upload-logo" className="w-full h-full min-h-[120px] cursor-pointer flex flex-col items-center justify-center bg-white/50 border-2 border-dashed border-primary/30 rounded-2xl hover:bg-white/70 hover:border-primary transition-all duration-300 p-4">
                    {selectedFile ? (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="Selected Logo"
                          className="h-16 w-auto object-contain mb-2 mx-auto"
                        />
                        <div className="text-xs text-gray-500 font-medium truncate max-w-[200px]">
                          {selectedFile.name}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <img
                          src={selectImage}
                          alt="Hospital Logo"
                          className="h-12 w-auto object-contain mb-2 mx-auto opacity-50"
                        />
                        <div className="text-sm font-medium text-primary">Upload Logo</div>
                      </div>
                    )}
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
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Other Text"
                  name="otherText"
                  value={formValues.otherText}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Bill Date"
                  name="billDate"
                  value={formValues.billDate}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Bill Time"
                  name="billTime"
                  value={formValues.billTime}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Bill Number"
                  name="billNumber"
                  value={formValues.billNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>

              {/* Additional dynamic hospital fields */}
              {hospitalFields.map((field, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <TextField 
                    fullWidth 
                    label={field.label || "Text Field"} 
                    variant="outlined"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                  />
                </Grid>
              ))}
              
              <Grid item xs={12}>
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 flex items-center gap-2"
                  onClick={() => setIsHospitalModalOpen(true)}
                >
                  <span>+</span> Add New Field (Hospital)
                </button>
              </Grid>
            </Grid>
          </div>

          {/* Patient Details Section */}
          <div className="mb-8 p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm">
            <h2 className="text-xl font-bold text-secondary mb-6 border-b border-gray-200/50 pb-3">Patient Details</h2>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Name"
                  name="patientName"
                  value={formValues.patientName}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Disease Name"
                  name="diseaseName"
                  value={formValues.diseaseName}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Doctor Name"
                  name="doctorName"
                  value={formValues.doctorName}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Discount"
                  name="discount"
                  value={formValues.discount}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Tax"
                  name="tax"
                  value={formValues.tax}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  value={formValues.amount}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Total Amount"
                  name="totalAmount"
                  value={formValues.totalAmount}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)", fontWeight: "bold" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Address"
                  name="patientAddress"
                  value={formValues.patientAddress}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formValues.gender}
                    onChange={handleInputChange}
                    label="Gender"
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
                  <TextField 
                    fullWidth 
                    label={field.label || "Text Field"} 
                    variant="outlined"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.5)" } }}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 flex items-center gap-2"
                  onClick={() => setIsPatientModalOpen(true)}
                >
                  <span>+</span> Add New Field (Patient)
                </button>
              </Grid>
            </Grid>
          </div>

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

          <button
            type="submit"
            className="w-full py-4 mt-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-lg shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 text-lg tracking-wide"
          >
            Save Invoice
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditInvoice;

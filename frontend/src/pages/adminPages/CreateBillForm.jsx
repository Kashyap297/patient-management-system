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
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";

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
    doctorId: "",
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
      const calculatedTotal = amount + amount * (tax / 100) - discount;

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
      toast.success("Invoice created successfully!");

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
      toast.error("Error creating invoice. Please try again.");
    }
  };

  // Add field functions
  const handleAddHospitalField = (field) => {
    setHospitalFields([...hospitalFields, field]);
  };

  const handleAddPatientField = (field) => {
    setPatientFields([...patientFields, field]);
  };
  const handleAddField = (field, type) => {
    if (type === "hospital") {
      setHospitalFields([...hospitalFields, field]);
    } else if (type === "patient") {
      setPatientFields([...patientFields, field]);
    }
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
    <form onSubmit={handleSubmit} className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>

      <div className="relative z-10 animate-slide-up">
        <div className="glass p-8 md:p-10 rounded-3xl shadow-sm border border-white/50">
          <h1 className="text-3xl font-extrabold text-secondary tracking-tight mb-8">Create Bill</h1>

          {/* Hospital Details Section */}
          <div className="mb-8 p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm">
            <h2 className="text-xl font-bold text-secondary mb-6 border-b border-gray-200/50 pb-3">Hospital Details</h2>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Upload Logo */}
              <div className="flex flex-col items-center justify-center mb-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="upload-logo"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="upload-logo"
                  className="cursor-pointer flex flex-col items-center justify-center w-full h-32 bg-white/50 border-2 border-dashed border-primary/30 rounded-2xl hover:bg-white/70 hover:border-primary transition-all duration-300 group"
                >
                  <img
                    src={
                      selectedFile ? URL.createObjectURL(selectedFile) : selectImage
                    }
                    alt="Hospital Logo"
                    className="h-16 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="mt-2 text-sm font-medium text-gray-500 group-hover:text-primary transition-colors">
                    {selectedFile ? selectedFile.name : "Upload Logo"}
                  </span>
                </label>
              </div>

              {/* Hospital Selection */}
              <div className="relative group">
                <select
                  name="hospitalId"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 appearance-none text-gray-700"
                  value={formValues.hospitalId}
                  onChange={handleHospitalSelect}
                >
                  <option value="">Select Hospital</option>
                  {hospitals.map((hospital) => (
                    <option key={hospital._id} value={hospital._id}>
                      {hospital.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                <label className="absolute left-3 -top-2.5 px-1 bg-gradient-to-b from-white/0 to-white/80 backdrop-blur-sm text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                  Hospital<span className="text-red-500 ml-1">*</span>
                </label>
              </div>

              {/* Other Text */}
              <div className="relative group">
                <input
                  type="text"
                  name="otherText"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                  placeholder="Enter Other Text"
                  value={formValues.otherText}
                  onChange={handleInputChange}
                />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none">
                  Other Text
                </label>
              </div>

              {/* Bill Date */}
              <div className="relative group">
                <input
                  type="date"
                  name="billDate"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 text-gray-700"
                  value={formValues.billDate}
                  onChange={handleInputChange}
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-gradient-to-b from-white/0 to-white/80 backdrop-blur-sm text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                  Bill Date
                </label>
              </div>

              {/* Bill Time */}
              <div className="relative group">
                <input
                  type="time"
                  name="billTime"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 text-gray-700"
                  value={formValues.billTime}
                  onChange={handleInputChange}
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-gradient-to-b from-white/0 to-white/80 backdrop-blur-sm text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                  Bill Time
                </label>
              </div>

              {/* Bill Number */}
              <div className="relative group">
                <input
                  type="text"
                  name="billNumber"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                  placeholder="Enter Bill Number"
                  value={formValues.billNumber}
                  onChange={handleInputChange}
                />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none">
                  Bill Number
                </label>
              </div>

              {/* Phone Number */}
              <div className="relative group">
                <input
                  type="text"
                  name="phoneNumber"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                  placeholder="Enter Phone Number"
                  value={formValues.phoneNumber}
                  onChange={handleInputChange}
                />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none">
                  Phone Number
                </label>
              </div>

              {/* Email */}
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                  placeholder="Enter Email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none">
                  Email
                </label>
              </div>

              {/* Hospital Address */}
              <div className="relative group md:col-span-2 lg:col-span-1">
                <input
                  type="text"
                  name="hospitalAddress"
                  className="peer w-full px-4 py-3 bg-gray-100/50 backdrop-blur-md border border-gray-200/50 rounded-2xl text-gray-500 cursor-not-allowed"
                  placeholder="Hospital Address"
                  value={formValues.hospitalAddress}
                  onChange={handleInputChange}
                  disabled
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-gradient-to-b from-white/0 to-gray-50/80 backdrop-blur-sm text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                  Hospital Address
                </label>
              </div>

              {/* Additional Dynamic Hospital Fields */}
              {hospitalFields.map((field, index) => (
                <div className="relative group flex items-center" key={index}>
                  {field.type === "Dropdown" ? (
                    <div className="relative w-full">
                      <select className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 appearance-none text-gray-700">
                        <option value="">{field.label || "Select"}</option>
                        {field.options.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 text-gray-700"
                      placeholder={field.label || "Text Field"}
                    />
                  )}
                  <button
                    type="button"
                    className="absolute right-0 top-0 bottom-0 p-3 text-red-400 hover:text-red-600 transition-colors hover:bg-red-50 rounded-r-2xl"
                    onClick={() => handleRemoveHospitalField(index)}
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 flex items-center gap-2"
                onClick={() => setIsHospitalModalOpen(true)}
              >
                <span>+</span> Add New Field
              </button>
            </div>
          </div>

          {/* Patient Details Section */}
          <div className="mb-8 p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm">
            <h2 className="text-xl font-bold text-secondary mb-6 border-b border-gray-200/50 pb-3">Patient Details</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Patient Selection */}
              <div className="relative group">
                <select
                  name="patientId"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 appearance-none text-gray-700"
                  value={formValues.patientId}
                  onChange={handlePatientSelect}
                >
                  <option value="">Select Patient</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.firstName} {patient.lastName}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                <label className="absolute left-3 -top-2.5 px-1 bg-gradient-to-b from-white/0 to-white/80 backdrop-blur-sm text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                  Patient<span className="text-red-500 ml-1">*</span>
                </label>
              </div>

              {/* Disease Name */}
              <div className="relative group">
                <input
                  type="text"
                  name="diseaseName"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                  placeholder="Enter Disease Name"
                  value={formValues.diseaseName}
                  onChange={handleInputChange}
                />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none">
                  Disease Name
                </label>
              </div>

              {/* Doctor Selection */}
              <div className="relative group">
                <select
                  name="doctorId"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 appearance-none text-gray-700"
                  value={formValues.doctorId}
                  onChange={handleDoctorSelect}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                <label className="absolute left-3 -top-2.5 px-1 bg-gradient-to-b from-white/0 to-white/80 backdrop-blur-sm text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                  Doctor<span className="text-red-500 ml-1">*</span>
                </label>
              </div>

              {/* Description */}
              <div className="relative group md:col-span-3">
                <input
                  type="text"
                  name="description"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                  placeholder="Enter Description"
                  value={formValues.description}
                  onChange={handleInputChange}
                />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none">
                  Description
                </label>
              </div>

              {/* Payment Type */}
              <div className="relative group">
                <select
                  name="paymentType"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 appearance-none text-gray-700"
                  value={formValues.paymentType}
                  onChange={handleInputChange}
                >
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                  <option value="Insurance">Insurance</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                <label className="absolute left-3 -top-2.5 px-1 bg-gradient-to-b from-white/0 to-white/80 backdrop-blur-sm text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                  Payment Type
                </label>
              </div>

              {/* Gender */}
              <div className="relative group">
                <select
                  name="gender"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 appearance-none text-gray-700"
                  value={formValues.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                <label className="absolute left-3 -top-2.5 px-1 bg-gradient-to-b from-white/0 to-white/80 backdrop-blur-sm text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                  Gender
                </label>
              </div>

              {/* Age */}
              <div className="relative group">
                <input
                  type="text"
                  name="age"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                  placeholder="Enter Age"
                  value={formValues.age}
                  onChange={handleInputChange}
                />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none">
                  Age
                </label>
              </div>
            </div>
            
            {/* Additional Patient Fields */}
            {patientFields.length > 0 && (
              <div className="grid gap-6 md:grid-cols-3 mt-6">
                {patientFields.map((field, index) => (
                  <div className="relative group flex items-center" key={index}>
                    {field.type === "Dropdown" ? (
                      <div className="relative w-full">
                        <select className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 appearance-none text-gray-700">
                          <option value="">{field.label || "Select"}</option>
                          {field.options.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    ) : (
                      <input
                        type="text"
                        className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 text-gray-700"
                        placeholder={field.label || "Text Field"}
                      />
                    )}
                    <button
                      type="button"
                      className="absolute right-0 top-0 bottom-0 p-3 text-red-400 hover:text-red-600 transition-colors hover:bg-red-50 rounded-r-2xl"
                      onClick={() => handleRemovePatientField(index)}
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 flex items-center gap-2"
                onClick={() => setIsPatientModalOpen(true)}
              >
                <span>+</span> Add New Field
              </button>
            </div>
          </div>

          {/* Insurance Details Section */}
          {formValues.paymentType === "Insurance" && (
            <div className="mb-8 p-6 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm animate-fade-in">
              <h2 className="text-xl font-bold text-secondary mb-6 border-b border-gray-200/50 pb-3">Insurance Details</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative group">
                  <input
                    type="text"
                    name="insuranceCompany"
                    className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                    placeholder="Enter Insurance Company"
                    value={formValues.insuranceCompany}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none">
                    Insurance Company
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    name="insurancePlan"
                    className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                    placeholder="Enter Insurance Plan"
                    value={formValues.insurancePlan}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none">
                    Insurance Plan
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    name="claimAmount"
                    className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                    placeholder="Enter Claim Amount"
                    value={formValues.claimAmount}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none">
                    Claim Amount
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    name="claimedAmount"
                    className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                    placeholder="Enter Claimed Amount"
                    value={formValues.claimedAmount}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none">
                    Claimed Amount
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Billing Details Section */}
          <div className="mb-8 p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 backdrop-blur-md rounded-2xl border border-blue-100 shadow-inner">
            <h2 className="text-xl font-bold text-secondary mb-6 border-b border-blue-200/50 pb-3">Billing Calculation</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Amount */}
              <div className="relative group">
                <input
                  type="number"
                  name="amount"
                  className="peer w-full px-4 py-3 bg-white border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 placeholder-transparent font-medium"
                  placeholder="Enter Amount"
                  value={formValues.amount}
                  onChange={handleInputChange}
                />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none">
                  Amount ($)
                </label>
              </div>

              {/* Tax */}
              <div className="relative group">
                <input
                  type="number"
                  name="tax"
                  className="peer w-full px-4 py-3 bg-white border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 placeholder-transparent font-medium"
                  placeholder="Enter Tax (%)"
                  value={formValues.tax}
                  onChange={handleInputChange}
                />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none">
                  Tax (%)
                </label>
              </div>

              {/* Discount */}
              <div className="relative group">
                <input
                  type="number"
                  name="discount"
                  className="peer w-full px-4 py-3 bg-white border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 placeholder-transparent font-medium"
                  placeholder="Enter Discount"
                  value={formValues.discount}
                  onChange={handleInputChange}
                />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none">
                  Discount ($)
                </label>
              </div>

              {/* Total Amount */}
              <div className="relative group">
                <input
                  type="text"
                  name="totalAmount"
                  className="peer w-full px-4 py-3 bg-primary/5 border border-primary/20 rounded-2xl text-primary font-bold cursor-not-allowed text-lg"
                  placeholder="Total Amount"
                  value={formValues.totalAmount ? `$${formValues.totalAmount}` : ""}
                  onChange={handleInputChange}
                  disabled
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-gradient-to-b from-blue-50/0 to-blue-50/100 backdrop-blur-sm text-xs font-bold text-primary uppercase tracking-wider rounded">
                  Total Amount
                </label>
              </div>
            </div>
          </div>

          <AddFieldModal
            open={isHospitalModalOpen}
            handleClose={() => setIsHospitalModalOpen(false)}
            handleAddField={(field) => handleAddField(field, "hospital")}
          />
          <AddFieldModal
            open={isPatientModalOpen}
            handleClose={() => setIsPatientModalOpen(false)}
            handleAddField={(field) => handleAddField(field, "patient")}
          />

          <button
            type="submit"
            className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-lg shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 text-lg tracking-wide"
          >
            Save Invoice
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateBill;

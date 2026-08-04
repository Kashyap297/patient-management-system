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
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateBill = () => {
  const navigate = useNavigate();
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
    <form onSubmit={handleSubmit} className="min-h-screen bg-[#fafbfc] p-6 md:p-8 space-y-6 font-sans text-gray-800">
      <div className="bg-white border border-gray-100 p-8 md:p-10 rounded-2xl shadow-sm">
        <div className="mb-8 flex items-center gap-4">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full bg-white shadow-sm hover:bg-gray-50 text-gray-600 transition-colors border border-gray-200 flex items-center justify-center"
          >
            <FaChevronLeft size={16} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Bill</h1>
        </div>

        {/* Hospital Details Section */}
        <div className="mb-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3">Hospital Details</h2>

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
                className="cursor-pointer flex flex-col items-center justify-center w-full h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 hover:border-[#10b981] transition-all duration-300 group"
              >
                <img
                  src={
                    selectedFile ? URL.createObjectURL(selectedFile) : selectImage
                  }
                  alt="Hospital Logo"
                  className="h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <span className="mt-2 text-sm font-semibold text-gray-500 group-hover:text-[#10b981] transition-colors">
                  {selectedFile ? selectedFile.name : "Upload Logo"}
                </span>
              </label>
            </div>

            {/* Hospital Selection */}
            <div className="relative group">
              <select
                name="hospitalId"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 appearance-none text-gray-700"
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
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                Hospital<span className="text-red-500 ml-1">*</span>
              </label>
            </div>

            {/* Other Text */}
            <div className="relative group">
              <input
                type="text"
                name="otherText"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 placeholder-transparent text-gray-700"
                placeholder="Enter Other Text"
                value={formValues.otherText}
                onChange={handleInputChange}
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                Other Text
              </label>
            </div>

            {/* Bill Date */}
            <div className="relative group">
              <input
                type="date"
                name="billDate"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 text-gray-700"
                value={formValues.billDate}
                onChange={handleInputChange}
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                Bill Date
              </label>
            </div>

            {/* Bill Time */}
            <div className="relative group">
              <input
                type="time"
                name="billTime"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 text-gray-700"
                value={formValues.billTime}
                onChange={handleInputChange}
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                Bill Time
              </label>
            </div>

            {/* Bill Number */}
            <div className="relative group">
              <input
                type="text"
                name="billNumber"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 placeholder-transparent text-gray-700"
                placeholder="Enter Bill Number"
                value={formValues.billNumber}
                onChange={handleInputChange}
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                Bill Number
              </label>
            </div>

            {/* Phone Number */}
            <div className="relative group">
              <input
                type="text"
                name="phoneNumber"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 placeholder-transparent text-gray-700"
                placeholder="Enter Phone Number"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                Phone Number
              </label>
            </div>

            {/* Email */}
            <div className="relative group">
              <input
                type="email"
                name="email"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 placeholder-transparent text-gray-700"
                placeholder="Enter Email"
                value={formValues.email}
                onChange={handleInputChange}
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                Email
              </label>
            </div>

            {/* Hospital Address */}
            <div className="relative group md:col-span-2 lg:col-span-1">
              <input
                type="text"
                name="hospitalAddress"
                className="peer w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                placeholder="Hospital Address"
                value={formValues.hospitalAddress}
                onChange={handleInputChange}
                disabled
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                Hospital Address
              </label>
            </div>

            {/* Additional Dynamic Hospital Fields */}
            {hospitalFields.map((field, index) => (
              <div className="relative group flex items-center" key={index}>
                {field.type === "Dropdown" ? (
                  <div className="relative w-full">
                    <select className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 appearance-none text-gray-700">
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
                    className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 text-gray-700 placeholder-transparent"
                    placeholder={field.label || "Text Field"}
                  />
                )}
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                  {field.label || "Field"}
                </label>
                <button
                  type="button"
                  className="absolute right-0 top-0 bottom-0 p-3 text-red-400 hover:text-red-600 transition-colors hover:bg-red-50 rounded-r-lg"
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
              className="px-4 py-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
              onClick={() => setIsHospitalModalOpen(true)}
            >
              <span>+</span> Add New Field
            </button>
          </div>
        </div>

        {/* Patient Details Section */}
        <div className="mb-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3">Patient Details</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Patient Selection */}
            <div className="relative group">
              <select
                name="patientId"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 appearance-none text-gray-700"
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
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                Patient<span className="text-red-500 ml-1">*</span>
              </label>
            </div>

            {/* Disease Name */}
            <div className="relative group">
              <input
                type="text"
                name="diseaseName"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 placeholder-transparent text-gray-700"
                placeholder="Enter Disease Name"
                value={formValues.diseaseName}
                onChange={handleInputChange}
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                Disease Name
              </label>
            </div>

            {/* Doctor Selection */}
            <div className="relative group">
              <select
                name="doctorId"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 appearance-none text-gray-700"
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
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                Doctor<span className="text-red-500 ml-1">*</span>
              </label>
            </div>

            {/* Description */}
            <div className="relative group md:col-span-3">
              <input
                type="text"
                name="description"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 placeholder-transparent text-gray-700"
                placeholder="Enter Description"
                value={formValues.description}
                onChange={handleInputChange}
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                Description
              </label>
            </div>

            {/* Payment Type */}
            <div className="relative group">
              <select
                name="paymentType"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 appearance-none text-gray-700"
                value={formValues.paymentType}
                onChange={handleInputChange}
              >
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
                <option value="Insurance">Insurance</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                Payment Type
              </label>
            </div>

            {/* Gender */}
            <div className="relative group">
              <select
                name="gender"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 appearance-none text-gray-700"
                value={formValues.gender}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded">
                Gender
              </label>
            </div>

            {/* Age */}
            <div className="relative group">
              <input
                type="text"
                name="age"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 placeholder-transparent text-gray-700"
                placeholder="Enter Age"
                value={formValues.age}
                onChange={handleInputChange}
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
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
                      <select className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 appearance-none text-gray-700">
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
                      className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 text-gray-700 placeholder-transparent"
                      placeholder={field.label || "Text Field"}
                    />
                  )}
                  <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                    {field.label || "Field"}
                  </label>
                  <button
                    type="button"
                    className="absolute right-0 top-0 bottom-0 p-3 text-red-400 hover:text-red-600 transition-colors hover:bg-red-50 rounded-r-lg"
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
              className="px-4 py-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
              onClick={() => setIsPatientModalOpen(true)}
            >
              <span>+</span> Add New Field
            </button>
          </div>
        </div>

        {/* Insurance Details Section */}
        {formValues.paymentType === "Insurance" && (
          <div className="mb-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3">Insurance Details</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative group">
                <input
                  type="text"
                  name="insuranceCompany"
                  className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 placeholder-transparent text-gray-700"
                  placeholder="Enter Insurance Company"
                  value={formValues.insuranceCompany}
                  onChange={handleInputChange}
                  required
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                  Insurance Company
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="insurancePlan"
                  className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 placeholder-transparent text-gray-700"
                  placeholder="Enter Insurance Plan"
                  value={formValues.insurancePlan}
                  onChange={handleInputChange}
                  required
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                  Insurance Plan
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="claimAmount"
                  className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 placeholder-transparent text-gray-700"
                  placeholder="Enter Claim Amount"
                  value={formValues.claimAmount}
                  onChange={handleInputChange}
                  required
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                  Claim Amount
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="claimedAmount"
                  className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 placeholder-transparent text-gray-700"
                  placeholder="Enter Claimed Amount"
                  value={formValues.claimedAmount}
                  onChange={handleInputChange}
                  required
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                  Claimed Amount
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Billing Details Section */}
        <div className="mb-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3">Billing Calculation</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Amount */}
            <div className="relative group">
              <input
                type="number"
                name="amount"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 placeholder-transparent font-medium text-gray-700"
                placeholder="Enter Amount"
                value={formValues.amount}
                onChange={handleInputChange}
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                Amount ($)
              </label>
            </div>

            {/* Tax */}
            <div className="relative group">
              <input
                type="number"
                name="tax"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 placeholder-transparent font-medium text-gray-700"
                placeholder="Enter Tax (%)"
                value={formValues.tax}
                onChange={handleInputChange}
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                Tax (%)
              </label>
            </div>

            {/* Discount */}
            <div className="relative group">
              <input
                type="number"
                name="discount"
                className="peer w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] transition-all duration-300 placeholder-transparent font-medium text-gray-700"
                placeholder="Enter Discount"
                value={formValues.discount}
                onChange={handleInputChange}
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-semibold text-gray-500 uppercase tracking-wider rounded peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:bg-transparent peer-placeholder-shown:normal-case peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#10b981] peer-focus:bg-white peer-focus:uppercase peer-focus:tracking-wider pointer-events-none transition-all duration-300">
                Discount ($)
              </label>
            </div>

            {/* Total Amount */}
            <div className="relative group">
              <input
                type="text"
                name="totalAmount"
                className="peer w-full px-4 py-3 bg-[#ecfdf5] border border-[#10b981]/20 rounded-lg text-[#10b981] font-bold cursor-not-allowed text-lg"
                placeholder="Total Amount"
                value={formValues.totalAmount ? `$${formValues.totalAmount}` : ""}
                onChange={handleInputChange}
                disabled
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-xs font-bold text-[#10b981] uppercase tracking-wider rounded">
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
          className="w-full py-4 bg-[#10b981] hover:bg-[#059669] text-white font-bold rounded-xl shadow-sm transition-colors text-lg tracking-wide"
        >
          Save Invoice
        </button>
      </div>
    </form>
  );
};

export default CreateBill;

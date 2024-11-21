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
    <form onSubmit={handleSubmit}>
      <div className="p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Create Bill</h1>

        <h2 className="text-lg font-semibold mb-4">Hospital Details</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Upload Logo */}
          <div className="flex flex-col items-center mb-6">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="upload-logo"
              onChange={handleFileChange}
            />
            <label
              htmlFor="upload-logo"
              className="cursor-pointer flex flex-col items-center"
            >
              <img
                src={
                  selectedFile ? URL.createObjectURL(selectedFile) : selectImage
                }
                alt="Hospital Logo"
                className="w-full h-28 object-cover "
              />
              <span className="mt-2 text-gray-600">
                {selectedFile ? selectedFile.name : "Upload Logo"}
              </span>
            </label>
          </div>

          {/* Hospital Selection */}
          <div className="relative mb-6">
            <select
              name="hospitalId"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
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
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Hospital<span className="text-red-500">*</span>
            </label>
          </div>

          {/* Other Text */}
          <div className="relative mb-6">
            <input
              type="text"
              name="otherText"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              placeholder="Enter Other Text"
              value={formValues.otherText}
              onChange={handleInputChange}
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Other Text
            </label>
          </div>

          {/* Bill Date */}
          <div className="relative mb-6">
            <input
              type="date"
              name="billDate"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              value={formValues.billDate}
              onChange={handleInputChange}
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Bill Date
            </label>
          </div>

          {/* Bill Time */}
          <div className="relative mb-6">
            <input
              type="time"
              name="billTime"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              value={formValues.billTime}
              onChange={handleInputChange}
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Bill Time
            </label>
          </div>

          {/* Bill Number */}
          <div className="relative mb-6">
            <input
              type="text"
              name="billNumber"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              placeholder="Enter Bill Number"
              value={formValues.billNumber}
              onChange={handleInputChange}
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Bill Number
            </label>
          </div>

          {/* Phone Number */}
          <div className="relative mb-6">
            <input
              type="text"
              name="phoneNumber"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              placeholder="Enter Phone Number"
              value={formValues.phoneNumber}
              onChange={handleInputChange}
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Phone Number
            </label>
          </div>

          {/* Email */}
          <div className="relative mb-6">
            <input
              type="email"
              name="email"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              placeholder="Enter Email"
              value={formValues.email}
              onChange={handleInputChange}
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Email
            </label>
          </div>

          {/* Hospital Address */}
          <div className="relative mb-6">
            <input
              type="text"
              name="hospitalAddress"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              placeholder="Hospital Address"
              value={formValues.hospitalAddress}
              onChange={handleInputChange}
              disabled
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Hospital Address
            </label>
          </div>

          {/* Additional Dynamic Hospital Fields */}
          {hospitalFields.map((field, index) => (
            <div className="relative mb-6 flex items-center" key={index}>
              {field.type === "Dropdown" ? (
                <select className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none">
                  <option value="">{field.label || "Select"}</option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
                  placeholder={field.label || "Text Field"}
                />
              )}
              <button
                type="button"
                className="text-red-500 ml-2"
                onClick={() => handleRemoveHospitalField(index)}
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}

          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded-xl mt-4 hover:bg-gray-300"
            onClick={() => setIsHospitalModalOpen(true)}
          >
            + Add New Field (Hospital)
          </button>
        </div>
        <h2 className="text-lg font-semibold mt-6 mb-4">Patient Details</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Patient Selection */}
          <div className="relative mb-6">
            <select
              name="patientId"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
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
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Patient<span className="text-red-500">*</span>
            </label>
          </div>

          {/* Disease Name */}
          <div className="relative mb-6">
            <input
              type="text"
              name="diseaseName"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              placeholder="Enter Disease Name"
              value={formValues.diseaseName}
              onChange={handleInputChange}
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Disease Name
            </label>
          </div>

          {/* Doctor Selection */}
          <div className="relative mb-6">
            <select
              name="doctorId"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
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
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Doctor<span className="text-red-500">*</span>
            </label>
          </div>

          {/* Description */}
          <div className="relative mb-6">
            <input
              type="text"
              name="description"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              placeholder="Enter Description"
              value={formValues.description}
              onChange={handleInputChange}
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Description
            </label>
          </div>

          {/* Amount */}
          <div className="relative mb-6">
            <input
              type="number"
              name="amount"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              placeholder="Enter Amount"
              value={formValues.amount}
              onChange={handleInputChange}
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Amount
            </label>
          </div>

          {/* Tax */}
          <div className="relative mb-6">
            <input
              type="number"
              name="tax"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              placeholder="Enter Tax (%)"
              value={formValues.tax}
              onChange={handleInputChange}
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Tax (%)
            </label>
          </div>

          {/* Discount */}
          <div className="relative mb-6">
            <input
              type="number"
              name="discount"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              placeholder="Enter Discount"
              value={formValues.discount}
              onChange={handleInputChange}
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Discount
            </label>
          </div>

          {/* Total Amount */}
          <div className="relative mb-6">
            <input
              type="text"
              name="totalAmount"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              placeholder="Total Amount"
              value={formValues.totalAmount}
              onChange={handleInputChange}
              disabled
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Total Amount
            </label>
          </div>

          {/* Payment Type */}
          <div className="relative mb-6">
            <select
              name="paymentType"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              value={formValues.paymentType}
              onChange={handleInputChange}
            >
              <option value="Cash">Cash</option>
              <option value="Online">Online</option>
              <option value="Insurance">Insurance</option>
            </select>
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Payment Type
            </label>
          </div>

          {/* Gender */}
          <div className="relative mb-6">
            <select
              name="gender"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              value={formValues.gender}
              onChange={handleInputChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Gender
            </label>
          </div>

          {/* Age */}
          <div className="relative mb-6">
            <input
              type="text"
              name="age"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              placeholder="Enter Age"
              value={formValues.age}
              onChange={handleInputChange}
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
              Age
            </label>
          </div>
        </div>

        {/* Additional Fields for Payment Type Insurance */}
        {formValues.paymentType === "Insurance" && (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative mb-6">
              <input
                type="text"
                name="insuranceCompany"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
                placeholder="Enter Insurance Company"
                value={formValues.insuranceCompany}
                onChange={handleInputChange}
                required
              />
              <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
                Insurance Company
              </label>
            </div>

            <div className="relative mb-6">
              <input
                type="text"
                name="insurancePlan"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
                placeholder="Enter Insurance Plan"
                value={formValues.insurancePlan}
                onChange={handleInputChange}
                required
              />
              <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
                Insurance Plan
              </label>
            </div>

            <div className="relative mb-6">
              <input
                type="text"
                name="claimAmount"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
                placeholder="Enter Claim Amount"
                value={formValues.claimAmount}
                onChange={handleInputChange}
                required
              />
              <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
                Claim Amount
              </label>
            </div>

            <div className="relative mb-6">
              <input
                type="text"
                name="claimedAmount"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
                placeholder="Enter Claimed Amount"
                value={formValues.claimedAmount}
                onChange={handleInputChange}
                required
              />
              <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium text-gray-500">
                Claimed Amount
              </label>
            </div>
          </div>
        )}
        {/* Additional Patient Fields */}
        {/* Render dynamic patient fields */}
        <div className="grid gap-4 md:grid-cols-3">
          {patientFields.map((field, index) => (
            <div className="relative mb-6 flex items-center" key={index}>
              {field.type === "Dropdown" ? (
                <select className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none">
                  <option value="">{field.label || "Select"}</option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
                  placeholder={field.label || "Text Field"}
                />
              )}
              <button
                type="button"
                className="text-red-500 ml-2"
                onClick={() => handleRemovePatientField(index)}
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
        </div>

        {/* Add Field Button */}
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 rounded-xl mt-4 hover:bg-gray-300"
          onClick={() => setIsPatientModalOpen(true)}
        >
          + Add New Field (Patient)
        </button>

        {/* <AddFieldModal
          open={isHospitalModalOpen}
          handleClose={() => setIsHospitalModalOpen(false)}
          handleAddField={handleAddHospitalField}
        />
        <AddFieldModal
          open={isPatientModalOpen}
          handleClose={() => setIsPatientModalOpen(false)}
          handleAddField={handleAddPatientField}
        /> */}

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
          className="w-full py-2 mt-6 bg-[#0eabeb] text-white font-semibold rounded-xl transition duration-200"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateBill;

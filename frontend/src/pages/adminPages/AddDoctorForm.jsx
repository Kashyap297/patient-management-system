import React, { useState } from "react";
import { AiOutlineCamera, AiOutlineClockCircle } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/api";
import countryData from "../../countryjson/countries+states+cities.json"; // Assuming the file path
import toast from "react-hot-toast";

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    qualification: "",
    specialtyType: "",
    checkupTime: "",
    phoneNumber: "",
    country: "",
    zipCode: "",
    onlineConsultationRate: "",
    gender: "",
    workType: "",
    state: "",
    city: "",
    address: "",
    description: "",
    experience: "",
    workingTime: "",
    breakTime: "",
    age: "",
    email: "",
    hospitalName: "",
    hospitalAddress: "",
    emergencyContactNumber: "",
    websiteLink: "",
    password: "",
  });

  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [showHospitalFields, setShowHospitalFields] = useState(false);
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Show/hide hospital fields based on Work Type
    if (name === "workType") {
      setShowHospitalFields(value === "Online" || value === "Both");
    }

    // Handle country change and populate states
    if (name === "country") {
      const selectedCountry = countryData.find((country) => country.name === value);
      setFilteredStates(selectedCountry ? selectedCountry.states : []);
      setFilteredCities([]); // Reset cities when country changes
    }

    // Handle state change and populate cities
    if (name === "state") {
      const selectedState = filteredStates.find((state) => state.name === value);
      setFilteredCities(selectedState ? selectedState.cities : []);
    }
  };

  const handlePhotoUpload = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSignatureUpload = (e) => {
    setSignature(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (profilePhoto) data.append("profileImage", profilePhoto);
    if (signature) data.append("signatureImage", signature);

    try {
      const token = localStorage.getItem("token");

      const response = await api.post("/users/add-doctor", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 201) {
        const error = response.data;
        console.error("Server error:", error);
        alert(`Error: ${error.message}`);
        return;
      }
      toast.success("Doctor added successfully!");
      navigate("/admin/doctor-management");
    } catch (error) {
      toast.error("Error in adding doctor!");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>

      <div className="relative z-10 animate-slide-up">
        <form
          onSubmit={handleSubmit}
          className="glass p-6 md:p-8 rounded-3xl shadow-sm border border-white/50"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-secondary tracking-tight">
              Add New Doctor
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">Enter the details to add a new doctor to the system.</p>
          </div>

          <div className="flex flex-col xl:flex-row gap-8">
            <div className="flex flex-col w-full xl:w-1/4 gap-6">
              <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                <label className="text-gray-700 text-sm font-bold block mb-4">
                  Profile Photo
                </label>
                <div className="relative mx-auto w-32 h-32 md:w-40 md:h-40 bg-white border-2 border-dashed border-gray-300 rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors group">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    name="profile"
                    onChange={handlePhotoUpload}
                  />
                  {profilePhoto ? (
                    <img
                      src={URL.createObjectURL(profilePhoto)}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <>
                      <AiOutlineCamera className="text-gray-400 text-4xl group-hover:text-primary transition-colors" />
                      <span className="text-xs text-primary font-bold mt-2">Choose Photo</span>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 shadow-sm">
                <label className="text-gray-700 text-sm font-bold block mb-4 text-center">
                  Upload Signature
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-2xl h-40 flex flex-col items-center justify-center bg-white cursor-pointer hover:border-primary transition-colors group">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    name="signature"
                    onChange={handleSignatureUpload}
                  />
                  {signature ? (
                    <img
                      src={URL.createObjectURL(signature)}
                      alt="Signature"
                      className="object-contain w-full h-full p-2"
                    />
                  ) : (
                    <div className="text-center px-4">
                      <FiUpload className="text-gray-400 text-3xl mx-auto group-hover:text-primary transition-colors mb-2" />
                      <span className="text-sm text-primary font-bold">Upload a file</span>
                      <p className="text-xs text-gray-400 font-medium mt-1">PNG Up To 5MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full xl:w-3/4 flex flex-col gap-6">
              <div className="bg-gray-50/50 p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-extrabold text-secondary tracking-tight mb-6">Personal & Professional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Form Fields */}
                  <InputField id="firstName" label="First Name" value={formData.firstName} onChange={handleInputChange} />
                  <InputField id="lastName" label="Last Name" value={formData.lastName} onChange={handleInputChange} />
                  <InputField id="qualification" label="Doctor Qualification" value={formData.qualification} onChange={handleInputChange} />
                  <InputField id="password" label="Password" type="password" value={formData.password} onChange={handleInputChange} />
                  <SelectField id="gender" label="Gender" options={["Male", "Female", "Other"]} value={formData.gender} onChange={handleInputChange} />
                  <SelectField id="workType" label="Work Type" options={["Online", "Onsite", "Both"]} value={formData.workType} onChange={handleInputChange} />
                  <InputField id="specialtyType" label="Specialty Type" value={formData.specialtyType} onChange={handleInputChange} />
                  <InputFieldWithIcon id="workingTime" label="Working Time" icon={<AiOutlineClockCircle className="absolute right-4 top-4 text-gray-400 group-focus-within:text-primary transition-colors" />} value={formData.workingTime} onChange={handleInputChange} />
                  <InputFieldWithIcon id="checkupTime" label="Check-Up Time" icon={<AiOutlineClockCircle className="absolute right-4 top-4 text-gray-400 group-focus-within:text-primary transition-colors" />} value={formData.checkupTime} onChange={handleInputChange} />
                  <InputFieldWithIcon id="breakTime" label="Break Time" icon={<AiOutlineClockCircle className="absolute right-4 top-4 text-gray-400 group-focus-within:text-primary transition-colors" />} value={formData.breakTime} onChange={handleInputChange} />
                  <InputField id="experience" label="Experience" value={formData.experience} onChange={handleInputChange} />
                  <InputField id="age" label="Age" value={formData.age} onChange={handleInputChange} />
                  <InputField id="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} />
                  <InputField id="email" label="Doctor Email" type="email" value={formData.email} onChange={handleInputChange} />
                  <SelectField id="country" label="Country" options={countryData.map((country) => country.name)} value={formData.country} onChange={handleInputChange} />
                  <SelectField id="state" label="State" options={filteredStates.map((state) => state.name)} value={formData.state} onChange={handleInputChange} />
                  <SelectField id="city" label="City" options={filteredCities.map((city) => city.name)} value={formData.city} onChange={handleInputChange} />
                  <InputField id="zipCode" label="Zip Code" value={formData.zipCode} onChange={handleInputChange} />
                  <InputField id="address" label="Doctor Address" value={formData.address} onChange={handleInputChange} />
                  <InputField id="description" label="Description" value={formData.description} onChange={handleInputChange} />
                  <InputField id="onlineConsultationRate" label="Online Consultation Rate" placeholder="₹ 0000" value={formData.onlineConsultationRate} onChange={handleInputChange} />
                </div>
              </div>

              {/* Conditional Hospital Fields */}
              {showHospitalFields && (
                <div className="bg-gray-50/50 p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm animate-slide-up">
                  <h3 className="text-xl font-extrabold text-secondary tracking-tight mb-6">Hospital Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InputField id="doctorCurrentHospital" label="Doctor Current Hospital" value={formData.doctorCurrentHospital} onChange={handleInputChange} />
                    <InputField id="hospitalName" label="Hospital Name" value={formData.hospitalName} onChange={handleInputChange} />
                    <InputField id="hospitalAddress" label="Hospital Address" value={formData.hospitalAddress} onChange={handleInputChange} />
                    <InputField id="websiteLink" label="Hospital Website Link" value={formData.websiteLink} onChange={handleInputChange} />
                    <InputField id="emergencyContactNumber" label="Emergency Contact Number" value={formData.emergencyContactNumber} onChange={handleInputChange} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8 border-t border-gray-100 pt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary hover:to-primary text-white font-bold px-10 py-3 rounded-2xl shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// InputField component
const InputField = ({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
}) => (
  <div className="relative group">
    <input
      type={type}
      id={id}
      name={id}
      className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 font-medium text-gray-700 placeholder-transparent peer"
      placeholder={placeholder || `Enter ${label}`}
      value={value || ''}
      onChange={onChange}
    />
    <label
      htmlFor={id}
      className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs"
    >
      {label} <span className="text-red-500">*</span>
    </label>
  </div>
);

// SelectField component
const SelectField = ({ id, label, options, value, onChange }) => (
  <div className="relative group">
    <select
      id={id}
      name={id}
      className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 font-medium text-gray-700 peer appearance-none cursor-pointer"
      value={value || ''}
      onChange={onChange}
    >
      <option value="" disabled hidden>{`Select ${label}`}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <label
      htmlFor={id}
      className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-500 transition-all peer-focus:text-primary"
    >
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
    </div>
  </div>
);

// InputFieldWithIcon component
const InputFieldWithIcon = ({ id, label, icon, value, onChange }) => {
  const defaultPlaceholder =
    label === "Working Time"
      ? "EX: 09:00 AM - 06:00 PM"
      : label === "Check-Up Time"
      ? "EX: 10:00 AM - 12:00 PM"
      : label === "Break Time"
      ? "EX: 12:00 PM - 01:00 PM"
      : `Enter ${label}`;

  return (
    <div className="relative group">
      <input
        type="text"
        id={id}
        name={id}
        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 font-medium text-gray-700 placeholder-transparent peer pr-12"
        placeholder={defaultPlaceholder}
        value={value || ''}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs"
      >
        {label} <span className="text-red-500">*</span>
      </label>
      {icon}
    </div>
  );
};


export default AddDoctorForm;

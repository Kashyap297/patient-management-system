import React, { useState } from "react";
import { AiOutlineCamera, AiOutlineClockCircle } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/api";
import countryData from "../../countryjson/countries+states+cities.json"; // Assuming the file path

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

      Swal.fire({
        icon: "success",
        title: "Doctor added successfully!",
        confirmButtonText: "OK",
      });
      navigate("/admin/doctor-management");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error in adding doctor",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex flex-col w-full px-4 py-4 bg-white rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="border border-gray-300 rounded-lg px-4 py-4"
        >
          <h2 className="text-2xl font-bold mb-4">Add New Doctor</h2>

          <div className="flex justify-between gap-8">
            <div className="flex flex-col w-1/6">
              <div className="relative mb-4 flex flex-col items-center">
                <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
                  {profilePhoto ? (
                    <img
                      src={URL.createObjectURL(profilePhoto)}
                      alt="Profile"
                      className="rounded-full w-full h-full"
                    />
                  ) : (
                    <AiOutlineCamera className="text-gray-400 text-3xl" />
                  )}
                </div>
                <label className="mt-2 text-blue-500 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    name="profile"
                    onChange={handlePhotoUpload}
                  />
                  Choose Photo
                </label>
              </div>

              <div className="mb-4">
                <label className="text-gray-700 text-sm font-medium">
                  Upload Signature
                </label>
                <div className="flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl p-5 w-full mt-2 h-48">
                  <div className="flex align-middle justify-center h-full items-center">
                    {signature ? (
                      <img
                        src={URL.createObjectURL(signature)}
                        alt="Signature"
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <div>
                        <div className="flex justify-center">
                          <FiUpload className="text-[#030229] text-2xl" />
                        </div>
                        <div className="text-center mt-2">
                          <label className="text-blue-500 cursor-pointer">
                            <input
                              type="file"
                              className="hidden"
                              name="signature"
                              onChange={handleSignatureUpload}
                            />
                            Upload a file
                          </label>
                          <p className="text-xs text-gray-400">PNG Up To 5MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-10/12 grid grid-cols-3 gap-4">
              <InputField
                id="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <InputField
                id="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <InputField
                id="qualification"
                label="Doctor Qualification"
                value={formData.qualification}
                onChange={handleInputChange}
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <SelectField
                id="gender"
                label="Gender"
                options={["Male", "Female", "Other"]}
                value={formData.gender}
                onChange={handleInputChange}
              />
              <SelectField
                id="workType"
                label="Work Type"
                options={["Online", "Onsite", "Both"]}
                value={formData.workType}
                onChange={handleInputChange}
              />
              <InputField
                id="specialtyType"
                label="Specialty Type"
                value={formData.specialtyType}
                onChange={handleInputChange}
              />
              <InputFieldWithIcon
                id="workingTime"
                label="Working Time"
                icon={
                  <AiOutlineClockCircle className="absolute right-3 top-3 text-gray-400" />
                }
                value={formData.workingTime}
                onChange={handleInputChange}
              />
              <InputFieldWithIcon
                id="checkupTime"
                label="Check-Up Time"
                icon={
                  <AiOutlineClockCircle className="absolute right-3 top-3 text-gray-400" />
                }
                value={formData.checkupTime}
                onChange={handleInputChange}
              />
              <InputFieldWithIcon
                id="breakTime"
                label="Break Time"
                icon={
                  <AiOutlineClockCircle className="absolute right-3 top-3 text-gray-400" />
                }
                value={formData.breakTime}
                onChange={handleInputChange}
              />
              <InputField
                id="experience"
                label="Experience"
                value={formData.experience}
                onChange={handleInputChange}
              />
              <InputField
                id="age"
                label="Age"
                value={formData.age}
                onChange={handleInputChange}
              />
              <InputField
                id="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <InputField
                id="email"
                label="Doctor Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <SelectField
                id="country"
                label="Country"
                options={countryData.map((country) => country.name)}
                value={formData.country}
                onChange={handleInputChange}
              />
              <SelectField
                id="state"
                label="State"
                options={filteredStates.map((state) => state.name)}
                value={formData.state}
                onChange={handleInputChange}
              />
              <SelectField
                id="city"
                label="City"
                options={filteredCities.map((city) => city.name)}
                value={formData.city}
                onChange={handleInputChange}
              />
              <InputField
                id="zipCode"
                label="Zip Code"
                value={formData.zipCode}
                onChange={handleInputChange}
              />
              <InputField
                id="address"
                label="Doctor Address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <InputField
                id="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <InputField
                id="onlineConsultationRate"
                label="Online Consultation Rate"
                placeholder="₹ 0000"
                value={formData.onlineConsultationRate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Hospital fields (conditionally rendered based on Work Type) */}
          {showHospitalFields && (
            <div className="grid grid-cols-3 gap-4 mt-6">
              <InputField
                id="doctorCurrentHospital"
                label="Doctor Current Hospital"
                value={formData.doctorCurrentHospital}
                onChange={handleInputChange}
              />
              <InputField
                id="hospitalName"
                label="Hospital Name"
                value={formData.hospitalName}
                onChange={handleInputChange}
              />
              <InputField
                id="hospitalAddress"
                label="Hospital Address"
                value={formData.hospitalAddress}
                onChange={handleInputChange}
              />
              <InputField
                id="websiteLink"
                label="Hospital Website Link"
                value={formData.websiteLink}
                onChange={handleInputChange}
              />
              <InputField
                id="emergencyContactNumber"
                label="Emergency Contact Number"
                value={formData.emergencyContactNumber}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-[#f6f8fb] hover:bg-[#0eabeb] text-[#4f4f4f] hover:text-white transi px-12 py-2 rounded-xl flex items-center space-x-2"
            >
              Add 
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
  <div className="relative mb-4">
    <input
      type={type}
      id={id}
      name={id}
      className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
      placeholder={placeholder || `Enter ${label}`}
      value={value}
      onChange={onChange}
    />
    <label
      htmlFor={id}
      className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
    >
      {label}
    </label>
  </div>
);

// SelectField component
const SelectField = ({ id, label, options, value, onChange }) => (
  <div className="relative mb-4">
    <select
      id={id}
      name={id}
      className="peer w-full px-4 py-2 border border-gray-300 rounded-xl text-[#030229] focus:outline-none"
      value={value}
      onChange={onChange}
    >
      <option value="">{`Select ${label}`}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <label
      htmlFor={id}
      className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
    >
      {label}
    </label>
  </div>
);

// InputFieldWithIcon component
const InputFieldWithIcon = ({ id, label, icon, value, onChange }) => (
  <div className="relative mb-4">
    <input
      type="text"
      id={id}
      name={id}
      className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
      placeholder={`Enter ${label}`}
      value={value}
      onChange={onChange}
    />
    <label
      htmlFor={id}
      className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200"
    >
      {label}
    </label>
    {icon}
  </div>
);

export default AddDoctorForm;

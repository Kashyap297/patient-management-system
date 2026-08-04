import React, { useEffect, useState } from "react";
import { AiOutlineCamera, AiOutlineClockCircle } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { FaChevronLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Swal from "sweetalert2";
import countryData from "../../countryjson/countries+states+cities.json";
import toast from "react-hot-toast";

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    doctorQualification: "",
    specialtyType: "",
    checkUpTime: "",
    phoneNumber: "",
    country: "",
    zipCode: "",
    onlineConsultationRate: "",
    gender: "",
    workOn: "",
    state: "",
    city: "",
    doctorAddress: "",
    description: "",
    experience: "",
    workingTime: "",
    breakTime: "",
    age: "",
    doctorEmail: "",
    hospitalName: "",
    hospitalAddress: "",
    emergencyContact: "",
    hospitalWebsite: "",
    doctorCurrentHospital: "",
  });

  const [showHospitalFields, setShowHospitalFields] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [signatureImagePreview, setSignatureImagePreview] = useState(null);

  // For dynamically filtered states and cities
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await api.get(`/users/doctors/${id}`);
        const doctor = response.data;

        setFormData({
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          doctorQualification: doctor.doctorDetails.qualification,
          specialtyType: doctor.doctorDetails.specialtyType,
          checkUpTime: doctor.doctorDetails.workingHours.checkupTime,
          phoneNumber: doctor.phoneNumber,
          country: doctor.doctorDetails.country,
          zipCode: doctor.doctorDetails.zipCode,
          onlineConsultationRate: doctor.doctorDetails.onlineConsultationRate,
          gender: doctor.gender,
          workOn: doctor.doctorDetails.workType,
          state: doctor.state,
          city: doctor.city,
          doctorAddress: doctor.address,
          description: doctor.doctorDetails.description,
          experience: doctor.doctorDetails.experience,
          workingTime: doctor.doctorDetails.workingHours.workingTime,
          breakTime: doctor.doctorDetails.workingHours.breakTime,
          age: doctor.age,
          doctorEmail: doctor.email,
          hospitalName: doctor.doctorDetails.hospital.hospitalName,
          hospitalAddress: doctor.doctorDetails.hospital.hospitalAddress,
          emergencyContact:
            doctor.doctorDetails.hospital.emergencyContactNumber,
          hospitalWebsite: doctor.doctorDetails.hospital.websiteLink,
          doctorCurrentHospital: doctor.doctorDetails.hospital.currentHospital,
        });

        // Set preview images
        setProfileImagePreview(
          `${doctor.profileImage}`
        );
        setSignatureImagePreview(
          `${doctor.signatureImage}`
        );

        // Conditionally show hospital fields
        setShowHospitalFields(
          doctor.doctorDetails.workType === "Online" ||
            doctor.doctorDetails.workType === "Both"
        );

        // Populate states and cities if country and state are present
        const selectedCountry = countryData.find(
          (c) => c.name === doctor.doctorDetails.country
        );
        if (selectedCountry) {
          setFilteredStates(selectedCountry.states);
          const selectedState = selectedCountry.states.find(
            (s) => s.name === doctor.state
          );
          setFilteredCities(selectedState ? selectedState.cities : []);
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "country") {
      const selectedCountry = countryData.find(
        (country) => country.name === value
      );
      setFilteredStates(selectedCountry ? selectedCountry.states : []);
      setFilteredCities([]); // Reset cities when country changes
      setFormData((prevData) => ({ ...prevData, state: "", city: "" }));
    }

    if (name === "state") {
      const selectedState = filteredStates.find(
        (state) => state.name === value
      );
      setFilteredCities(selectedState ? selectedState.cities : []);
      setFormData((prevData) => ({ ...prevData, city: "" }));
    }

    if (name === "workOn") {
      setShowHospitalFields(value === "Online" || value === "Both");
    }
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
  
    if (files.length > 0) {
      const file = files[0];
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: file, // ✅ Store File object instead of URL
      }));
  
      // ✅ Set preview for UI updates
      if (name === "profileImage") {
        setProfileImagePreview(URL.createObjectURL(file));
      } else if (name === "signatureImage") {
        setSignatureImagePreview(URL.createObjectURL(file));
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    
    // Append all form fields (excluding files)
    Object.keys(formData).forEach((key) => {
      if (
        formData[key] !== null &&
        formData[key] !== undefined &&
        key !== "profileImage" &&
        key !== "signatureImage" // Exclude files for separate handling
      ) {
        formDataToSend.append(key, formData[key]);
      }
    });
  
    // ✅ Append Images Properly
    if (formData.profileImage instanceof File) {
      formDataToSend.append("profileImage", formData.profileImage);
    }
    if (formData.signatureImage instanceof File) {
      formDataToSend.append("signatureImage", formData.signatureImage);
    }
  
    try {
      const response = await api.patch(`/users/doctors/${id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      toast.success("Doctor updated successfully!");
      navigate("/admin/doctor-management");
    } catch (error) {
      console.error("Error updating doctor:", error.response?.data || error);
      toast.error("Failed to update Doctor profile.");
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
          encType="multipart/form-data"
          className="glass p-6 md:p-8 rounded-3xl shadow-sm border border-white/50"
        >
          <div className="mb-8 flex items-center gap-4">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-full bg-white shadow-sm hover:bg-gray-50 text-gray-600 transition-colors border border-gray-100 flex items-center justify-center"
            >
              <FaChevronLeft size={16} />
            </button>
            <div>
              <h2 className="text-3xl font-extrabold text-secondary tracking-tight">
                Edit Doctor Detail
              </h2>
              <p className="text-sm text-gray-500 mt-2 font-medium">Update the details of the doctor in the system.</p>
            </div>
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
                    name="profileImage"
                    onChange={handleImageChange}
                  />
                  {profileImagePreview ? (
                    <img
                      src={profileImagePreview}
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
                    name="signatureImage"
                    onChange={handleImageChange}
                  />
                  {signatureImagePreview ? (
                    <img
                      src={signatureImagePreview}
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
                  <InputField id="firstName" label="First Name" value={formData.firstName} onChange={handleChange} />
                  <InputField id="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} />
                  <InputField id="doctorQualification" label="Doctor Qualification" value={formData.doctorQualification} onChange={handleChange} />
                  <SelectField id="gender" label="Gender" options={["Male", "Female", "Other"]} value={formData.gender} onChange={handleChange} />
                  <InputField id="specialtyType" label="Specialty Type" value={formData.specialtyType} onChange={handleChange} />
                  <SelectField id="workOn" label="Work On" options={["Online", "Onsite", "Both"]} value={formData.workOn} onChange={handleChange} />
                  <InputFieldWithIcon id="workingTime" label="Working Time" icon={<AiOutlineClockCircle className="absolute right-4 top-4 text-gray-400 group-focus-within:text-primary transition-colors" />} value={formData.workingTime} onChange={handleChange} />
                  <InputFieldWithIcon id="checkUpTime" label="Check-Up Time" icon={<AiOutlineClockCircle className="absolute right-4 top-4 text-gray-400 group-focus-within:text-primary transition-colors" />} value={formData.checkUpTime} onChange={handleChange} />
                  <InputFieldWithIcon id="breakTime" label="Break Time" icon={<AiOutlineClockCircle className="absolute right-4 top-4 text-gray-400 group-focus-within:text-primary transition-colors" />} value={formData.breakTime} onChange={handleChange} />
                  <InputField id="experience" label="Experience" value={formData.experience} onChange={handleChange} />
                  <InputField id="age" label="Age" value={formData.age} onChange={handleChange} />
                  <InputField id="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
                  <InputField id="doctorEmail" label="Doctor Email" type="email" value={formData.doctorEmail} onChange={handleChange} />
                  <SelectField id="country" label="Country" options={countryData.map((country) => country.name)} value={formData.country} onChange={handleChange} />
                  <SelectField id="state" label="State" options={filteredStates.map((state) => state.name)} value={formData.state} onChange={handleChange} />
                  <SelectField id="city" label="City" options={filteredCities.map((city) => city.name)} value={formData.city} onChange={handleChange} />
                  <InputField id="zipCode" label="Zip Code" value={formData.zipCode} onChange={handleChange} />
                  <InputField id="doctorAddress" label="Doctor Address" value={formData.doctorAddress} onChange={handleChange} />
                  <InputField id="description" label="Description" value={formData.description} onChange={handleChange} />
                  <InputField id="onlineConsultationRate" label="Online Consultation Rate" placeholder="₹ 0000" value={formData.onlineConsultationRate} onChange={handleChange} />
                </div>
              </div>

              {/* Conditionally Render Hospital Information */}
              {showHospitalFields && (
                <div className="bg-gray-50/50 p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm animate-slide-up">
                  <h3 className="text-xl font-extrabold text-secondary tracking-tight mb-6">Hospital Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InputField id="doctorCurrentHospital" label="Doctor Current Hospital" value={formData.doctorCurrentHospital} onChange={handleChange} />
                    <InputField id="hospitalName" label="Hospital Name" value={formData.hospitalName} onChange={handleChange} />
                    <InputField id="hospitalAddress" label="Hospital Address" value={formData.hospitalAddress} onChange={handleChange} />
                    <InputField id="hospitalWebsite" label="Hospital Website Link" value={formData.hospitalWebsite} onChange={handleChange} />
                    <InputField id="emergencyContact" label="Emergency Contact Number" value={formData.emergencyContact} onChange={handleChange} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-8 border-t border-gray-100 pt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary hover:to-primary text-white font-bold px-10 py-3 rounded-2xl shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Input field components
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

const InputFieldWithIcon = ({ id, label, icon, value, onChange }) => (
  <div className="relative group">
    <input
      type="text"
      id={id}
      name={id}
      className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 font-medium text-gray-700 placeholder-transparent peer pr-12"
      placeholder={`Enter ${label}`}
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

export default EditDoctor;

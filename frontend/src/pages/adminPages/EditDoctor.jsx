import React, { useEffect, useState } from "react";
import { AiOutlineCamera, AiOutlineClockCircle } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Swal from "sweetalert2";

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
          emergencyContact: doctor.doctorDetails.hospital.emergencyContactNumber,
          hospitalWebsite: doctor.doctorDetails.hospital.websiteLink,
          doctorCurrentHospital: doctor.doctorDetails.hospital.currentHospital,
        });

        // Set preview images
        setProfileImagePreview(`http://localhost:8000/${doctor.profileImage}`);
        setSignatureImagePreview(`http://localhost:8000/${doctor.signatureImage}`);

        // Conditionally show hospital fields
        setShowHospitalFields(doctor.doctorDetails.workType === "Online" || doctor.doctorDetails.workType === "Both");
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Toggle hospital fields based on "workOn" value
    if (name === "workOn") {
      setShowHospitalFields(value === "Online" || value === "Both");
    }
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({ ...prevData, [name]: file }));

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
    
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataToSend.append(key, String(formData[key]));
      }
    });
  
    try {
      const response = await api.patch(`/users/doctors/${id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Server response:", response.data);
  
      Swal.fire({
        icon: "success",
        title: "Doctor Edited successfully!",
        confirmButtonText: "OK",
      });
  
      navigate("/admin/doctor-management");
    } catch (error) {
      console.error("Error updating doctor:", error.response?.data || error);
      Swal.fire({
        icon: "error",
        title: "Error in editing doctor",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex flex-col w-full px-4 py-4 bg-white rounded-lg shadow-lg">
        <div className="border border-gray-300 rounded-lg px-4 py-4">
          <h2 className="text-2xl font-bold mb-4">Edit Doctor Detail</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="flex justify-between gap-8">
              {/* Profile Image Section */}
              <div className="flex flex-col w-1/6">
                {/* Profile Image Upload */}
                <div className="relative mb-4 flex flex-col items-center">
                  <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
                    {profileImagePreview ? (
                      <img
                        src={profileImagePreview}
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
                      name="profileImage"
                      onChange={handleImageChange}
                    />
                    Choose Photo
                  </label>
                </div>

                {/* Signature Image Upload */}
                <div className="mb-4">
                  <label className="text-gray-700 text-sm font-medium">Upload Signature</label>
                  <div className="flex-col items-center justify-center border border-dashed border-gray-300 rounded-xl p-10 w-full mt-2">
                    {signatureImagePreview ? (
                      <img
                        src={signatureImagePreview}
                        alt="Signature"
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <div className="flex justify-center">
                        <FiUpload className="text-gray-500 text-2xl" />
                      </div>
                    )}
                    <div className="text-center mt-2">
                      <label className="text-blue-500 cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          name="signatureImage"
                          onChange={handleImageChange}
                        />
                        Upload a file
                      </label>
                      <p className="text-xs text-gray-400">PNG Up To 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Info Section */}
              <div className="w-10/12 grid grid-cols-3 gap-4">
                <InputField id="firstName" label="First Name" value={formData.firstName} onChange={handleChange} />
                <InputField id="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} />
                <InputField id="doctorQualification" label="Doctor Qualification" value={formData.doctorQualification} onChange={handleChange} />
                <SelectField id="gender" label="Gender" options={["Male", "Female", "Other"]} value={formData.gender} onChange={handleChange} />
                <InputField id="specialtyType" label="Specialty Type" value={formData.specialtyType} onChange={handleChange} />
                <SelectField id="workOn" label="Work On" options={["Online", "Onsite", "Both"]} value={formData.workOn} onChange={handleChange} />
                <InputFieldWithIcon id="workingTime" label="Working Time" icon={<AiOutlineClockCircle className="absolute right-3 top-3 text-gray-400" />} value={formData.workingTime} onChange={handleChange} />
                <InputFieldWithIcon id="checkUpTime" label="Check-Up Time" icon={<AiOutlineClockCircle className="absolute right-3 top-3 text-gray-400" />} value={formData.checkUpTime} onChange={handleChange} />
                <InputFieldWithIcon id="breakTime" label="Break Time" icon={<AiOutlineClockCircle className="absolute right-3 top-3 text-gray-400" />} value={formData.breakTime} onChange={handleChange} />
                <InputField id="experience" label="Experience" value={formData.experience} onChange={handleChange} />
                <InputField id="age" label="Age" value={formData.age} onChange={handleChange} />
                <InputField id="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
                <InputField id="doctorEmail" label="Doctor Email" type="email" value={formData.doctorEmail} onChange={handleChange} />
                <SelectField id="country" label="Country" options={["India", "USA"]} value={formData.country} onChange={handleChange} />
                <SelectField id="state" label="State" options={["California", "Texas"]} value={formData.state} onChange={handleChange} />
                <SelectField id="city" label="City" options={["Los Angeles", "San Francisco"]} value={formData.city} onChange={handleChange} />
                <InputField id="zipCode" label="Zip Code" value={formData.zipCode} onChange={handleChange} />
                <InputField id="doctorAddress" label="Doctor Address" value={formData.doctorAddress} onChange={handleChange} />
                <InputField id="description" label="Description" value={formData.description} onChange={handleChange} />
                <InputField id="onlineConsultationRate" label="Online Consultation Rate" placeholder="₹ 0000" value={formData.onlineConsultationRate} onChange={handleChange} />
              </div>
            </div>

            {/* Conditionally Render Hospital Information */}
            {showHospitalFields && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                <InputField id="doctorCurrentHospital" label="Doctor Current Hospital" value={formData.doctorCurrentHospital} onChange={handleChange} />
                <InputField id="hospitalName" label="Hospital Name" value={formData.hospitalName} onChange={handleChange} />
                <InputField id="hospitalAddress" label="Hospital Address" value={formData.hospitalAddress} onChange={handleChange} />
                <InputField id="hospitalWebsite" label="Hospital Website Link" value={formData.hospitalWebsite} onChange={handleChange} />
                <InputField id="emergencyContact" label="Emergency Contact Number" value={formData.emergencyContact} onChange={handleChange} />
              </div>
            )}

            <div className="flex justify-end">
              <button type="submit" className="mt-4 py-2 px-8 bg-[#f6f8fb] text-[#4f4f4f] hover:bg-[#0eabeb] hover:text-white rounded-xl">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Input field components
const InputField = ({ id, label, type = "text", placeholder = "", value, onChange }) => (
  <div className="relative mb-4">
    <input type={type} id={id} name={id} className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none" placeholder={placeholder || `Enter ${label}`} value={value} onChange={onChange} />
    <label htmlFor={id} className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200">{label}</label>
  </div>
);

const SelectField = ({ id, label, options, value, onChange }) => (
  <div className="relative mb-4">
    <select id={id} name={id} className="peer w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-500 focus:outline-none" value={value} onChange={onChange}>
      <option value="">{`Select ${label}`}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    <label htmlFor={id} className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200">{label}</label>
  </div>
);

const InputFieldWithIcon = ({ id, label, icon, value, onChange }) => (
  <div className="relative mb-4">
    <input type="text" id={id} name={id} className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none" placeholder={`Enter ${label}`} value={value} onChange={onChange} />
    <label htmlFor={id} className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 peer-focus:-top-2.5 peer-focus:left-3 transition-all duration-200">{label}</label>
    {icon}
  </div>
);

export default EditDoctor;

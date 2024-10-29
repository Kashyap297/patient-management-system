import React, { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Assuming you have the right import now
import { AiOutlineCamera } from "react-icons/ai";
import Swal from "sweetalert2";

const PatientEditProfile = () => {
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    dob: "",
    age: "",
    bloodGroup: "",
    height: "",
    weight: "",
    country: "",
    state: "",
    city: "",
    address: "",
    profileImage: null, // For the profile image upload
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch patient data and pre-fill the form
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const patientId = decodedToken.id;
          const response = await api.get(`/users/patients/${patientId}`);
          const patient = response.data;

          setFormData({
            firstName: patient.firstName,
            lastName: patient.lastName,
            phoneNumber: patient.phoneNumber,
            email: patient.email,
            gender: patient.gender,
            dob: new Date(patient.dateOfBirth).toISOString().split('T')[0],
            age: patient.age,
            bloodGroup: patient.bloodGroup,
            height: patient.height,
            weight: patient.weight,
            country: patient.country,
            state: patient.state,
            city: patient.city,
            address: patient.address,
          });

          setProfileImagePreview(`http://localhost:8000/${patient.profileImage}`);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({ ...prevData, [name]: file }));
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creating FormData object
    const formDataToSend = new FormData();

    // Add validation logic if needed
    let validationErrors = {};

    // Basic validation
    if (!formData.firstName) validationErrors.firstName = "First Name is required";
    if (!formData.lastName) validationErrors.lastName = "Last Name is required";
    if (!formData.phoneNumber) validationErrors.phoneNumber = "Phone number is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.gender) validationErrors.gender = "Gender is required";
    if (!formData.dob) validationErrors.dob = "Date of birth is required";
    if (!formData.age) validationErrors.age = "Age is required";
    if (!formData.height) validationErrors.height = "Height is required";
    if (!formData.weight) validationErrors.weight = "Weight is required";
    if (!formData.country) validationErrors.country = "Country is required";
    if (!formData.state) validationErrors.state = "State is required";
    if (!formData.city) validationErrors.city = "City is required";
    if (!formData.address) validationErrors.address = "Address is required";

    // If there are validation errors, stop the process and show the errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Append text fields
    for (const key in formData) {
      if (key !== "profileImage" && formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Append the image file only if it exists
    if (formData.profileImage) {
      formDataToSend.append("profileImage", formData.profileImage);  // This key should match the Multer field
    }

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const patientId = decodedToken.id;

        await api.patch(`/users/patients/${patientId}`, formDataToSend, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",  // Let browser set this for FormData
          },
        });

        Swal.fire({
          icon: "success",
          title: "Profile updated successfully!",
          confirmButtonText: "OK",
        });

        navigate("/patient"); // Redirect after success
      }
    } catch (err) {
      console.error("Error updating patient profile:", err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="relative py-16 px-24">
      {/* Gradient Background Header */}
      <div
        className="absolute top-0 left-0 right-0 h-64"
        style={{
          background: "linear-gradient(107.38deg, #4C49ED 2.61%, #020067 101.2%)",
        }}
      />
      <h2 className="absolute top-12 left-18 text-3xl font-semibold text-white z-20">
        Profile Setting
      </h2>

      <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 flex mt-8">
        {/* Left Side: Profile Picture */}
        <div className="flex flex-col items-center w-1/5 border-r pr-8">
          <div className="relative w-48 h-48 mb-4">
            <img
              src={profileImagePreview ? profileImagePreview : "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <label className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-md mt-2 hover:bg-gray-200 cursor-pointer">
            <AiOutlineCamera className="text-gray-500" />
            <span>Change Profile</span>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Right Side: Editable Profile Form */}
        <form className="w-4/5 pl-8" onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold mb-6">Edit Profile</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative mb-4">
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder=" "
                value={formData.firstName}
                onChange={handleChange}
              />
              <label
                htmlFor="firstName"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
              >
                First Name
              </label>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder=" "
                value={formData.lastName}
                onChange={handleChange}
              />
              <label
                htmlFor="lastName"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
              >
                Last Name
              </label>
            </div>


            {/* Phone Number */}
            <div className="relative mb-4">
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder=" "
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <label
                htmlFor="phoneNumber"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
              >
                Phone Number<span className="text-red-500">*</span>
              </label>
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>

            {/* Email */}
            <div className="relative mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
              />
              <label
                htmlFor="email"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
              >
                Email<span className="text-red-500">*</span>
              </label>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Gender */}
            <div className="relative mb-4">
              <select
                id="gender"
                name="gender"
                className="peer w-full px-4 py-2 border border-gray-300 text-sm font-normal text-gray-500 rounded-md focus:outline-none"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label
                htmlFor="gender"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
              >
                Gender<span className="text-red-500">*</span>
              </label>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>

            {/* DOB */}
            <div className="relative mb-4">
              <input
                type="date"
                id="dob"
                name="dob"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                value={formData.dob}
                onChange={handleChange}
              />
              <label
                htmlFor="dob"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
              >
                Date of Birth<span className="text-red-500">*</span>
              </label>
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
            </div>

            {/* Age */}
            <div className="relative mb-4">
              <input
                type="number"
                id="age"
                name="age"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder=" "
                value={formData.age}
                onChange={handleChange}
              />
              <label
                htmlFor="age"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
              >
                Age<span className="text-red-500">*</span>
              </label>
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>

            {/* Blood Group */}
            <div className="relative mb-4">
              <select
                id="bloodGroup"
                name="bloodGroup"
                className="peer w-full px-4 py-2 border border-gray-300 text-sm font-normal text-gray-500 rounded-md focus:outline-none"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="O-">O-</option>
                <option value="AB-">AB-</option>
              </select>
              <label
                htmlFor="bloodGroup"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
              >
                Blood Group<span className="text-red-500">*</span>
              </label>
              {errors.bloodGroup && <p className="text-red-500 text-sm">{errors.bloodGroup}</p>}
            </div>

            {/* Height */}
            <div className="relative mb-4">
              <input
                type="number"
                id="height"
                name="height"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder=" "
                value={formData.height}
                onChange={handleChange}
              />
              <label
                htmlFor="height"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
              >
                Height (cm)<span className="text-red-500">*</span>
              </label>
              {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
            </div>

            {/* Weight */}
            <div className="relative mb-4">
              <input
                type="number"
                id="weight"
                name="weight"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder=" "
                value={formData.weight}
                onChange={handleChange}
              />
              <label
                htmlFor="weight"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
              >
                Weight (kg)<span className="text-red-500">*</span>
              </label>
              {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
            </div>

            {/* Country */}
            <div className="relative mb-4">
              <input
                type="text"
                id="country"
                name="country"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder=" "
                value={formData.country}
                onChange={handleChange}
              />
              <label
                htmlFor="country"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
              >
                Country<span className="text-red-500">*</span>
              </label>
              {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
            </div>

            {/* State */}
            <div className="relative mb-4">
              <input
                type="text"
                id="state"
                name="state"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder=" "
                value={formData.state}
                onChange={handleChange}
              />
              <label
                htmlFor="state"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
              >
                State<span className="text-red-500">*</span>
              </label>
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>

            {/* City */}
            <div className="relative mb-4">
              <input
                type="text"
                id="city"
                name="city"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder=" "
                value={formData.city}
                onChange={handleChange}
              />
              <label
                htmlFor="city"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
              >
                City<span className="text-red-500">*</span>
              </label>
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>

            {/* Address */}
            <div className="relative mb-4 col-span-3">
              <input
                type="text"
                id="address"
                name="address"
                className="peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder=" "
                value={formData.address}
                onChange={handleChange}
              />
              <label
                htmlFor="address"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200"
              >
                Address<span className="text-red-500">*</span>
              </label>
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6 col-span-3">
            <button
              type="button"
              className="px-6 py-2 rounded bg-gray-200 text-gray-700"
              onClick={() => navigate("/patient")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded bg-blue-500 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientEditProfile;
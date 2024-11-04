import React, { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api/api"; // Ensure to import your Axios instance
import userImage from "../../assets/images/user.png";
import Swal from "sweetalert2";
import ProfileHeader from "./ProfileHeader";

const DoctorEditProfile = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    adminhospital: "", // Updated to use the adminhospital field
    gender: "Male", // Default selection
    city: "",
    state: "",
    country: "",
    profileImage: "",
  });

  const [hospitals, setHospitals] = useState([]);
  const fileInputRef = React.useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/users/profile");
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          adminhospital: response.data.adminhospital?._id || "", // Set the hospital ID
          gender: response.data.gender || "Male", // Default gender to Male if undefined
          city: response.data.city,
          state: response.data.state,
          country: response.data.country,
          profileImage: response.data.profileImage,
        });
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    const fetchHospitals = async () => {
      try {
        const response = await api.get("/hospitals");
        if (response.data && Array.isArray(response.data.data)) {
          setHospitals(response.data.data);
        } else {
          console.error("Data is not an array");
          setHospitals([]);
        }
      } catch (error) {
        console.error("Failed to load hospitals.", error);
        setHospitals([]);
      }
    };

    fetchProfileData();
    fetchHospitals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        profileImage: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();

    // Add main fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "profileImage") {
        formDataObj.append(key, value);
      }
    });

    // Add profile image if it's a File instance
    if (formData.profileImage instanceof File) {
      formDataObj.append("profileImage", formData.profileImage);
    }

    try {
      // Add the Authorization header with the token
      await api.patch("/users/profile", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
      });
      Swal.fire({
        icon: "success",
        title: "Profile Updated successfully!!",
        confirmButtonText: "OK",
      });
      navigate("/doctor");
    } catch (error) {
      console.error("Error updating profile", error);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="relative bg-gray-100 py-16 px-36 pb-48 h-full">
      <ProfileHeader title="Profile Setting" />
      <div className="flex flex-col md:flex-row w-full mt-8 mx-auto bg-white shadow-lg rounded-lg overflow-hidden z-10 relative h-full">
        <div className="w-1/4 p-12 text-center border-r">
          <img
            src={
              formData.profileImage && !(formData.profileImage instanceof File)
                ? `http://localhost:8000/${formData.profileImage}`
                : userImage
            }
            alt="Profile"
            className="w-48 h-48 mx-auto rounded-full mb-4"
          />
          <div className="flex justify-center">
            <button
              onClick={() => fileInputRef.current.click()}
              className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl mt-2 hover:bg-gray-200"
            >
              <FiCamera className="text-[#030229]" />
              <span>Change Profile</span>
            </button>
            <input
              type="file"
              name="profileImage"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
        </div>
        <div className="w-3/4 p-6">
          <h3 className="text-2xl font-semibold mb-6">Edit Profile</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
            {/* First Name */}
            <div className="relative mb-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 px-4 rounded-xl"
                placeholder="First Name"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200">
                First Name <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Last Name */}
            <div className="relative mb-4">
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 px-4 rounded-xl"
                placeholder="Last Name"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200">
                Last Name <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Email */}
            <div className="relative mb-4">
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 px-4 rounded-xl"
                placeholder="Email Address"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200">
                Email Address <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Phone Number */}
            <div className="relative mb-4">
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 px-4 rounded-xl"
                placeholder="Phone Number"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200">
                Phone Number <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Gender */}
            <div className="relative mb-4">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 px-4 rounded-xl"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200">
                Gender <span className="text-red-500">*</span>
              </label>
            </div>

            {/* City */}
            <div className="relative mb-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 px-4 rounded-xl"
                placeholder="City"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200">
                City <span className="text-red-500">*</span>
              </label>
            </div>

            {/* State */}
            <div className="relative mb-4">
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 px-4 rounded-xl"
                placeholder="State"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200">
                State <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Country */}
            <div className="relative mb-4">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 px-4 rounded-xl"
                placeholder="Country"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200">
                Country <span className="text-red-500">*</span>
              </label>
            </div>
          </form>
          <div className="flex justify-end mt-4">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button
                type="button"
                onClick={() => navigate("/doctor")} // Adjust this path as needed
                className="text-gray-700 px-6 py-2 rounded-xl w-full hover:bg-[#f6f8fb] border"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="px-6 py-2 rounded-xl text-white bg-[#0EABEB] w-full"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorEditProfile;

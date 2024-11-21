import React, { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import userImage from "../../assets/images/user.png";
import ProfileHeader from "./ProfileHeader";
import toast from "react-hot-toast";

const AdminEditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    adminhospital: "",
    gender: "Male",
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
          adminhospital: response.data.adminhospital?._id || "",
          gender: response.data.gender || "Male",
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
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "profileImage") formDataObj.append(key, value);
    });
    if (formData.profileImage instanceof File) {
      formDataObj.append("profileImage", formData.profileImage);
    }

    try {
      await api.patch("/users/profile", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Profile updated successfully!");
      navigate("/admin");
    } catch (error) {
      toast.error("Error Updating Profile");
    }
  };

  return (
    <div className="relative bg-gray-100 py-8 sm:py-10 lg:py-16 px-6 sm:px-12 lg:px-36">
      <ProfileHeader title="Profile Setting" />
      <div className="flex flex-col md:flex-row w-full mt-6 md:mt-8 mx-auto bg-white shadow-lg rounded-xl overflow-hidden z-10 relative h-[620px] ">
        <div className="w-full md:w-1/4 p-6 md:p-8 text-center border-b md:border-r">
          <img
            src={
              formData.profileImage && !(formData.profileImage instanceof File)
                ? `https://patient-management-system-vyv0.onrender.com/${formData.profileImage}`
                : userImage
            }
            alt="Profile"
            className="w-24 h-24 md:w-48 md:h-48 mx-auto rounded-full mb-4"
          />
          <div className="flex justify-center">
            <button
              onClick={() => fileInputRef.current.click()}
              className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-xl mt-2 hover:bg-gray-200"
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
        <div className="w-full md:w-3/4 p-6 md:p-8">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">Edit Profile</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* First Name */}
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="First Name"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229]">
                First Name <span className="text-red-500">*</span>
              </label>
            </div>
            {/* Last Name */}
            <div className="relative">
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="Last Name"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229]">
                Last Name <span className="text-red-500">*</span>
              </label>
            </div>
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="Email Address"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229]">
                Email Address <span className="text-red-500">*</span>
              </label>
            </div>
            {/* Phone Number */}
            <div className="relative">
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                placeholder="Phone Number"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229]">
                Phone Number <span className="text-red-500">*</span>
              </label>
            </div>
            {/* Hospital Name */}
            <div className="relative">
              <select
                name="adminhospital"
                value={formData.adminhospital}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              >
                <option value="">Select Hospital</option>
                {hospitals.map((hospital) => (
                  <option key={hospital._id} value={hospital._id}>
                    {hospital.name}
                  </option>
                ))}
              </select>
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229]">
                Hospital Name <span className="text-red-500">*</span>
              </label>
            </div>
            {/* Gender */}
            <div className="relative">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229]">
                Gender <span className="text-red-500">*</span>
              </label>
            </div>
            {/* City, State, Country */}
            {["city", "state", "country"].map((field) => (
              <div key={field} className="relative">
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229]">
                  {field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span>
                </label>
              </div>
            ))}
          </form>
          <div className="flex justify-end mt-4">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="text-gray-700 px-4 py-2 rounded-xl hover:bg-[#f6f8fb] border"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="px-4 py-2 rounded-xl text-white bg-[#0EABEB]"
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

export default AdminEditProfile;

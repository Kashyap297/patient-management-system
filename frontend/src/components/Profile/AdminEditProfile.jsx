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
    <div className="relative min-h-[calc(100vh-80px)] p-6 md:p-8 space-y-8 bg-background overflow-hidden flex flex-col items-center">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>

      <div className="w-full max-w-7xl mx-auto z-10 animate-slide-up">
        {/* Header */}
        <div className="mb-6">
          <ProfileHeader title="Profile Settings" />
        </div>

        {/* Main Container */}
        <div className="flex flex-col md:flex-row w-full bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl overflow-hidden border border-white/50 z-10 relative">
          
          {/* Profile Image Section */}
          <div className="w-full md:w-[320px] bg-gradient-to-b from-primary/5 to-transparent p-8 border-b md:border-b-0 md:border-r border-gray-100/80 flex flex-col items-center justify-center shrink-0">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-full opacity-30 group-hover:opacity-100 transition duration-300 blur"></div>
              <img
                src={
                  formData.profileImage && !(formData.profileImage instanceof File)
                    ? `http://localhost:8000/${formData.profileImage}`
                    : userImage
                }
                alt="Profile"
                className="relative w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-lg z-10"
              />
            </div>
            
            <button
              onClick={() => fileInputRef.current.click()}
              className="mt-6 flex items-center space-x-2 bg-white text-gray-700 px-6 py-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all duration-300 group font-bold"
            >
              <FiCamera className="text-primary group-hover:scale-110 transition-transform" />
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

          {/* Edit Form Area */}
          <div className="w-full flex-1 p-6 md:p-10 relative">
            <h3 className="text-2xl font-extrabold text-secondary tracking-tight mb-8">Edit Profile</h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* First Name */}
              <div className="relative group">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 font-medium text-gray-700 placeholder-transparent peer"
                  placeholder="First Name"
                />
                <label className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs">
                  First Name <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Last Name */}
              <div className="relative group">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 font-medium text-gray-700 placeholder-transparent peer"
                  placeholder="Last Name"
                />
                <label className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs">
                  Last Name <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Email */}
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 font-medium text-gray-700 placeholder-transparent peer"
                  placeholder="Email Address"
                />
                <label className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs">
                  Email Address <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Phone Number */}
              <div className="relative group">
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber || ""}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 font-medium text-gray-700 placeholder-transparent peer"
                  placeholder="Phone Number"
                />
                <label className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs">
                  Phone Number <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Hospital Name */}
              <div className="relative group">
                <select
                  name="adminhospital"
                  value={formData.adminhospital}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 font-medium text-gray-700 appearance-none"
                >
                  <option value="">Select Hospital</option>
                  {hospitals.map((hospital) => (
                    <option key={hospital._id} value={hospital._id}>
                      {hospital.name}
                    </option>
                  ))}
                </select>
                <label className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-primary">
                  Hospital Name <span className="text-red-500">*</span>
                </label>
                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>

              {/* Gender */}
              <div className="relative group">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 font-medium text-gray-700 appearance-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <label className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-primary">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>

              {/* City, State, Country */}
              {["city", "state", "country"].map((field) => (
                <div key={field} className="relative group">
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 font-medium text-gray-700 placeholder-transparent peer"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  />
                  <label className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs">
                    {field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span>
                  </label>
                </div>
              ))}
            </form>

            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="px-8 py-3.5 rounded-2xl font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="px-8 py-3.5 rounded-2xl font-bold bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProfile;

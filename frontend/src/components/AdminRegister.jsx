import React, { useContext, useEffect, useState, useRef } from "react";
import {
  AiOutlineDown,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import SidePanel from "./SidePanel";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import countryData from "../countryjson/countries+states+cities.json"; // Assuming it's in the `countryjson` folder
import toast from "react-hot-toast";
import CustomDropdown from "./CustomDropdown";

const AdminRegister = () => {
  const { registerAdmin, authError } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const hospitalDropdownRef = useRef(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "", // Set default to empty
    state: "",
    city: "",
    hospital: "",
    hospitalName: "", // Hospital name for display
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [hospitalData, setHospitalData] = useState({
    name: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hospitalError, setHospitalError] = useState(null);
  // State for filtered states and cities based on country selection
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/hospitals");
        if (response.data && Array.isArray(response.data.data)) {
          setHospitals(response.data.data);
        } else {
          throw new Error("Data is not an array");
        }
        setLoading(false);
      } catch (error) {
        setHospitalError("Failed to load hospitals.");
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hospitalDropdownRef.current && !hospitalDropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle input changes for the hospital form
  const handleHospitalChange = (e) => {
    const { name, value } = e.target;
    setHospitalData({ ...hospitalData, [name]: value });
  };

  const handleCreateHospital = async (e) => {
    e.preventDefault();
    const hospitalPayload = {
      ...hospitalData,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/hospitals",
        hospitalPayload
      );
      if (response.status === 201) {
        toast.success("Hospital created successfully!");
        setHospitals([...hospitals, response.data.hospital]);
        closeModal();
      }
    } catch (error) {
      toast.error("Failed to create hospital. Please try again.");
      setHospitalError("Failed to create hospital. Please try again.");
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      ); // Log the error response for more information
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setHospitalData({
      name: "",
      address: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.firstName)
      validationErrors.firstName = "First Name is required.";
    if (!formData.lastName)
      validationErrors.lastName = "Last Name is required.";
    if (!formData.email) validationErrors.email = "Email Address is required.";
    if (!formData.phoneNumber)
      validationErrors.phoneNumber = "Phone Number is required.";
    if (!formData.state) validationErrors.state = "State is required.";
    if (!formData.city) validationErrors.city = "City is required.";
    if (!formData.hospital)
      validationErrors.hospital = "Hospital selection is required.";
    if (!formData.password) validationErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      validationErrors.confirmPassword = "Passwords do not match.";
    if (!formData.agreeToTerms)
      validationErrors.agreeToTerms =
        "You must agree to the Terms & Conditions.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const adminData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        hospital: formData.hospital,
      };
      try {
        await registerAdmin(adminData);
        toast.success("Admin registered successfully!");
        navigate("/");
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  // Handle country change and populate the corresponding states
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({ ...formData, country: selectedCountry, state: "", city: "" });

    const country = countryData.find((item) => item.name === selectedCountry);
    if (country) {
      setFilteredStates(country.states || []);
      setFilteredCities([]); // Reset cities when a new country is selected
    }
  };

  // Handle state change and populate the corresponding cities
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: "" });

    const state = filteredStates.find((item) => item.name === selectedState);
    if (state) {
      setFilteredCities(state.cities || []);
    }
  };

  const currentHospitalCountry = countryData.find((item) => item.name === hospitalData.country);
  const hospitalFilteredStates = currentHospitalCountry ? (currentHospitalCountry.states || []) : [];
  const currentHospitalState = hospitalFilteredStates.find((item) => item.name === hospitalData.state);
  const hospitalFilteredCities = currentHospitalState ? (currentHospitalState.cities || []) : [];

  return (
    <div className="min-h-screen flex bg-background font-sans overflow-hidden">
      {/* Left Form Side */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8 relative animate-fade-in z-10 custom-scroll overflow-y-auto">
        
        {/* Decorative blur backgrounds */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
        
        <div className="w-full max-w-xl glass p-10 rounded-3xl relative z-10 animate-slide-up mt-10 mb-10">
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold mb-2 text-secondary">Admin Registration</h2>
            <p className="text-gray-500 font-medium">Register to manage your hospital facility.</p>
          </div>
          {authError && <p className="text-red-500 text-sm font-semibold mb-4 p-3 bg-red-50 rounded-lg">{authError}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* First Name */}
              <div className="relative group">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${
                    errors.firstName ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"
                  }`}
                  placeholder="First Name"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                />
                <label
                  htmlFor="firstName"
                  className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400
                    peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary
                    ${errors.firstName ? "text-red-500" : "text-gray-500"}
                  `}
                >
                  First Name<span className="text-red-500">*</span>
                </label>
                {errors.firstName && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div className="relative group">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${
                    errors.lastName ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"
                  }`}
                  placeholder="Last Name"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                />
                <label
                  htmlFor="lastName"
                  className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400
                    peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary
                    ${errors.lastName ? "text-red-500" : "text-gray-500"}
                  `}
                >
                  Last Name<span className="text-red-500">*</span>
                </label>
                {errors.lastName && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Email */}
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${
                    errors.email ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"
                  }`}
                  placeholder="Email Address"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400
                    peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary
                    ${errors.email ? "text-red-500" : "text-gray-500"}
                  `}
                >
                  Email Address<span className="text-red-500">*</span>
                </label>
                {errors.email && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="relative group">
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${
                    errors.phoneNumber ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"
                  }`}
                  placeholder="Phone Number"
                  value={formData.phoneNumber || ""}
                  onChange={handleChange}
                />
                <label
                  htmlFor="phoneNumber"
                  className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400
                    peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary
                    ${errors.phoneNumber ? "text-red-500" : "text-gray-500"}
                  `}
                >
                  Phone Number<span className="text-red-500">*</span>
                </label>
                {errors.phoneNumber && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.phoneNumber}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Country */}
              <CustomDropdown
                name="country"
                label="Country"
                placeholder="Select Country"
                value={formData.country}
                options={countryData.map(c => ({ label: c.name, value: c.name }))}
                onChange={handleCountryChange}
                error={errors.country}
                styleVariant="main"
              />

              {/* State */}
              <CustomDropdown
                name="state"
                label="State"
                placeholder="Select State"
                value={formData.state}
                options={filteredStates.map(s => ({ label: s.name, value: s.name }))}
                onChange={handleStateChange}
                error={errors.state}
                styleVariant="main"
              />

              {/* City */}
              <CustomDropdown
                name="city"
                label="City"
                placeholder="Select City"
                value={formData.city}
                options={filteredCities.map(c => ({ label: c.name, value: c.name }))}
                onChange={handleChange}
                error={errors.city}
                styleVariant="main"
              />
            </div>

            {/* Hospital Dropdown */}
            <div className="relative group z-20" ref={hospitalDropdownRef}>
              <div
                className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 text-gray-700 cursor-pointer flex justify-between items-center hover:bg-white ${
                  errors.hospital ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"
                }`}
                onClick={toggleDropdown}
              >
                <span className={!formData.hospitalName ? "text-gray-400 font-medium" : "font-medium"}>
                  {formData.hospitalName ? formData.hospitalName : "Select Hospital"}
                </span>
                <AiOutlineDown className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-primary" : "text-gray-500"}`} />
              </div>
              <label className="absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold text-primary pointer-events-none">
                Hospital<span className="text-red-500">*</span>
              </label>

              {isDropdownOpen && (
                <div className="absolute w-full mt-2 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl max-h-60 custom-scroll overflow-y-auto shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-30 animate-fade-in">
                  {loading ? (
                    <div className="px-4 py-4 text-sm text-gray-500 text-center font-medium">Loading hospitals...</div>
                  ) : hospitalError ? (
                    <div className="px-4 py-4 text-sm text-red-500 text-center font-medium">{hospitalError}</div>
                  ) : (
                    <div className="p-2 space-y-1">
                      {hospitals && hospitals.map((hospital, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setFormData({ ...formData, hospital: hospital._id, hospitalName: hospital.name });
                            setIsDropdownOpen(false);
                          }}
                          className="px-4 py-3 text-sm text-gray-700 font-medium rounded-xl hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
                        >
                          {hospital.name}
                        </div>
                      ))}
                      <div className="pt-2 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setShowCreateModal(true); setIsDropdownOpen(false); }}
                          className="w-full bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        >
                          + Create New Hospital
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {errors.hospital && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.hospital}</p>}
            </div>

            {/* Modal Popup for Creating New Hospital */}
            {showCreateModal && (
              <div className="fixed inset-0 flex justify-center items-center bg-secondary/60 backdrop-blur-sm z-[100] animate-fade-in px-4">
                <div className="bg-white p-8 rounded-[2rem] w-full max-w-lg shadow-2xl animate-slide-up">
                  <h2 className="text-2xl font-extrabold mb-6 text-secondary">Create Hospital</h2>
                  <form>
                    <div className="relative mb-6">
                      <input type="text" name="name" className="peer w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-xl outline-none transition-all placeholder-transparent" placeholder="Name" value={hospitalData.name} onChange={handleHospitalChange} required />
                      <label className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-semibold text-gray-500 peer-focus:text-primary peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent pointer-events-none transition-all">Hospital Name<span className="text-red-500">*</span></label>
                    </div>

                    <div className="relative mb-6">
                      <input type="text" name="address" className="peer w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-xl outline-none transition-all placeholder-transparent" placeholder="Address" value={hospitalData.address} onChange={handleHospitalChange} required />
                      <label className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-semibold text-gray-500 peer-focus:text-primary peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent pointer-events-none transition-all">Hospital Address<span className="text-red-500">*</span></label>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <CustomDropdown
                        name="country"
                        label="Country"
                        placeholder="Select Country"
                        value={hospitalData.country}
                        options={countryData.map(c => ({ label: c.name, value: c.name }))}
                        onChange={(e) => { handleHospitalChange(e); setHospitalData({...hospitalData, state: "", city: "", country: e.target.value}); }}
                        styleVariant="modal"
                      />
                      <CustomDropdown
                        name="state"
                        label="State"
                        placeholder="Select State"
                        value={hospitalData.state}
                        options={hospitalFilteredStates.map(s => ({ label: s.name, value: s.name }))}
                        onChange={(e) => { handleHospitalChange(e); setHospitalData({...hospitalData, city: "", state: e.target.value}); }}
                        styleVariant="modal"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <CustomDropdown
                        name="city"
                        label="City"
                        placeholder="Select City"
                        value={hospitalData.city}
                        options={hospitalFilteredCities.map(c => ({ label: c.name, value: c.name }))}
                        onChange={handleHospitalChange}
                        styleVariant="modal"
                      />
                      <div className="relative">
                        <input type="text" name="zipCode" className="peer w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-xl outline-none transition-all placeholder-transparent" placeholder="Zip" value={hospitalData.zipCode} onChange={handleHospitalChange} required />
                        <label className="absolute left-4 -top-2.5 px-2 bg-white text-sm font-semibold text-gray-500 peer-focus:text-primary peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent pointer-events-none transition-all">Zip Code<span className="text-red-500">*</span></label>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button type="button" onClick={closeModal} className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                      <button onClick={handleCreateHospital} type="submit" className="flex-1 py-3 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all">Save Hospital</button>
                    </div>
                    {hospitalError && <p className="text-red-500 text-sm mt-4 text-center font-medium">{hospitalError}</p>}
                  </form>
                </div>
              </div>
            )}

            {/* Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`peer w-full pl-4 pr-12 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${
                    errors.password ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"
                  }`}
                  placeholder="Password"
                  value={formData.password || ""}
                  onChange={handleChange}
                />
                <label
                  htmlFor="password"
                  className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400
                    peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary
                    ${errors.password ? "text-red-500" : "text-gray-500"}
                  `}
                >
                  Password<span className="text-red-500">*</span>
                </label>
                <div className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400 hover:text-primary transition-colors" onClick={togglePasswordVisibility}>
                  {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </div>
                {errors.password && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.password}</p>}
              </div>

              <div className="relative group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`peer w-full pl-4 pr-12 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${
                    errors.confirmPassword ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"
                  }`}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword || ""}
                  onChange={handleChange}
                />
                <label
                  htmlFor="confirmPassword"
                  className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400
                    peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary
                    ${errors.confirmPassword ? "text-red-500" : "text-gray-500"}
                  `}
                >
                  Confirm Password<span className="text-red-500">*</span>
                </label>
                <div className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400 hover:text-primary transition-colors" onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="flex items-center pt-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer transition-colors"
                />
                <span className="text-sm font-medium text-gray-600">
                  I agree to all the{" "}
                  <a href="#" className="text-primary hover:underline font-semibold">T&C</a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline font-semibold">Privacy Policies</a>.
                </span>
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-red-500 text-xs font-semibold ml-8">{errors.agreeToTerms}</p>}

            <button
              type="submit"
              className="w-full mt-4 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold text-lg rounded-2xl hover:shadow-[0_8px_20px_rgba(14,171,235,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              Register Admin
            </button>
          </form>

          <p className="text-center mt-8 text-sm font-medium text-gray-500">
            Already have an account?{" "}
            <Link to="/" className="text-primary font-bold hover:underline hover:text-blue-600 transition-colors">
              Login Here
            </Link>
          </p>
        </div>
      </div>
      
      {/* Right Side Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-secondary overflow-hidden">
        <SidePanel />
      </div>
    </div>
  );
};

export default AdminRegister;

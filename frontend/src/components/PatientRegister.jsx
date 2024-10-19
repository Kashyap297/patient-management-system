import React, { useState } from "react";
import SidePanel from "./SidePanel";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // For password visibility toggle
import axios from "axios";
import api from "../api/api";
// Import country JSON data
import countryData from "../countryjson/countries+states+cities.json";
import { useNavigate } from "react-router-dom";

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    bloodGroup: "",
    dateOfBirth: "",
    country: "",
    state: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle country change to populate states
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({ ...formData, country: selectedCountry, state: "", city: "" });

    const country = countryData.find((item) => item.name === selectedCountry);
    if (country) {
      setFilteredStates(country.states || []);
      setFilteredCities([]); // Reset cities when a new country is selected
    }
  };

  // Handle state change to populate cities
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: "" });

    const state = filteredStates.find((item) => item.name === selectedState);
    if (state) {
      setFilteredCities(state.cities || []);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Frontend validation for required fields
    if (!formData.firstName)
      validationErrors.firstName = "First name is required.";
    if (!formData.lastName)
      validationErrors.lastName = "Last name is required.";
    if (!formData.email) validationErrors.email = "Email is required.";
    if (!formData.phoneNumber)
      validationErrors.phoneNumber = "Phone number is required.";
    if (!formData.age) validationErrors.age = "Age is required.";
    if (!formData.height) validationErrors.height = "Height is required.";
    if (!formData.weight) validationErrors.weight = "Weight is required.";
    if (!formData.gender) validationErrors.gender = "Gender is required.";
    if (!formData.bloodGroup)
      validationErrors.bloodGroup = "Blood group is required.";
    if (!formData.dateOfBirth)
      validationErrors.dateOfBirth = "Date of birth is required.";
    if (!formData.country) validationErrors.country = "Country is required.";
    if (!formData.state) validationErrors.state = "State is required.";
    if (!formData.city) validationErrors.city = "City is required.";
    if (!formData.address) validationErrors.address = "Address is required.";
    if (!formData.password) validationErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const dataToSubmit = {
        ...formData,
        age: formData.age ? parseInt(formData.age) : undefined,
        height: formData.height ? parseInt(formData.height) : undefined,
        weight: formData.weight ? parseInt(formData.weight) : undefined,
      };

      try {
        const response = await api.post(
          "/users/register-patient",
          dataToSubmit
        );
        console.log("Registration successful:", response.data);
        navigate('/')
        setErrors({});
      } catch (error) {
        console.error("Registration failed:", error.response);
        if (error.response && error.response.data.message) {
          setErrors({ apiError: error.response.data.message });
        } else {
          setErrors({ apiError: "An error occurred. Please try again." });
        }
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form Section */}
      <div className="w-1/2 flex justify-center items-center bg-white p-10">
        <div className="w-full max-w-xl bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Registration</h2>
          <form onSubmit={handleSubmit}>
            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <label
                  htmlFor="firstName"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
                >
                  First Name<span className="text-red-500">*</span>
                </label>
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="relative mb-4">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <label
                  htmlFor="lastName"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Last Name<span className="text-red-500">*</span>
                </label>
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email and Phone Number */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative mb-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Email Address<span className="text-red-500">*</span>
                </label>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="relative mb-4">
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
                  placeholder="Enter Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <label
                  htmlFor="phoneNumber"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Phone Number<span className="text-red-500">*</span>
                </label>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Age, Height, Weight */}
            <div className="grid grid-cols-3 gap-4 ">
              <div className="relative mb-4">
                <input
                  type="number"
                  id="age"
                  name="age"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
                  placeholder="Enter Age"
                  value={formData.age}
                  onChange={handleChange}
                />
                <label
                  htmlFor="age"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Age<span className="text-red-500">*</span>
                </label>
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                )}
              </div>
              <div className="relative mb-4">
                <input
                  type="number"
                  id="height"
                  name="height"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
                  placeholder="Enter Height"
                  value={formData.height}
                  onChange={handleChange}
                />
                <label
                  htmlFor="height"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Height (cm)<span className="text-red-500">*</span>
                </label>
                {errors.height && (
                  <p className="text-red-500 text-sm mt-1">{errors.height}</p>
                )}
              </div>
              <div className="relative mb-4">
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
                  placeholder="Enter Weight"
                  value={formData.weight}
                  onChange={handleChange}
                />
                <label
                  htmlFor="weight"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Weight (kg)<span className="text-red-500">*</span>
                </label>
                {errors.weight && (
                  <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                )}
              </div>
            </div>

            {/* Gender, Blood Group, and Date of Birth */}
            <div className="grid grid-cols-3 gap-4 ">
              <div className="relative mb-4">
                <select
                  id="gender"
                  name="gender"
                  className={`peer w-full px-4 py-2 border border-gray-300 text-sm font-normal text-gray-500 rounded-md focus:outline-none focus:ring-0`}
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <label
                  htmlFor="gender"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Gender<span className="text-red-500">*</span>
                </label>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>
              <div className="relative mb-4">
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  className={`peer w-full px-4 py-2 border border-gray-300 text-sm font-normal text-gray-500 rounded-md focus:outline-none focus:ring-0`}
                  value={formData.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">Select Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <label
                  htmlFor="bloodGroup"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Blood Group<span className="text-red-500">*</span>
                </label>
                {errors.bloodGroup && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bloodGroup}
                  </p>
                )}
              </div>
              <div className="relative mb-4">
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-0`}
                  placeholder="Select Date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
                <label
                  htmlFor="dateOfBirth"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Date of Birth<span className="text-red-500">*</span>
                </label>
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>
            </div>

            {/* Address Section */}
            <div className="grid relative gap-4 mb-4">
              <div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleChange}
                />
                <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3">
                  Address
                </label>
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
            </div>

            {/* Country, State, City */}
            <div className="grid grid-cols-3 gap-4 ">
              {/* Country */}
              <div className="relative mb-4">
                <select
                  id="country"
                  name="country"
                  className={`peer w-full px-4 py-2 border border-gray-300 text-sm font-normal text-gray-500 rounded-md focus:outline-none focus:ring-0`}
                  value={formData.country}
                  onChange={handleCountryChange}
                >
                  <option value="">Select Country</option>
                  {countryData.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="country"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Country<span className="text-red-500">*</span>
                </label>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>

              {/* State */}
              <div className="relative mb-4">
                <select
                  id="state"
                  name="state"
                  className={`peer w-full px-4 py-2 border border-gray-300 text-sm font-normal text-gray-500 rounded-md focus:outline-none focus:ring-0`}
                  value={formData.state}
                  onChange={handleStateChange}
                >
                  <option value="">Select State</option>
                  {filteredStates.map((state) => (
                    <option key={state.id} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="state"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                >
                  State<span className="text-red-500">*</span>
                </label>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>

              {/* City */}
              <div className="relative mb-4">
                <select
                  id="city"
                  name="city"
                  className={`peer w-full px-4 py-2 border border-gray-300 text-sm font-normal text-gray-500 rounded-md focus:outline-none focus:ring-0`}
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="">Select City</option>
                  {filteredCities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="city"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
                >
                  City<span className="text-red-500">*</span>
                </label>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            {/* Password and Confirm Password */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "password" : "text"}
                id="password"
                name="password"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
              <label
                htmlFor="password"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
              >
                Password<span className="text-red-500">*</span>
              </label>
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500" />
                ) : (
                  <AiOutlineEye className="text-gray-500" />
                )}
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "password" : "text"}
                id="confirmPassword"
                name="confirmPassword"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0`}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
              >
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible className="text-gray-500" />
                ) : (
                  <AiOutlineEye className="text-gray-500" />
                )}
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Agree to Terms */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="agreeToTerms"
                className="mr-2"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <label className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  T&C
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Privacy Policies
                </a>
              </label>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.agreeToTerms}
                </p>
              )}
            </div>
            {errors.apiError && (
              <p className="text-red-500 text-sm mt-4">{errors.apiError}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Banner & Vector Section */}
      <SidePanel />
    </div>
  );
};

export default PatientRegister;

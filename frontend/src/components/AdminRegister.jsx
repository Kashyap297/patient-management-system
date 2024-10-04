import React, { useState } from "react";
import {
  AiOutlineDown,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import SidePanel from "./SidePanel";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    hospital: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const hospitals = [
    "Hummingbird Garden Samaritan Hospital Center",
    "Fountain Grove Medical Clinic",
    "Silver Peak Medical Center",
    "Bliss Angel Hospital",
    "Peace Feather Medical Clinic",
    "Rose Point Clinic",
    "Dream Isle Medical Clinic",
    "Mirror Eden General Hospital",
  ];

  const handleCreateHospital = () => {
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Simple form validation logic
    if (!formData.firstName)
      validationErrors.firstName = "First Name is required.";
    if (!formData.lastName)
      validationErrors.lastName = "Last Name is required.";
    if (!formData.email) validationErrors.email = "Email Address is required.";
    if (!formData.phone) validationErrors.phone = "Phone Number is required.";
    if (!formData.country) validationErrors.country = "Country is required.";
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
      console.log("Form Data Submitted:", formData);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form Section */}
      <div className="w-1/2 flex justify-center items-center bg-white p-10">
        <div className="w-full max-w-xl bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Registration</h2>
          <form onSubmit={handleSubmit}>
            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4 ">
              <div className="relative mb-4">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0  ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
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
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0  ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
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
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0  ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
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
                  id="phone"
                  name="phone"
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0  ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label
                  htmlFor="phone"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
                >
                  Phone Number<span className="text-red-500">*</span>
                </label>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Country, State, City */}
            <div className="grid grid-cols-3 gap-4">
              <div className="relative mb-4">
                <select
                  id="country"
                  name="country"
                  className={`peer w-full px-4 py-2 border border-gray-300 text-sm font-normal text-gray-500 rounded-md focus:outline-none focus:ring-0 ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="">Select Country</option>
                  <option value="Country1">Country1</option>
                  <option value="Country2">Country2</option>
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
              <div className="relative mb-4">
                <select
                  id="state"
                  name="state"
                  className={`peer w-full px-4 py-2 border border-gray-300 text-sm font-normal text-gray-500 rounded-md focus:outline-none focus:ring-0 ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  <option value="State1">State1</option>
                  <option value="State2">State2</option>
                </select>
                <label
                  htmlFor="state"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
                >
                  State<span className="text-red-500">*</span>
                </label>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
              <div className="relative mb-4">
                <select
                  id="city"
                  name="city"
                  className={`peer w-full px-4 py-2 border border-gray-300 text-sm font-normal text-gray-500 rounded-md focus:outline-none focus:ring-0 ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="">Select City</option>
                  <option value="City1">City1</option>
                  <option value="City2">City2</option>
                </select>
                <label
                  htmlFor="city"
                  className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
                >
                  City<span className="text-red-500">*</span>
                </label>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            {/* Select Hospital */}
            <div className="relative mb-4">
              <div
                className="peer w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-normal text-gray-500 cursor-pointer flex justify-between items-center"
                onClick={toggleDropdown}
              >
                {formData.hospital ? formData.hospital : "Select Hospital"}
                <AiOutlineDown />
              </div>
              <label
                htmlFor="hospital"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
              >
                Hospital<span className="text-red-500">*</span>
              </label>

              {isDropdownOpen && (
                <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md max-h-48 overflow-y-auto shadow-md z-10">
                  {hospitals.map((hospital, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setFormData({ ...formData, hospital });
                        setIsDropdownOpen(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer font-normal"
                    >
                      {hospital}
                    </div>
                  ))}
                  <div className="px-4 py-2">
                    <button
                      onClick={handleCreateHospital}
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      Create Hospital
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Popup for Creating New Hospital */}
            {showCreateModal && (
              <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-md w-full max-w-md">
                  <h2 className="text-xl font-bold mb-4">
                    Create New Hospital
                  </h2>
                  <form>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Hospital Name*
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Hospital Name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Hospital Address*
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Hospital Address"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Country*
                        </label>
                        <select className="w-full px-4 py-2 border rounded-md focus:outline-none">
                          <option value="">Select Country</option>
                          <option value="Country1">Country1</option>
                          <option value="Country2">Country2</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          State*
                        </label>
                        <select className="w-full px-4 py-2 border rounded-md focus:outline-none">
                          <option value="">Select State</option>
                          <option value="State1">State1</option>
                          <option value="State2">State2</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          City*
                        </label>
                        <select className="w-full px-4 py-2 border rounded-md focus:outline-none">
                          <option value="">Select City</option>
                          <option value="City1">City1</option>
                          <option value="City2">City2</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Zip Code*
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Zip Code"
                          className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal Popup for Creating New Hospital */}
            {showCreateModal && (
              <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-md w-full max-w-md">
                  <h2 className="text-xl font-bold mb-4">
                    Create New Hospital
                  </h2>
                  <form>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Hospital Name*
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Hospital Name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Hospital Address*
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Hospital Address"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Country*
                        </label>
                        <select className="w-full px-4 py-2 border rounded-md focus:outline-none">
                          <option value="">Select Country</option>
                          <option value="Country1">Country1</option>
                          <option value="Country2">Country2</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          State*
                        </label>
                        <select className="w-full px-4 py-2 border rounded-md focus:outline-none">
                          <option value="">Select State</option>
                          <option value="State1">State1</option>
                          <option value="State2">State2</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          City*
                        </label>
                        <select className="w-full px-4 py-2 border rounded-md focus:outline-none">
                          <option value="">Select City</option>
                          <option value="City1">City1</option>
                          <option value="City2">City2</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Zip Code*
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Zip Code"
                          className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Password and Confirm Password */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "password" : "text"}
                id="password"
                name="password"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0  ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
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
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}

              {/* Add the icon */}
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
            </div>
            <div className="relative mb-4">
              <input
                type={showPassword ? "password" : "text"}
                id="confirmPassword"
                name="confirmPassword"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0  ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
              >
                Confirm Password<span className="text-red-500">*</span>
              </label>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
              {/* Add the icon */}
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
            </div>

            {/* Agree to Terms */}
            <div className="flex items-center mb-2 ">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm">
                I agree to all the{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  T&C
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Privacy Policies
                </a>
                .
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm mb-4">{errors.agreeToTerms}</p>
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
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Banner & Vector Section */}
      <SidePanel />
    </div>
  );
};
export default AdminRegister;

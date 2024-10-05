import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineDown,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import SidePanel from "./SidePanel";
import AuthContext from "../context/AuthContext";
import api from "../api/api";
import axios from "axios";

const AdminRegister = () => {
  const { registerAdmin, authError } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
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

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/hospitals");

        // Check if response has a data property that holds the array
        if (response.data && Array.isArray(response.data.data)) {
          setHospitals(response.data.data); // Access the array inside 'data' property
          console.log("Hospitals fetched successfully", response.data.data); // Log the hospitals array
        } else {
          throw new Error("Data is not an array");
        }

        setLoading(false);
      } catch (error) {
        setHospitalError("Failed to load hospitals.");
        setLoading(false);
        console.error(error); // Log the error
      }
    };
    fetchHospitals();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [hospitalError, setHospitalError] = useState(null);
  // Handle input changes for the hospital form
  const handleHospitalChange = (e) => {
    const { name, value } = e.target;
    setHospitalData({ ...hospitalData, [name]: value });
  };
  // Create Hospital API Call
  const handleCreateHospital = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post(
        "http://localhost:8000/api/hospitals",
        hospitalData
      );
      console.log(response.data);
      if (response.status === 201) {
        alert("Hospital created successfully!");
        closeModal(); // Close the modal after creation
      }
    } catch (error) {
      setHospitalError("Failed to create hospital. Please try again.");
      console.error(error);
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
        alert("Admin registered successfully!");
      } catch (error) {
        console.error("Registration failed:", authError);
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex justify-center items-center bg-white p-10">
        <div className="w-full max-w-xl bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Registration</h2>
          {authError && (
            <p className="text-red-500 text-sm mb-4">{authError}</p>
          )}
          <form onSubmit={handleSubmit}>
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
                  value={formData.firstName || ""}
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
                  value={formData.lastName || ""}
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
                  value={formData.email || ""}
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
                  className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0  ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Phone Number"
                  value={formData.phoneNumber || ""}
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
                  {/* Show loading state if the hospitals are being fetched */}
                  {loading ? (
                    <div className="px-4 py-2 text-sm text-gray-700">
                      Loading...
                    </div>
                  ) : hospitalError ? (
                    <div className="px-4 py-2 text-sm text-red-500">
                      {hospitalError}
                    </div>
                  ) : (
                    hospitals &&
                    hospitals.map((hospital, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setFormData({ ...formData, hospital: hospital.name });
                          setIsDropdownOpen(false);
                        }}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer font-normal"
                      >
                        {hospital.name}
                      </div>
                    ))
                  )}
                  <div className="px-4 py-2">
                    <button
                      onClick={() => setShowCreateModal(true)}
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
                        name="name"
                        value={hospitalData.name}
                        onChange={handleHospitalChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Hospital Address*
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={hospitalData.address}
                        onChange={handleHospitalChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Country*
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={hospitalData.country}
                          onChange={handleHospitalChange}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          State*
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={hospitalData.state}
                          onChange={handleHospitalChange}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          City*
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={hospitalData.city}
                          onChange={handleHospitalChange}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Zip Code*
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={hospitalData.zipCode}
                          onChange={handleHospitalChange}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none"
                          required
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
                        onClick={handleCreateHospital}
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </div>

                    {hospitalError && (
                      <p className="text-red-500 text-sm mt-4">
                        {hospitalError}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            )}

            <div className="relative mb-4">
              <input
                type={showPassword ? "password" : "text"}
                id="password"
                name="password"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0  ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Password"
                value={formData.password || ""}
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
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
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
                value={formData.confirmPassword || ""}
                onChange={handleChange}
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
              >
                Confirm Password<span className="text-red-500">*</span>
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-center mb-2">
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

      <SidePanel />
    </div>
  );
};

export default AdminRegister;
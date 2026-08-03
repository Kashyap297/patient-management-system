import React, { useState } from "react";
import SidePanel from "./SidePanel";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // For password visibility toggle
import api from "../api/api";
// Import country JSON data
import countryData from "../countryjson/countries+states+cities.json";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
        toast.success("Registration successful!");
        navigate('/')
        setErrors({});
      } catch (error) {
        
        toast.error("Registration failed. Please try again.");
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
    <div className="min-h-screen flex bg-background font-sans overflow-hidden">
      {/* Left Side - Form Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8 relative animate-fade-in z-10 custom-scroll overflow-y-auto">
        
        {/* Decorative blur backgrounds */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>

        <div className="w-full max-w-xl glass p-10 rounded-3xl relative z-10 animate-slide-up mt-10 mb-10">
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold mb-2 text-secondary">Patient Registration</h2>
            <p className="text-gray-500 font-medium">Join us to manage your health seamlessly.</p>
          </div>
          {errors.apiError && <p className="text-red-500 text-sm font-semibold mb-4 p-3 bg-red-50 rounded-lg">{errors.apiError}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative group">
                <input type="text" id="firstName" name="firstName" className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${errors.firstName ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                <label htmlFor="firstName" className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary ${errors.firstName ? "text-red-500" : "text-gray-500"}`}>First Name<span className="text-red-500">*</span></label>
                {errors.firstName && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.firstName}</p>}
              </div>
              <div className="relative group">
                <input type="text" id="lastName" name="lastName" className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${errors.lastName ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                <label htmlFor="lastName" className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary ${errors.lastName ? "text-red-500" : "text-gray-500"}`}>Last Name<span className="text-red-500">*</span></label>
                {errors.lastName && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email and Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative group">
                <input type="email" id="email" name="email" className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${errors.email ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} placeholder="Email Address" value={formData.email} onChange={handleChange} />
                <label htmlFor="email" className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary ${errors.email ? "text-red-500" : "text-gray-500"}`}>Email Address<span className="text-red-500">*</span></label>
                {errors.email && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.email}</p>}
              </div>
              <div className="relative group">
                <input type="text" id="phoneNumber" name="phoneNumber" className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${errors.phoneNumber ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
                <label htmlFor="phoneNumber" className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary ${errors.phoneNumber ? "text-red-500" : "text-gray-500"}`}>Phone Number<span className="text-red-500">*</span></label>
                {errors.phoneNumber && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.phoneNumber}</p>}
              </div>
            </div>

            {/* Age, Height, Weight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="relative group">
                <input type="number" id="age" name="age" className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${errors.age ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} placeholder="Age" value={formData.age} onChange={handleChange} />
                <label htmlFor="age" className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary ${errors.age ? "text-red-500" : "text-gray-500"}`}>Age<span className="text-red-500">*</span></label>
                {errors.age && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.age}</p>}
              </div>
              <div className="relative group">
                <input type="number" id="height" name="height" className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${errors.height ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} placeholder="Height (cm)" value={formData.height} onChange={handleChange} />
                <label htmlFor="height" className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary ${errors.height ? "text-red-500" : "text-gray-500"}`}>Height (cm)<span className="text-red-500">*</span></label>
                {errors.height && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.height}</p>}
              </div>
              <div className="relative group">
                <input type="number" id="weight" name="weight" className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${errors.weight ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} />
                <label htmlFor="weight" className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary ${errors.weight ? "text-red-500" : "text-gray-500"}`}>Weight (kg)<span className="text-red-500">*</span></label>
                {errors.weight && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.weight}</p>}
              </div>
            </div>

            {/* Gender, Blood Group, and Date of Birth */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="relative group">
                <select id="gender" name="gender" className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 text-gray-700 focus:bg-white focus:shadow-lg appearance-none ${errors.gender ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} value={formData.gender} onChange={handleChange}>
                  <option value="" disabled hidden>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <label htmlFor="gender" className="absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none text-primary">Gender<span className="text-red-500">*</span></label>
                {errors.gender && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.gender}</p>}
              </div>
              <div className="relative group">
                <select id="bloodGroup" name="bloodGroup" className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 text-gray-700 focus:bg-white focus:shadow-lg appearance-none ${errors.bloodGroup ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} value={formData.bloodGroup} onChange={handleChange}>
                  <option value="" disabled hidden>Select Group</option>
                  <option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option>
                  <option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option>
                </select>
                <label htmlFor="bloodGroup" className="absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none text-primary">Blood Group<span className="text-red-500">*</span></label>
                {errors.bloodGroup && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.bloodGroup}</p>}
              </div>
              <div className="relative group">
                <input type="date" id="dateOfBirth" name="dateOfBirth" className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 text-gray-700 focus:bg-white focus:shadow-lg ${errors.dateOfBirth ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} value={formData.dateOfBirth} onChange={handleChange} />
                <label htmlFor="dateOfBirth" className="absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none text-primary">Date of Birth<span className="text-red-500">*</span></label>
                {errors.dateOfBirth && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.dateOfBirth}</p>}
              </div>
            </div>

            {/* Address */}
            <div className="relative group">
              <input type="text" id="address" name="address" className={`peer w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${errors.address ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} placeholder="Address" value={formData.address} onChange={handleChange} />
              <label htmlFor="address" className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary ${errors.address ? "text-red-500" : "text-gray-500"}`}>Address<span className="text-red-500">*</span></label>
              {errors.address && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.address}</p>}
            </div>

            {/* Country, State, City */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="relative group">
                <select id="country" name="country" className={`peer custom-scroll w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 text-gray-700 focus:bg-white focus:shadow-lg appearance-none ${errors.country ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} value={formData.country} onChange={handleCountryChange}>
                  <option value="" disabled hidden>Select Country</option>
                  {countryData.map((country) => ( <option key={country.id} value={country.name}>{country.name}</option> ))}
                </select>
                <label htmlFor="country" className="absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none text-primary">Country<span className="text-red-500">*</span></label>
                {errors.country && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.country}</p>}
              </div>
              <div className="relative group">
                <select id="state" name="state" className={`peer custom-scroll w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 text-gray-700 focus:bg-white focus:shadow-lg appearance-none ${errors.state ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} value={formData.state} onChange={handleStateChange}>
                  <option value="" disabled hidden>Select State</option>
                  {filteredStates.map((state) => ( <option key={state.id} value={state.name}>{state.name}</option> ))}
                </select>
                <label htmlFor="state" className="absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none text-primary">State<span className="text-red-500">*</span></label>
                {errors.state && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.state}</p>}
              </div>
              <div className="relative group">
                <select id="city" name="city" className={`peer custom-scroll w-full px-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 text-gray-700 focus:bg-white focus:shadow-lg appearance-none ${errors.city ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} value={formData.city} onChange={handleChange}>
                  <option value="" disabled hidden>Select City</option>
                  {filteredCities.map((city) => ( <option key={city.id} value={city.name}>{city.name}</option> ))}
                </select>
                <label htmlFor="city" className="absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none text-primary">City<span className="text-red-500">*</span></label>
                {errors.city && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.city}</p>}
              </div>
            </div>

            {/* Password and Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative group">
                <input type={showPassword ? "text" : "password"} id="password" name="password" className={`peer w-full pl-4 pr-12 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${errors.password ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} placeholder="Password" value={formData.password} onChange={handleChange} />
                <label htmlFor="password" className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary ${errors.password ? "text-red-500" : "text-gray-500"}`}>Password<span className="text-red-500">*</span></label>
                <div className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400 hover:text-primary transition-colors" onClick={togglePasswordVisibility}>
                  {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </div>
                {errors.password && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.password}</p>}
              </div>

              <div className="relative group">
                <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" className={`peer w-full pl-4 pr-12 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${errors.confirmPassword ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"}`} placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                <label htmlFor="confirmPassword" className={`absolute left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary ${errors.confirmPassword ? "text-red-500" : "text-gray-500"}`}>Confirm Password<span className="text-red-500">*</span></label>
                <div className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400 hover:text-primary transition-colors" onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Agree to Terms */}
            <div className="flex items-center pt-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" name="agreeToTerms" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer transition-colors" checked={formData.agreeToTerms} onChange={handleChange} />
                <span className="text-sm font-medium text-gray-600">
                  I agree to all the{" "}
                  <a href="#" className="text-primary hover:underline font-semibold">T&C</a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline font-semibold">Privacy Policies</a>.
                </span>
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-red-500 text-xs font-semibold ml-8">{errors.agreeToTerms}</p>}

            <button type="submit" className="w-full mt-4 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold text-lg rounded-2xl hover:shadow-[0_8px_20px_rgba(14,171,235,0.4)] hover:-translate-y-1 transition-all duration-300">
              Register Patient
            </button>
          </form>

          <div className="flex justify-between mt-8 text-sm font-medium text-gray-500 px-2">
            <p>
              Already have an account? {" "}
              <a href="/" className="text-primary font-bold hover:underline hover:text-blue-600 transition-colors">
                Login
              </a>
            </p>
            <p>
              Are you an Admin? {" "}
              <a href="/admin-registration" className="text-primary font-bold hover:underline hover:text-blue-600 transition-colors">
                Admin Register
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-secondary overflow-hidden">
        <SidePanel />
      </div>
    </div>
  );
};

export default PatientRegister;

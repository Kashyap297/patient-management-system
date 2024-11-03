// src/components/ForgetPassword.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import logoBanner from "../assets/images/loginBanner.png";
import logo from "../assets/images/logo.png";
import vector1 from "../assets/images/Vector1.png";
import vector2 from "../assets/images/Vector2.png";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const { authError, requestOtp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!email) {
      validationErrors.email = "Email or Phone is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        localStorage.setItem("email", email);
        await requestOtp({ email });
        alert("OTP sent to your email/phone");
        navigate("/enter-otp");
      } catch {
        setErrors({ email: authError });
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex justify-center items-center bg-white p-10">
        <div className="w-3/4 bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Forgot Password</h2>
          <p className="mb-4 text-sm text-gray-500 mb-5">
          Enter your email and we’ll send you a otp to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                type="text"
                id="email"
                name="email"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Email or Phone Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3"
              >
                Email or Phone<span className="text-red-500">*</span>
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#f6f8fb] text-[#4F4F4F] hover:text-white rounded-md hover:bg-[#0eabeb] transition duration-200"
            >
              Get OTP
            </button>
          </form>
          <p className="text-center mt-4 text-sm">
            <Link to="/" className="text-blue-500 hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
      {/* Right Side - Banner & Vector Section */}
      <div className="w-1/2 bg-gray-100 relative flex justify-center items-center">
        {/* Vectors */}
        <img
          src={vector1}
          alt="Vector Top Left"
          className="absolute top-0 left-0 w-50 h-60"
        />
        <img
          src={vector2}
          alt="Vector Bottom Right"
          className="absolute bottom-0 right-0 w-50 h-60"
        />

        {/* Banner Content */}
        <div className="text-center">
          <img src={logo} alt="Logo" className="mb-4 mx-auto w-60 h-30" />
          <img
            src={logoBanner}
            alt="Banner"
            className="w-full max-w-lg mx-auto"
          />
          <h2 className="text-4xl font-bold mt-4">Hospital</h2>
          <p className="text-gray-600 mt-2 font-semibold">
            Stay connected with your hospital and manage your appointments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

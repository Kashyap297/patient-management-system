// src/components/ForgetPassword.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

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
        <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Forgot Password</h2>
          <p className="mb-4 text-sm">
            Enter your email and we'll send you an OTP to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                type="text"
                id="email"
                name="email"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0  ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Email or Phone Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Get OTP
            </button>
          </form>
          <p className="text-center mt-4 text-sm">
            <Link to="/login" className="text-blue-500 hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

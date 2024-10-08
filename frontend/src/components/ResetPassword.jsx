import React, { useContext, useState } from "react";
import logoBanner from "../assets/images/loginBanner.png";
import logo from "../assets/images/logo.png";
import vector1 from "../assets/images/Vector1.png";
import vector2 from "../assets/images/Vector2.png";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { resetPassword, authError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!newPassword) {
      validationErrors.newPassword = "New Password is required.";
    }
    if (!confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required.";
    } else if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        // Get the email from localStorage
        const email = localStorage.getItem("email");
        await resetPassword({ password: newPassword, email });
        alert("Password reset successful");
        localStorage.removeItem("email"); // Clean up the email after resetting password
        navigate("/");
      } catch {
        setErrors({ confirmPassword: authError });
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form Section */}
      <div className="w-1/2 flex justify-center items-center bg-white p-10">
        <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Reset Password</h2>
          <p className="mb-4 text-sm">
            Please enter your new password and confirm it to reset your
            password.
          </p>
          <form onSubmit={handleSubmit}>
            {/* New Password Input */}
            <div className="relative mb-4">
              <input
                type="password"
                id="password"
                name="password"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0  ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label
                htmlFor="email"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
              >
                New Password<span className="text-red-500">*</span>
              </label>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}

            <div className="relative mb-4">
              <input
                type="password"
                id="password"
                name="password"
                className={`peer w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0  ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label
                htmlFor="email"
                className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200  peer-focus:-top-2.5 peer-focus:left-3"
              >
                Confirm Password<span className="text-red-500">*</span>
              </label>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Reset Password
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
            You Can stay your Hospital and Contact
            <br /> With Your Facility.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

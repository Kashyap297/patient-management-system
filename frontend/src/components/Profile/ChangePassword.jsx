import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import api from "../../api/api";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string().required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await api.post("/users/change-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Password Changed Successfully!",
          text: "Your password has been updated.",
          confirmButtonText: "OK",
        });
        resetForm();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Change Password",
          text: "Please check your details and try again.",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      Swal.fire({
        icon: "error",
        title: "Error Changing Password",
        text: "An error occurred. Please try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-3/5 p-6">
      <div className="justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">Change Password</h3>
        <p className="text-sm">
          To change your password, please fill in the fields below. Your
          password must contain at least 8 characters, it must also include at
          least one uppercase letter, one lowercase letter, one number, and one
          special character.
        </p>
      </div>

      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Current Password */}
            <div className="relative">
              <Field
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                placeholder="Enter Current Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
                Current Password <span className="text-red-500">*</span>
              </label>
              <ErrorMessage
                name="currentPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <div
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword.current ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            {/* New Password */}
            <div className="relative">
              <Field
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                placeholder="Enter New Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
                New Password <span className="text-red-500">*</span>
              </label>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <div
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword.new ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Field
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Enter Confirm Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500 transition-all duration-200">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <div
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword.confirm ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Changing Password..." : "Change Password"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
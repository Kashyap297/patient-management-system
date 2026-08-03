import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../api/api";
import toast from "react-hot-toast";

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
        toast.success("Password Changed Successfully!");
        resetForm();
      } else {
        toast.error("Failed to Change Password, Try again");
      }
    } catch (error) {
      toast.error("Error Changing Password, Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl p-4 sm:p-6 animate-slide-up">
      <div className="mb-8">
        <h3 className="text-2xl font-extrabold text-secondary tracking-tight mb-3">Change Password</h3>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
          To change your password, please fill in the fields below. Your
          password must contain at least 8 characters, it must also include at
          least one uppercase letter, one lowercase letter, one number, and one
          special character.
        </p>
      </div>

      <div className="bg-white/60 p-6 md:p-8 rounded-3xl border border-white/50 shadow-sm">
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
              <div className="relative group">
                <Field
                  type={showPassword.current ? "text" : "password"}
                  name="currentPassword"
                  placeholder="Enter Current Password"
                  className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 font-medium text-gray-700 placeholder-transparent peer"
                />
                <label className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div
                  onClick={() => togglePasswordVisibility("current")}
                  className="absolute right-4 top-4 cursor-pointer text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword.current ? <FaEye /> : <FaEyeSlash />}
                </div>
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className="text-red-500 text-xs font-medium mt-1.5 ml-2 absolute -bottom-5"
                />
              </div>

              {/* New Password */}
              <div className="relative group mt-8">
                <Field
                  type={showPassword.new ? "text" : "password"}
                  name="newPassword"
                  placeholder="Enter New Password"
                  className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 font-medium text-gray-700 placeholder-transparent peer"
                />
                <label className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-4 top-4 cursor-pointer text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword.new ? <FaEye /> : <FaEyeSlash />}
                </div>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-xs font-medium mt-1.5 ml-2 absolute -bottom-5"
                />
              </div>

              {/* Confirm Password */}
              <div className="relative group mt-8">
                <Field
                  type={showPassword.confirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Enter Confirm Password"
                  className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 font-medium text-gray-700 placeholder-transparent peer"
                />
                <label className="absolute left-4 -top-2.5 px-1 bg-white text-xs font-bold text-gray-500 transition-all peer-focus:text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-xs">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-4 top-4 cursor-pointer text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword.confirm ? <FaEye /> : <FaEyeSlash />}
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs font-medium mt-1.5 ml-2 absolute -bottom-5"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-primary to-blue-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Changing Password..." : "Change Password"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
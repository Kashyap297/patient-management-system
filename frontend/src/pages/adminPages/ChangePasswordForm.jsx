import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import api from "../../api/api";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string().required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePasswordForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await api.post("/users/change-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (response.status === 200) {
        toast.success("Password changed successfully!");
        resetForm();
      } else {
        toast.error("Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Error changing password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const labelClass = "block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide uppercase";

  const renderInput = (name, label, showPassword, setShowPassword, type, touched, errors) => (
    <div className="mb-6 relative">
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <Field
          name={name}
          type={showPassword ? "text" : "password"}
          className={`w-full p-3 border outline-none transition-all duration-300 rounded-xl text-sm pr-12 ${
            touched[name] && errors[name]
              ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 bg-red-50"
              : "bg-white border-gray-200 focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/20 text-gray-800"
          }`}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          {showPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
        </button>
      </div>
      {touched[name] && errors[name] && (
        <p className="mt-1.5 text-xs text-red-500 font-medium">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="flex-1 bg-white h-full p-8 md:p-12">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Change Password</h2>
        <p className="text-gray-500 text-sm mt-1 max-w-xl">
          To change your password, please fill in the fields below. Make sure to use a strong and secure new password.
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
        {({ errors, touched, isSubmitting }) => (
          <Form className="max-w-xl">
            {renderInput(
              "currentPassword",
              "Current Password",
              showCurrentPassword,
              setShowCurrentPassword,
              "password",
              touched,
              errors
            )}

            {renderInput(
              "newPassword",
              "New Password",
              showNewPassword,
              setShowNewPassword,
              "password",
              touched,
              errors
            )}

            {renderInput(
              "confirmPassword",
              "Confirm Password",
              showConfirmPassword,
              setShowConfirmPassword,
              "password",
              touched,
              errors
            )}

            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#10b981] text-white px-8 py-3 rounded-xl hover:bg-green-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Changing..." : "Change Password"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;

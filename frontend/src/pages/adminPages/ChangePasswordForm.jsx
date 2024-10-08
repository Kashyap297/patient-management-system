import { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import api from "../../api/api"; // Import your centralized API instance

// Updated validation schema with only required validation
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
      // Make API call to change the password
      const response = await api.post("/users/change-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (response.status === 200) {
        alert("Password changed successfully");
        resetForm(); // Reset the form on successful password change
      } else {
        alert("Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 bg-white h-full p-8 rounded-r-3xl">
      <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
      <p className="mb-4 text-sm text-gray-500">
        To change your password, please fill in the fields below.
      </p>

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
          <Form className="grid grid-cols-1 gap-4">
            {/* Current Password */}
            <Field
              as={TextField}
              label="Current Password"
              variant="outlined"
              fullWidth
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              error={touched.currentPassword && Boolean(errors.currentPassword)}
              helperText={touched.currentPassword && errors.currentPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* New Password */}
            <Field
              as={TextField}
              label="New Password"
              variant="outlined"
              fullWidth
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              error={touched.newPassword && Boolean(errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password */}
            <Field
              as={TextField}
              label="Confirm Password"
              variant="outlined"
              fullWidth
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="!mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Changing..." : "Change Password"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;

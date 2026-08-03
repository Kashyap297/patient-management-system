import { useState } from "react";
import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import api from "../../api/api"; // Import your centralized API instance
import toast from "react-hot-toast";

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
        toast.success("Password changed successfully!");
        resetForm(); // Reset the form on successful password change
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

  return (
    <div className="flex-1 bg-transparent h-full p-8 md:p-12">
      <h2 className="text-3xl font-extrabold text-secondary tracking-tight mb-4">Change Password</h2>
      <p className="mb-8 text-sm md:text-base text-gray-500 max-w-xl">
        To change your password, please fill in the fields below. Make sure to use a strong and secure new password.
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
          <Form className="grid grid-cols-1 gap-6 max-w-2xl">
            {/* Current Password */}
            <div className="relative group">
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
                  className: "bg-white/50 backdrop-blur-md rounded-2xl transition-all duration-300 group-hover:bg-white focus-within:bg-white border-white/20",
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "1rem",
                    "& fieldset": { borderColor: "rgba(0,0,0,0.1)" },
                    "&:hover fieldset": { borderColor: "var(--primary)" },
                    "&.Mui-focused fieldset": { borderColor: "var(--primary)" },
                  },
                }}
              />
            </div>

            {/* New Password */}
            <div className="relative group">
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
                  className: "bg-white/50 backdrop-blur-md rounded-2xl transition-all duration-300 group-hover:bg-white focus-within:bg-white border-white/20",
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "1rem",
                    "& fieldset": { borderColor: "rgba(0,0,0,0.1)" },
                    "&:hover fieldset": { borderColor: "var(--primary)" },
                    "&.Mui-focused fieldset": { borderColor: "var(--primary)" },
                  },
                }}
              />
            </div>

            {/* Confirm Password */}
            <div className="relative group">
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
                  className: "bg-white/50 backdrop-blur-md rounded-2xl transition-all duration-300 group-hover:bg-white focus-within:bg-white border-white/20",
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "1rem",
                    "& fieldset": { borderColor: "rgba(0,0,0,0.1)" },
                    "&:hover fieldset": { borderColor: "var(--primary)" },
                    "&.Mui-focused fieldset": { borderColor: "var(--primary)" },
                  },
                }}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              className="!mt-4 !bg-primary hover:!bg-primary/90 !text-white !font-bold !py-3 !rounded-2xl !shadow-lg !shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1"
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

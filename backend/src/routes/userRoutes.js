const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  registerPatient,
  loginUser,
  addDoctorByAdmin,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Admin Registration
router.post("/register-admin", registerAdmin);

// Patient Registration
router.post("/register-patient", registerPatient);

// Admin Adding Doctor
router.post("/add-doctor", protect, admin, addDoctorByAdmin);

// Common Login
router.post("/login", loginUser);

// Forgot Password - Request OTP
router.post("/forgot-password", forgotPassword);

// Verify OTP
router.post("/verify-otp", verifyOtp);

// Reset Password
router.post("/reset-password", resetPassword);

module.exports = router;

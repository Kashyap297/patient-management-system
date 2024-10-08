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
  changePassword,
  getUserProfile,
  updateUserProfile,
  getAllDoctors,
  getAllPatients,
  getDoctorById,
  deleteDoctorById,
  editDoctorById,
  getPatientById,
  editPatientById,
  deletePatientById,
} = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");
const upload = require("../utils/multerConfig");

// Admin Registration
router.post("/register-admin", registerAdmin);

// Patient Registration
router.post("/register-patient", registerPatient);

// Admin Adding Doctor
router.post(
  "/add-doctor",
  protect,
  admin,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "signatureImage", maxCount: 1 },
  ]),
  addDoctorByAdmin
);

// Common Login
router.post("/login", loginUser);

// Forgot Password - Request OTP
router.post("/forgot-password", forgotPassword);

// Verify OTP
router.post("/verify-otp", verifyOtp);

// Reset Password
router.post("/reset-password", resetPassword);

// Change Password route
router.post("/change-password", protect, changePassword);

// Get User Profile
router.get("/profile", protect, getUserProfile);

// Update User Profile with PATCH
router.patch(
  "/profile",
  protect,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "signatureImage", maxCount: 1 },
  ]),
  updateUserProfile
);

// Get All Doctors
router.get("/doctors", protect, admin, getAllDoctors);

// Get All Patients
router.get("/patients", protect, admin, getAllPatients);

router.get("/doctors/:id", getDoctorById);
router.delete("/doctors/:id", protect, admin, deleteDoctorById);
router.patch("/doctors/:id", editDoctorById);
router.get("/patients/:id", getPatientById);
router.patch("/patients/:id", editPatientById);
router.delete("/patients/:id", deletePatientById);

module.exports = router;

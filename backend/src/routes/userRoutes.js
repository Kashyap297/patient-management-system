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

// Multer error handler
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(500).json({ message: "File upload error", error: err });
  }
  next();
};

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
  multerErrorHandler,
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
  multerErrorHandler,
  updateUserProfile
);

// Get All Doctors
router.get("/doctors", getAllDoctors);

// Get All Patients
router.get("/patients", getAllPatients);

// Doctor Routes
router.get("/doctors/:id", getDoctorById);
router.delete("/doctors/:id", protect, admin, deleteDoctorById);
router.patch("/doctors/:id", upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'signatureImage', maxCount: 1 }
]), editDoctorById);

// Patient Routes
router.get("/patients/:id", getPatientById);
router.patch('/patients/:id', upload.single('profileImage'), editPatientById);
router.delete("/patients/:id", deletePatientById);

module.exports = router;

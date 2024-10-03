const express = require("express");
const {
  registerUser,
  loginUser,
  getViewData,
  getUserProfile,
  getforgetpass,
  resetPassword,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// Register User
router.post("/register", registerUser);
router.get('/viewAllData', protect, getViewData)

// Login User
router.post("/login", loginUser);

// Get User Profile
router.get("/profile", protect, getUserProfile);


// Forget Password
router.post("/forgetpass", getforgetpass);


// Reset Password
router.put("/resetPassword/:resetToken", resetPassword);

module.exports = router;

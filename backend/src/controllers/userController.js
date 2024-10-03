const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const sendSMS = require("../utils/sendSMS");

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register Admin
// @route   POST /api/auth/register-admin
// @access  Public
exports.registerAdmin = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    country,
    state,
    city,
    hospital,
  } = req.body;

  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create new admin
    const admin = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      country,
      state,
      city,
      role: "admin",
      doctorDetails: { currentHospital: hospital },
    });

    res.status(201).json({
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id, admin.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Register Patient
// @route   POST /api/auth/register-patient
// @access  Public
exports.registerPatient = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    age,
    height,
    weight,
    gender,
    bloodGroup,
    dateOfBirth,
    country,
    state,
    city,
    address,
  } = req.body;

  try {
    // Check if patient already exists
    const patientExists = await User.findOne({ email });
    if (patientExists) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    // Create new patient
    const patient = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      age,
      height,
      weight,
      gender,
      bloodGroup,
      dateOfBirth,
      country,
      state,
      city,
      address,
      role: "patient",
    });

    res.status(201).json({
      _id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      role: patient.role,
      token: generateToken(patient._id, patient.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Add New Doctor (Admin Only)
// @route   POST /api/auth/add-doctor
// @access  Admin
exports.addDoctorByAdmin = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    qualification,
    specialtyType,
    checkupTime,
    breakTime,
    experience,
    zipCode,
    onlineConsultationRate,
    country,
    state,
    city,
    hospitalName,
    hospitalAddress,
    websiteLink,
    emergencyContactNumber,
    gender,
    age,
    doctorAddress,
  } = req.body;

  try {
    // Check if doctor already exists
    const doctorExists = await User.findOne({ email });
    if (doctorExists) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // Create new doctor
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role: "doctor",
      doctorDetails: {
        qualification,
        specialtyType,
        workingHours: { checkupTime, breakTime },
        experience,
        zipCode,
        onlineConsultationRate,
        hospital: {
          hospitalName,
          hospitalAddress,
          websiteLink,
          emergencyContactNumber,
        },
      },
      gender,
      age,
      country,
      state,
      city,
      address: doctorAddress,
    });

    res.status(201).json({
      _id: doctor._id,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      email: doctor.email,
      role: doctor.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Login for Admin, Doctor, Patient
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  try {
    // Find user by either email or phone number
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
    }

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email/phone number or password" });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email/phone number or password" });
    }

    // Generate and send token
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Send OTP for Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  const { email, phoneNumber } = req.body;

  try {
    // Find user by either email or phone number
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP (6-digit random number)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP expiration time (e.g., 10 minutes)
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    // Send OTP via email or phone
    if (email) {
      await sendEmail(email, "Password Reset OTP", `Your OTP is ${otp}`);
    } else if (phoneNumber) {
      await sendSMS(phoneNumber, `Your OTP is ${otp}`);
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOtp = async (req, res) => {
  const { otp, email, phoneNumber } = req.body;

  try {
    // Find user by email or phone
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
    }

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({
      message: "OTP verified successfully, proceed to reset password",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  try {
    // Find user by email or phone
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set new password
    user.password = password;
    user.otp = undefined; // Clear OTP after reset
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Change Password
// @route   POST /api/auth/change-password
// @access  Private (Logged in users)
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // Get user by ID from the JWT token
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if current password matches
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Update with the new password
    user.password = newPassword;

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get User Profile
// @route   GET /api/users/profile
// @access  Private (Logged in users)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // Select all fields except password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      country: user.country,
      state: user.state,
      city: user.city,
      doctorDetails: user.doctorDetails,
      age: user.age,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      bloodGroup: user.bloodGroup,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// @desc    Update User Profile (Partial Update)
// @route   PATCH /api/users/profile
// @access  Private (Logged in users)
exports.updateUserProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    state,
    city,
    age,
    height,
    weight,
    gender,
    bloodGroup,
    dateOfBirth,
    address,
  } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the fields provided in the request body (partial update)
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (email !== undefined) user.email = email;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (country !== undefined) user.country = country;
    if (state !== undefined) user.state = state;
    if (city !== undefined) user.city = city;
    if (age !== undefined) user.age = age;
    if (height !== undefined) user.height = height;
    if (weight !== undefined) user.weight = weight;
    if (gender !== undefined) user.gender = gender;
    if (bloodGroup !== undefined) user.bloodGroup = bloodGroup;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
    if (address !== undefined) user.address = address;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      country: updatedUser.country,
      state: updatedUser.state,
      city: updatedUser.city,
      age: updatedUser.age,
      height: updatedUser.height,
      weight: updatedUser.weight,
      gender: updatedUser.gender,
      bloodGroup: updatedUser.bloodGroup,
      dateOfBirth: updatedUser.dateOfBirth,
      address: updatedUser.address,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

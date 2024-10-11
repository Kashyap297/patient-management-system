const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const sendSMS = require("../utils/sendSMS");

// Generate JWT Token
const generateToken = (id, role, firstName, lastName) => {
  return jwt.sign({ id, role, firstName, lastName }, process.env.JWT_SECRET, {
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
      token: generateToken(admin._id, admin.role, admin.firstName, admin.lastName),
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
      token: generateToken(patient._id, patient.role, patient.firstName, patient.lastName),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.addDoctorByAdmin = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    qualification,
    specialtyType,
    workType,
    workingTime,
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
  } = req.body;

  try {
    const doctorExists = await User.findOne({ email });
    if (doctorExists) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const profileImage = req.files.profileImage
      ? `uploads/${req.files.profileImage[0].filename}`
      : null;
    const signatureImage = req.files.signatureImage
      ? `uploads/${req.files.signatureImage[0].filename}`
      : null;

    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role: "doctor",
      profileImage,
      signatureImage,
      doctorDetails: {
        qualification,
        specialtyType,
        workType,
        workingHours: { workingTime, checkupTime, breakTime },
        experience: Number(experience),
        zipCode: Number(zipCode),
        onlineConsultationRate: Number(onlineConsultationRate),
        hospital: {
          hospitalName,
          hospitalAddress,
          websiteLink,
          emergencyContactNumber,
        },
      },
      gender,
      age: Number(age),
      country,
      state,
      city,
    });

    res.status(201).json({
      _id: doctor._id,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      doctorName: `${doctor.firstName} ${doctor.lastName}`,
      email: doctor.email,
      role: doctor.role,
      profileImage: doctor.profileImage,
      signatureImage: doctor.signatureImage,
    });
  } catch (error) {
    console.error("Validation Error:", error); // Log the full error
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
      token: generateToken(user._id, user.role, user.firstName, user.lastName),
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
    // Find user by ID, excluding the password field
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return all fields, including role-specific ones and profile/signature images
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
      profileImage: user.profileImage, // Profile image field
      signatureImage: user.signatureImage, // Signature image field
      // Patient-specific fields
      age: user.age,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      bloodGroup: user.bloodGroup,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
      // Doctor-specific fields
      doctorDetails: user.doctorDetails,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
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
    doctorDetails,
  } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the fields provided in the request body
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (email !== undefined) user.email = email;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (country !== undefined) user.country = country;
    if (state !== undefined) user.state = state;
    if (city !== undefined) user.city = city;

    // Handle image uploads
    if (req.files) {
      if (req.files.profileImage) {
        user.profileImage = req.files.profile;
        user.profileImage = req.files.profileImage[0].path; // Storing path for profile image
      }
      if (req.files.signatureImage) {
        user.signatureImage = req.files.signatureImage[0].path; // Storing path for signature image
      }
    }

    // Patient-specific fields
    if (age !== undefined) user.age = age;
    if (height !== undefined) user.height = height;
    if (weight !== undefined) user.weight = weight;
    if (gender !== undefined) user.gender = gender;
    if (bloodGroup !== undefined) user.bloodGroup = bloodGroup;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
    if (address !== undefined) user.address = address;

    // Doctor-specific fields (updating nested doctorDetails object)
    if (doctorDetails !== undefined) {
      if (doctorDetails.qualification !== undefined)
        user.doctorDetails.qualification = doctorDetails.qualification;
      if (doctorDetails.specialtyType !== undefined)
        user.doctorDetails.specialtyType = doctorDetails.specialtyType;
      if (doctorDetails.workingHours !== undefined) {
        if (doctorDetails.workingHours.checkupTime !== undefined)
          user.doctorDetails.workingHours.checkupTime =
            doctorDetails.workingHours.checkupTime;
        if (doctorDetails.workingHours.breakTime !== undefined)
          user.doctorDetails.workingHours.breakTime =
            doctorDetails.workingHours.breakTime;
      }
      if (doctorDetails.experience !== undefined)
        user.doctorDetails.experience = doctorDetails.experience;
      if (doctorDetails.zipCode !== undefined)
        user.doctorDetails.zipCode = doctorDetails.zipCode;
      if (doctorDetails.onlineConsultationRate !== undefined)
        user.doctorDetails.onlineConsultationRate =
          doctorDetails.onlineConsultationRate;
      if (doctorDetails.hospital !== undefined) {
        if (doctorDetails.hospital.currentHospital !== undefined)
          user.doctorDetails.hospital.currentHospital =
            doctorDetails.hospital.currentHospital;
        if (doctorDetails.hospital.hospitalName !== undefined)
          user.doctorDetails.hospital.hospitalName =
            doctorDetails.hospital.hospitalName;
        if (doctorDetails.hospital.hospitalAddress !== undefined)
          user.doctorDetails.hospital.hospitalAddress =
            doctorDetails.hospital.hospitalAddress;
        if (doctorDetails.hospital.websiteLink !== undefined)
          user.doctorDetails.hospital.websiteLink =
            doctorDetails.hospital.websiteLink;
        if (doctorDetails.hospital.emergencyContactNumber !== undefined)
          user.doctorDetails.hospital.emergencyContactNumber =
            doctorDetails.hospital.emergencyContactNumber;
      }
    }

    // Save the updated user data
    const updatedUser = await user.save();

    // Return updated profile data
    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      profileImage: updatedUser.profileImage,
      signatureImage: updatedUser.signatureImage,
      role: updatedUser.role,
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
      doctorDetails: updatedUser.doctorDetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// @desc    Get All Doctors
// @route   GET /api/users/doctors
// @access  Private (Admin only)
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password"); // Exclude password from the response
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get All Patients
// @route   GET /api/users/patients
// @access  Private (Admin only)
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select("-password"); // Exclude password from the response
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get Doctor by ID
// @route   GET /api/users/doctors/:id
// @access  Private (Admin only)
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id)
      .where({ role: "doctor" })
      .select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Delete Doctor by ID
// @route   DELETE /api/users/doctors/:id
// @access  Private (Admin only)
exports.deleteDoctorById = async (req, res) => {
  try {
    // Find and delete doctor by ID and role
    const doctor = await User.findOneAndDelete({
      _id: req.params.id,
      role: "doctor",
    });

    // If no doctor is found, return 404
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Edit Doctor by ID
// @route   PATCH /api/users/doctors/:id
// @access  Private (Admin only)
exports.editDoctorById = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id).where({ role: "doctor" });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
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
      gender,
      doctorDetails,
    } = req.body;

    // Update doctor fields
    doctor.firstName = firstName || doctor.firstName;
    doctor.lastName = lastName || doctor.lastName;
    doctor.email = email || doctor.email;
    doctor.phoneNumber = phoneNumber || doctor.phoneNumber;
    doctor.gender = gender || doctor.gender;
    doctor.country = country || doctor.country;
    doctor.state = state || doctor.state;
    doctor.city = city || doctor.city;

    // Update doctor details
    if (doctorDetails) {
      doctor.doctorDetails.qualification =
        qualification || doctor.doctorDetails.qualification;
      doctor.doctorDetails.specialtyType =
        specialtyType || doctor.doctorDetails.specialtyType;
      doctor.doctorDetails.experience =
        experience || doctor.doctorDetails.experience;
      doctor.doctorDetails.workingHours.checkupTime =
        checkupTime || doctor.doctorDetails.workingHours.checkupTime;
      doctor.doctorDetails.workingHours.breakTime =
        breakTime || doctor.doctorDetails.workingHours.breakTime;
      doctor.doctorDetails.zipCode = zipCode || doctor.doctorDetails.zipCode;
      doctor.doctorDetails.onlineConsultationRate =
        onlineConsultationRate || doctor.doctorDetails.onlineConsultationRate;
    }

    const updatedDoctor = await doctor.save();
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// @desc    Get Patient by ID
// @route   GET /api/users/patients/:id
// @access  Private (Admin only)
exports.getPatientById = async (req, res) => {
  try {
    const patient = await User.findById(req.params.id)
      .where({ role: "patient" })
      .select("-password");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// @desc    Edit Patient by ID
// @route   PATCH /api/users/patients/:id
// @access  Private (Admin only)
exports.editPatientById = async (req, res) => {
  try {
    const patient = await User.findById(req.params.id).where({
      role: "patient",
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
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

    // Update patient fields
    patient.firstName = firstName || patient.firstName;
    patient.lastName = lastName || patient.lastName;
    patient.email = email || patient.email;
    patient.phoneNumber = phoneNumber || patient.phoneNumber;
    patient.age = age || patient.age;
    patient.height = height || patient.height;
    patient.weight = weight || patient.weight;
    patient.gender = gender || patient.gender;
    patient.bloodGroup = bloodGroup || patient.bloodGroup;
    patient.dateOfBirth = dateOfBirth || patient.dateOfBirth;
    patient.country = country || patient.country;
    patient.state = state || patient.state;
    patient.city = city || patient.city;
    patient.address = address || patient.address;

    const updatedPatient = await patient.save();
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// @desc    Delete Patient by ID
// @route   DELETE /api/users/patients/:id
// @access  Private (Admin only)
exports.deletePatientById = async (req, res) => {
  try {
    const patient = await User.findById(req.params.id).where({
      role: "patient",
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    await patient.remove();
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

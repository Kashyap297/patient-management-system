const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Generate JWT
const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


// Register User
const registerUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, address, country, state, city, role } = req.body;

  if ( !email || !password || !firstName || !lastName || !email || !phoneNumber || !password || !address || !country || !state || !city || !role) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    firstName, 
    lastName, 
    email, 
    phoneNumber,
    password, 
    address, 
    country, 
    state, 
    city, 
    role
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      phoneNumber: user.phoneNumber,
      email: user.email,
      token: generateToken(user._id, user.email),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};


// View All Users
const getViewData = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      phoneNumber: user.phoneNumber,
      email: user.email,
      token: generateToken(user._id, user.phoneNumber),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// Get Logged In User
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
};

// Forget Password
const getforgetpass = async (req, res) => {
  const { email } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate password reset token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Set token and expiration to user model
  user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes expiration

  await user.save();

  // Send email with reset link
  const resetUrl = `${req.protocol}://${req.get("host")}/api/users/resetpassword/${resetToken}`;

  const message = `You requested a password reset. Click the following link to reset your password: \n\n ${resetUrl}`;

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can choose any email service like Gmail, SendGrid, etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email User
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      text: message,
    });

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.status(500).json({ message: "Email could not be sent" });
  }
};


// Reset Password
const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  // Hash token
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // Find user by token and check if the token has not expired
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
};


module.exports = { registerUser, loginUser, getViewData, getUserProfile, getforgetpass, resetPassword };

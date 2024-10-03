const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      trim: true
    },
    password: {
      type: String
    },
    address: {
      type: String
    },
    country: {
      type: String
    },
    state: {
      type: String
    },
    city: {
      type: String
    },
    role: {
      type: String,
      enum: ["Admin", "Patient", "Doctor"],
      default: "Patient", // Default role will be Patient
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

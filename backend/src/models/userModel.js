const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "doctor", "patient"],
      required: true,
    },
    otp: { type: String }, // OTP field for verification
    otpExpires: { type: Date }, // OTP expiry time
    profileImage: { type: String }, // Store path for profile image
    signatureImage: { type: String }, // Store path for signature image
    // Fields specific to patient
    age: { type: Number },
    height: { type: Number },
    weight: { type: Number },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    bloodGroup: { type: String },
    dateOfBirth: { type: Date },
    address: { type: String },

    // Fields specific to doctor
    doctorDetails: {
      qualification: { type: String },
      specialtyType: { type: String },
      workingHours: {
        checkupTime: { type: String },
        breakTime: { type: String },
      },
      experience: { type: Number },
      zipCode: { type: String },
      onlineConsultationRate: { type: Number },
      hospital: {
        currentHospital: { type: String },
        hospitalName: { type: String },
        hospitalAddress: { type: String },
        websiteLink: { type: String },
        emergencyContactNumber: { type: String },
      },
    },

    // Common fields for admin and doctor
    country: { type: String },
    state: { type: String },
    city: { type: String },

    // Extra fields for future requirements
    extraFields: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Hashing the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

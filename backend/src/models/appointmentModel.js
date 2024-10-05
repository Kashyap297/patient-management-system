const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model for patients
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    hospital: {
      type: String,
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model for doctors
      required: true,
    },
    patientIssue: {
      type: String,
      required: true,
    },
    diseaseName: {
      type: String,
      default: "", // Optional field
    },
    appointmentType: {
      type: String,
      enum: ["Online", "Onsite"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Cancelled", "Completed"],
      default: "Pending",
    },
    doctorFees: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);

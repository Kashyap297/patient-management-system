const mongoose = require("mongoose");
// Patient Record Model
const patientRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to Doctor (User model)
      required: true,
    },
    files: [
      {
        url: { type: String, required: true }, // URL to the file
        description: { type: String, required: true }, // Description of the file
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PatientRecord", patientRecordSchema);

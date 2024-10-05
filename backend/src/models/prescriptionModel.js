const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  strength: { type: String, required: true },
  dose: { type: String, required: true },
  duration: { type: String, required: true },
  whenToTake: { type: String, required: true },
});

const prescriptionSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the doctor
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the patient
      required: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment", // Reference to the appointment
      required: true,
    },
    medicines: [medicineSchema], // Array of medicines
    additionalNote: { type: String, default: "" }, // Optional field for additional notes
    prescriptionDate: { type: Date, default: Date.now }, // Date of the prescription
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);

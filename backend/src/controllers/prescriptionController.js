const Prescription = require("../models/prescriptionModel");
const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");

// @desc    Create a new prescription
// @route   POST /api/prescription
// @access  Private (Only doctors can create)
exports.createPrescription = async (req, res) => {
  const { appointmentId, medicines, additionalNote } = req.body;

  try {
    // Check if the user making the request is a doctor
    const doctor = await User.findById(req.user._id);
    if (!doctor || doctor.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Only doctors can create prescriptions" });
    }

    // Check if the appointment exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Ensure the patient exists and matches the appointment
    const patient = await User.findById(appointment.patient);
    if (!patient || patient.role !== "patient") {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Create the prescription
    const newPrescription = new Prescription({
      doctor: req.user._id,
      patient: appointment.patient,
      appointmentId: appointmentId,
      medicines,
      additionalNote,
    });

    await newPrescription.save();

    res.status(201).json({
      message: "Prescription created successfully",
      prescription: newPrescription,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating prescription", error });
  }
};
// @desc    Get a prescription by ID
// @route   GET /api/prescription/:id
// @access  Private (Doctor and Patient can view)
exports.getPrescriptionById = async (req, res) => {
  const { id } = req.params;

  try {
    const prescription = await Prescription.findById(id)
      .populate("doctor", "firstName lastName specialty")
      .populate("patient", "firstName lastName age gender address")
      .populate("appointmentId", "appointmentDate appointmentTime hospital");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json({
      success: true,
      prescription,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching prescription", error });
  }
};

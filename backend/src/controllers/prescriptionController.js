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


// @desc    Get all prescriptions for the logged-in user
// @route   GET /api/prescription
// @access  Private (Doctors and Patients can view their prescriptions)
exports.getAllPrescriptionsByUser = async (req, res) => {
  try {
    let prescriptions;

    // If the logged-in user is a doctor, find prescriptions created by them
    if (req.user.role === "doctor") {
      prescriptions = await Prescription.find({ doctor: req.user._id })
        .populate("doctor", "firstName lastName specialty")
        .populate("patient", "firstName lastName age gender address")
        .populate("appointmentId", "appointmentDate appointmentTime hospital");
    }
    // If the logged-in user is a patient, find prescriptions for them
    else if (req.user.role === "patient") {
      prescriptions = await Prescription.find({ patient: req.user._id })
        .populate("doctor", "firstName lastName specialty")
        .populate("patient", "firstName lastName age gender address")
        .populate("appointmentId", "appointmentDate appointmentTime hospital");
    }
    // If the user is neither a doctor nor a patient, deny access
    else {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching prescriptions", error });
  }
};

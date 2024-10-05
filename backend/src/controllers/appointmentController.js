const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel"); // Assuming you have a user model

// @desc    Create a new appointment
// @route   POST /api/appointment
// @access  Private (Only patients can book)
exports.createAppointment = async (req, res) => {
  const {
    specialty,
    country,
    state,
    city,
    appointmentDate,
    appointmentTime,
    hospital,
    doctor,
    patientIssue,
    diseaseName,
    appointmentType,
    doctorFees,
  } = req.body;

  try {
    // Check if the user making the request is a patient
    const user = await User.findById(req.user._id);
    if (!user || user.role !== "patient") {
      return res
        .status(403)
        .json({ message: "Only patients can book appointments" });
    }

    // Create the appointment
    const newAppointment = await Appointment.create({
      patient: req.user._id,
      specialty,
      country,
      state,
      city,
      appointmentDate,
      appointmentTime,
      hospital,
      doctor,
      patientIssue,
      diseaseName,
      appointmentType,
      status: "Pending", // By default, set status to pending
      doctorFees,
    });

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating appointment", error });
  }
};

// @desc    Get All Appointments
// @route   GET /api/appointments
// @access  Private (Patients only)
exports.getAllAppointments = async (req, res) => {
  try {
    // Find all appointments and populate the patient information
    const appointments = await Appointment.find().populate({
      path: "patient",
      select: "firstName lastName phoneNumber age gender address", // select the fields you want from the user model
    });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments.map((appointment) => ({
        appointmentType: appointment.appointmentType,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
        patientPhoneNumber: appointment.patient.phoneNumber,
        patientAge: appointment.patient.age,
        patientGender: appointment.patient.gender,
        patientIssue: appointment.patientIssue,
        diseaseName: appointment.diseaseName,
        doctorName: appointment.doctor,
        patientAddress: appointment.patient.address,
        status: appointment.status,
        doctorFees: appointment.doctorFees,
        hospitalName: appointment.hospital,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// @desc    Get Appointment by ID
// @route   GET /api/appointments/:id
// @access  Private (Patients only)
exports.getAppointmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id).populate({
      path: "patient",
      select: "firstName lastName phoneNumber age gender address",
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({
      success: true,
      data: {
        appointmentType: appointment.appointmentType,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
        patientPhoneNumber: appointment.patient.phoneNumber,
        patientAge: appointment.patient.age,
        patientGender: appointment.patient.gender,
        patientIssue: appointment.patientIssue,
        diseaseName: appointment.diseaseName,
        doctorName: appointment.doctor,
        patientAddress: appointment.patient.address,
        status: appointment.status,
        doctorFees: appointment.doctorFees,
        hospitalName: appointment.hospital,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.rescheduleAppointment = async (req, res) => {
  const { id } = req.params;
  const { appointmentDate, appointmentTime } = req.body;

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.appointmentDate =
      appointmentDate || appointment.appointmentDate;
    appointment.appointmentTime =
      appointmentTime || appointment.appointmentTime;

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment rescheduled successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "Cancelled"; // Update the status to cancelled

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

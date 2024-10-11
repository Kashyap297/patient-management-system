const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

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
    doctor, // Expecting the doctor ID from the frontend
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

    // Check if the doctor exists in the User collection
    const doctorUser = await User.findById(doctor);
    if (!doctorUser || doctorUser.role !== "doctor") {
      return res.status(404).json({ message: "Doctor not found or not valid" });
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
      status: "Pending",
      doctorFees,
    });

    // Return the new appointment including the generated ID
    res.status(201).json({
      message: "Appointment created successfully",
      appointment: {
        id: newAppointment._id,
        ...newAppointment._doc,
      },
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
    const appointments = await Appointment.find()
      .populate({
        path: "patient",
        select: "firstName lastName phoneNumber age gender address",
      })
      .populate({
        path: "doctor",
        select:
          "firstName lastName doctorDetails.qualification doctorDetails.specialtyType doctorDetails.experience doctorDetails.hospital _id", // Add _id here to ensure doctor ID is included
      });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments.map((appointment) => ({
        id: appointment._id,
        appointmentType: appointment.appointmentType,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        patientName: appointment.patient
          ? `${appointment.patient.firstName} ${appointment.patient.lastName}`
          : "Unknown",
        patientPhoneNumber: appointment.patient
          ? appointment.patient.phoneNumber
          : "N/A",
        patientAge: appointment.patient ? appointment.patient.age : "N/A",
        patientGender: appointment.patient ? appointment.patient.gender : "N/A",
        patientIssue: appointment.patient
          ? appointment.patient.patientIssue
          : "N/A",
        diseaseName: appointment.diseaseName,
        doctorId: appointment.doctor ? appointment.doctor._id : null, // Add doctor ID to the response
        patientId: appointment.patient ? appointment.patient._id : null,
        doctorName: appointment.doctor
          ? `${appointment.doctor.firstName} ${appointment.doctor.lastName}`
          : "N/A",
        doctorSpecialty: appointment.doctor && appointment.doctor.doctorDetails
          ? appointment.doctor.doctorDetails.specialtyType
          : "N/A",
        doctorQualification: appointment.doctor && appointment.doctor.doctorDetails
          ? appointment.doctor.doctorDetails.qualification
          : "N/A",
        doctorExperience: appointment.doctor && appointment.doctor.doctorDetails
          ? appointment.doctor.doctorDetails.experience
          : "N/A",
        doctorHospital: appointment.doctor && appointment.doctor.doctorDetails
          ? appointment.doctor.doctorDetails.hospital.currentHospital
          : "N/A",
        patientAddress: appointment.patient
          ? appointment.patient.address
          : "N/A",
        status: appointment.status,
        doctorFees: appointment.doctorFees,
        hospitalName: appointment.hospital,
      })),
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// @desc    Get Appointment by ID
// @route   GET /api/appointments/:id
// @access  Private (Patients only)
exports.getAppointmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id)
      .populate({
        path: "patient",
        select: "firstName lastName phoneNumber age gender address",
      })
      .populate({
        path: "doctor",
        select:
          "firstName lastName specialty qualification experience hospital",
      });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        id: appointment._id,
        appointmentType: appointment.appointmentType,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        patientName: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
        patientPhoneNumber: appointment.patient.phoneNumber,
        patientAge: appointment.patient.age,
        patientGender: appointment.patient.gender,
        patientIssue: appointment.patientIssue,
        diseaseName: appointment.diseaseName,
        doctorName: appointment.doctor
          ? `${appointment.doctor.firstName} ${appointment.doctor.lastName}`
          : "N/A",
        doctorSpecialty: appointment.doctor
          ? appointment.doctor.specialty
          : "N/A",
        doctorQualification: appointment.doctor
          ? appointment.doctor.qualification
          : "N/A",
        doctorExperience: appointment.doctor
          ? appointment.doctor.experience
          : "N/A",
        doctorHospital: appointment.doctor
          ? appointment.doctor.hospital
          : "N/A",
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

// @desc    Reschedule Appointment
// @route   PATCH /api/appointments/reschedule/:id
// @access  Private
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

// @desc    Cancel Appointment
// @route   PATCH /api/appointments/cancel/:id
// @access  Private
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

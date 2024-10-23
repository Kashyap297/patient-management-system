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

    // Check for conflicting appointments (same doctor, same date, and overlapping time)
    const existingAppointment = await Appointment.findOne({
      doctor: doctor,  // Same doctor
      appointmentDate: appointmentDate,  // Same date
      appointmentTime: appointmentTime  // Same time slot
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "The selected time slot is already booked for this doctor.",
      });
    }

    // If no conflict, create the appointment
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
// @desc    Get All Appointments for the logged-in patient
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
        patientIssue: appointment.patientIssue,
          //  ? appointment.patient.age
          //  : "N/A",
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


// @desc    Get all booked appointments for a doctor on a given date
// @route   GET /api/appointments/booked/:doctorId/:date
// @access  Private
exports.getDoctorAppointmentsByDate = async (req, res) => {
  const { doctorId, date } = req.params;

  try {
    // Find all appointments for the doctor on the selected date
    const appointments = await Appointment.find({
      doctor: doctorId,
      appointmentDate: new Date(date),  // Ensure correct date format
    }).select("appointmentTime");

    res.status(200).json({
      success: true,
      bookedSlots: appointments.map((a) => a.appointmentTime),
    });
  } catch (error) {
    console.error("Error fetching doctor's appointments:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


// @desc    Get booked slots for a specific doctor on a particular date
// @route   GET /api/appointments/booked/:doctorId/:date
// @access  Private (for fetching booked slots for appointment booking)
exports.getBookedSlots = async (req, res) => {
  const { doctorId } = req.params; // We don't need to pass a specific date

  try {
    // Find all appointments for the doctor
    const appointments = await Appointment.find({
      doctor: doctorId,
      status: "Pending", // Only consider appointments that are pending
    }).select("appointmentDate appointmentTime");

    // Group booked slots by date
    const bookedSlotsByDate = {};

    appointments.forEach(appointment => {
      const dateKey = appointment.appointmentDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
      if (!bookedSlotsByDate[dateKey]) {
        bookedSlotsByDate[dateKey] = [];
      }
      bookedSlotsByDate[dateKey].push(appointment.appointmentTime);
    });

    // Return the grouped booked slots
    res.status(200).json({
      success: true,
      bookedSlots: bookedSlotsByDate, // Slots grouped by date
    });
  } catch (error) {
    console.error("Error fetching booked slots:", error);
    res.status(500).json({ message: "Error fetching booked slots", error });
  }
};

// @desc    Update appointment status
// @route   PATCH /api/appointments/:id
// @access  Private
exports.updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Status will be passed in the request body

  try {
    // Find the appointment by ID
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update the appointment status
    appointment.status = status || appointment.status;

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment status updated successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

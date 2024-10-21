const express = require("express");
const router = express.Router();
const {
  createAppointment,
  cancelAppointment,
  rescheduleAppointment,
  getAppointmentById,
  getAllAppointments,
  getDoctorAppointmentsByDate,
  getBookedSlots,
} = require("../controllers/appointmentController");
const { protect } = require("../middlewares/authMiddleware");

// Route to create an appointment
router.post("/appointment", protect, createAppointment);

// Get all appointments
router.get("/appointments", protect, getAllAppointments);

// Get an appointment by ID
router.get("/appointments/:id", getAppointmentById);

// Reschedule appointment
router.patch("/appointments/reschedule/:id", rescheduleAppointment);

// Cancel appointment
router.patch("/appointments/cancel/:id", cancelAppointment);

// Get all booked appointments for a specific doctor on a given date
router.get("/appointments/booked/:doctorId/:date", getBookedSlots);


module.exports = router;

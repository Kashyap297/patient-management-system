const express = require("express");
const router = express.Router();
const {
  createAppointment,
  cancelAppointment,
  rescheduleAppointment,
  getAppointmentById,
  getAllAppointments,
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

module.exports = router;

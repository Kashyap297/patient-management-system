const express = require("express");
const router = express.Router();
const { createappointment } = require("../controllers/appointmentController");

// Route to create a appointment
router.post("/appointment", createappointment);

module.exports = router;

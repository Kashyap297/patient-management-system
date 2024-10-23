const express = require("express");
const router = express.Router();
const {
  getDoctorAppointments,
  getPatientDetails,
  addPatientRecord,
  getPatientRecords,
} = require("../controllers/patientRecordController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../utils/multerConfig");

// Route to get all appointments for a doctor
router.get("/appointments", protect, getDoctorAppointments);

// Route to get patient details by appointment id
router.get("/appointment/:id", protect, getPatientDetails);

// Route to add patient record (file upload and description)
router.post('/patient/records', upload.single('file'),addPatientRecord)

// Route to get all patient records for a doctor
router.get("/patient/records/:patientId/:doctorId", protect, getPatientRecords);

module.exports = router;

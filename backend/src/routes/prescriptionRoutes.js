const express = require("express");
const router = express.Router();
const {
  createPrescription,
  getPrescriptionById,
} = require("../controllers/prescriptionController");
const { protect } = require("../middlewares/authMiddleware");

// Route to create a prescription
router.post("/", protect, createPrescription);

// Route to get a prescription by ID
router.get("/:id", protect, getPrescriptionById);

module.exports = router;

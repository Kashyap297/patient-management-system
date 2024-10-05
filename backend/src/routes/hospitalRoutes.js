const express = require("express");
const router = express.Router();
const {
  createHospital,
  getAllHospitals,
} = require("../controllers/hospitalController");

// Route to create a hospital
router.post("/hospitals", createHospital);

// Route to get all hospitals
router.get("/hospitals", getAllHospitals);

module.exports = router;

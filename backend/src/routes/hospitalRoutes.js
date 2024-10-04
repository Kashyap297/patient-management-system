const express = require("express");
const router = express.Router();
const { createHospital } = require("../controllers/hospitalController");

// Route to create a hospital
router.post("/hospitals", createHospital);

module.exports = router;

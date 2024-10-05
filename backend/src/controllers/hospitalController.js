const Hospital = require("../models/hospitalModel");

// @desc    Create a new hospital
// @route   POST /api/hospitals
// @access  Public or Private (Based on your needs)
exports.createHospital = async (req, res) => {
  const { name, address, country, state, city, zipCode } = req.body;

  try {
    // Check if hospital already exists by name and city (or any other unique criteria)
    const hospitalExists = await Hospital.findOne({ name, city });
    if (hospitalExists) {
      return res.status(400).json({ message: "Hospital already exists" });
    }

    // Create a new hospital
    const hospital = new Hospital({
      name,
      address,
      country,
      state,
      city,
      zipCode,
    });

    // Save hospital to the database
    const createdHospital = await hospital.save();

    res.status(201).json({
      message: "Hospital created successfully",
      hospital: createdHospital,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Get all hospitals
// @route   GET /api/hospitals
// @access  Public
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find(); // Fetch all hospitals from the database
    res.status(200).json({
      message: "Hospitals fetched successfully",
      data: hospitals,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

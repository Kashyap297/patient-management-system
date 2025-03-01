const cloudinary = require("cloudinary").v2;

const {
  ComplianceRegistrationInquiriesListInstance,
} = require("twilio/lib/rest/trusthub/v1/complianceRegistrationInquiries");
const Appointment = require("../models/appointmentModel");
const PatientRecord = require("../models/patientRecordModel");

//1. Fetch All Appointments for a Doctor
exports.getDoctorAppointments = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const doctorId = req.user._id; // Assuming the user is the doctor

    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient", "firstName lastName age gender phoneNumber")
      .populate("doctor", "firstName lastName specialty");

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 2. Fetch Patient Details by Appointment ID
exports.getPatientDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id)
      .populate("patient", "firstName lastName age gender address phoneNumber")
      .populate("doctor", "firstName lastName specialty");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 3. Add Patient Record (File Upload and Description)
const multer = require("multer");
const path = require("path");
const { default: mongoose } = require("mongoose");

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/"); // Folder to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("file"); // Single file upload

exports.addPatientRecord = async (req, res) => {
  try {
    const { patientId, doctorId, description } = req.body;

    // Validate required fields
    if (!patientId || !doctorId || !description || !req.file) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find if the record already exists for this patient and doctor
    let patientRecord = await PatientRecord.findOne({
      patient: patientId,
      doctor: doctorId,
    });

    // ✅ Upload File to Cloudinary
    let fileUrl = null;
    try {
      const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path, {
        folder: "hospital-management/patient-records",
      });
      fileUrl = cloudinaryUpload.secure_url; // ✅ Save Cloudinary URL
    } catch (uploadError) {
      console.error("❌ Cloudinary Upload Error:", uploadError);
      return res.status(500).json({ message: "Error uploading patient record file" });
    }

    if (!patientRecord) {
      // Create new patient record if it doesn't exist
      patientRecord = new PatientRecord({
        patient: patientId,
        doctor: doctorId,
        files: [{ url: fileUrl, description }],
      });
    } else {
      // Add new file to existing patient record
      patientRecord.files.push({ url: fileUrl, description });
    }

    // ✅ Save the patient record
    await patientRecord.save();

    // ✅ Respond with success
    res.status(201).json({
      message: "Record added successfully",
      data: patientRecord,
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
};




//4 Fetch All Patient Records for a Doctor
exports.getPatientRecords = async (req, res) => {
  const { patientId, doctorId } = req.params;
  console.log(patientId, doctorId);
  try {
    // Ensure the IDs are valid ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(patientId) ||
      !mongoose.Types.ObjectId.isValid(doctorId)
    ) {
      return res.status(400).json({ message: "Invalid patient or doctor ID" });
    }

    const patientRecord = await PatientRecord.findOne({
      patient: patientId,
      doctor: doctorId,
    })
      .populate("patient", "firstName lastName age gender address phoneNumber")
      .populate("doctor", "firstName lastName specialty");

    if (!patientRecord) {
      return res.status(404).json({ message: "No records found" });
    }

    res.status(200).json({
      success: true,
      data: patientRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


// Fetch All Test Reports for a Patient 
exports.getPatientTestReports = async (req, res) => {
  const { patientId } = req.params;

  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    // Find all patient records for this patient
    const patientRecords = await PatientRecord.find({ patient: patientId })
      .populate("doctor", "firstName lastName specialty")
      .select("doctor files createdAt");

    if (!patientRecords || patientRecords.length === 0) {
      return res.status(404).json({ message: "No test reports found" });
    }

    // Format the response
    const testReports = patientRecords.flatMap((record) =>
      record.files.map((file) => ({
        doctor: `${record.doctor.firstName} ${record.doctor.lastName}`,
        specialty: record.doctor.specialty,
        date: record.createdAt.toISOString().split("T")[0], // Format date
        fileUrl: file.url,
        description: file.description,
      }))
    );

    res.status(200).json({
      success: true,
      count: testReports.length,
      data: testReports,
    });
  } catch (error) {
    console.error("Error fetching test reports:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


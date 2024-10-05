const express = require("express");
const dbConnection = require("./config/db");
const Config = require("./config");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const upload = require("./utils/multerConfig");
const hospitalRoutes = require("./routes/hospitalRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const patientRecordRoutes = require("./routes/patientRecordRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const router = express.Router();

const app = express();

const PORT = Config.PORT || 5000;

// Middleware to parse incoming JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// dbConnection
dbConnection();

// API routes
app.use("/api/users", userRoutes);
app.use("/api", hospitalRoutes);
app.use("/api", appointmentRoutes);
app.use("/api/patients", patientRecordRoutes);
app.use("/api/prescription", prescriptionRoutes);

router.post("/upload", upload.single("profileImage"), (req, res) => {
  const { username } = req.body; // Capture additional fields
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({
    message: "File uploaded successfully",
    file: req.file,
    username: username, // Return the username or any other fields
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err, "Server is not connected");
  }
  console.log(`Listening on port : http://localhost:${PORT}`);
});

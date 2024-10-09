const express = require("express");
const dbConnection = require("./config/db");
const Config = require("./config");
const path = require("path");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const upload = require("./utils/multerConfig");
const hospitalRoutes = require("./routes/hospitalRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const patientRecordRoutes = require("./routes/patientRecordRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const chatRoutes = require("./routes/chatRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const router = express.Router();
const fs = require("fs");

const app = express();

const PORT = Config.PORT || 5000;

// Middleware to parse incoming JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// dbConnection
dbConnection();

// Serve static files from the uploads folder inside src
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/users", userRoutes);
app.use("/api", hospitalRoutes);
app.use("/api", appointmentRoutes);
app.use("/api/patients", patientRecordRoutes);
app.use("/api/prescription", prescriptionRoutes);
app.use("/api", chatRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/payment", paymentRoutes);

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

app.get("/uploads-list", (req, res) => {
  fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
    if (err) {
      console.error("Error scanning directory:", err);
      return res.status(500).send(`Unable to scan directory: ${err.message}`);
    }
    res.send(files);
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err, "Server is not connected");
  }
  console.log(`Listening on port : http://localhost:${PORT}`);
});

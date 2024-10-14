const express = require("express");
const http = require("http"); // Import http for socket server
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const dbConnection = require("./config/db");
const Config = require("./config");
const socket = require("./utils/socket"); // Import socket setup
const socketio = require("./utils/teleconsultationSocket");

// Import routes
const userRoutes = require("./routes/userRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const patientRecordRoutes = require("./routes/patientRecordRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const chatRoutes = require("./routes/chatRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const upload = require("./utils/multerConfig");

const app = express();
const server = http.createServer(app); // Create HTTP server

socketio.init(server);

const PORT = Config.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type"],
  credentials: true,
}));

// Database connection
dbConnection();

// Serve static files from the 'uploads' folder inside 'src'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes setup
app.use("/api/users", userRoutes);
app.use("/api", hospitalRoutes);
app.use("/api", appointmentRoutes);
app.use("/api/patients", patientRecordRoutes);
app.use("/api/prescription", prescriptionRoutes);
app.use("/api", chatRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/payment", paymentRoutes);

// File upload route
app.post("/upload", upload.single("profileImage"), (req, res) => {
  const { username } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({
    message: "File uploaded successfully",
    file: req.file,
    username,
  });
});

// Route to list uploaded files
app.get("/uploads-list", (req, res) => {
  fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
    if (err) {
      console.error("Error scanning directory:", err);
      return res.status(500).send(`Unable to scan directory: ${err.message}`);
    }
    res.send(files);
  });
});



// Start server and initialize Socket.io
server.listen(PORT, (err) => {
  if (err) {
    console.log("Server startup error:", err);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
    socket.init(server); // Initialize socket after the server is listening
  }
});

const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/"); // Folder where files will be stored
    cb(null, "./src/uploads/"); // Folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Set up multer
const upload = multer({
  storage: storage, // Use the disk storage engine defined above
});

module.exports = upload;

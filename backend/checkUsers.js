require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/models/userModel");

mongoose.connect(process.env.DB_URL)
  .then(async () => {
    const user = await User.findOne({ email: "admin@example.com" });
    if (!user) {
      console.log("No user found with email admin@example.com");
    } else {
      console.log("User:", user.email, user.role, "Password Hash:", user.password);
    }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

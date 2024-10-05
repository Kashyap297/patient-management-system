// models/chatModel.js
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Both doctor and patient are users
        required: true,
      },
    ],
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` timestamps
);

module.exports = mongoose.model("Chat", chatSchema);

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Either patient or doctor
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String, // URL for image or PDF
    },
    fileType: {
      type: String, // Either 'image' or 'pdf'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);

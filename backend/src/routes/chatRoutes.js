// routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllChats,
  getChatMessages,
  startChat,
  sendMessage,
} = require("../controllers/chatController");
const upload = require("../utils/multerConfig");
const { protect } = require("../middlewares/authMiddleware");

// Get all chats for a user (patient/doctor)
router.get("/chats", protect, getAllChats);

// Get all messages for a specific chat
router.get("/chats/:chatId/messages", protect, getChatMessages);

// Start a new chat
router.post("/chats/start", protect, startChat);

// Send a message in a specific chat
router.post("/chats/:chatId/message", protect, upload.single("file"), sendMessage);

module.exports = router;

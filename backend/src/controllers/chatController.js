// controllers/chatController.js
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");


// Get all chat participants for a user
exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user._id })
      .populate("participants", "firstName lastName");

    res.status(200).json({ success: true, chats });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get chat messages by chat ID
exports.getChatMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "firstName lastName")
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Start a Chat
// Start a Chat by Patient
exports.startChat = async (req, res) => {
  const { doctorId, sender } = req.body;
  console.log("Received request to start chat with doctorId:", doctorId, "and sender:", sender);

  try {
    // Check if both sender and doctor exist in the database
    const doctor = await User.findById(doctorId);
    const patient = await User.findById(sender);

    console.log("Doctor found:", doctor);
    console.log("Patient found:", patient);

    if (!doctor || !patient) {
      return res.status(404).json({ message: "Doctor or patient not found" });
    }

    // Check if a chat already exists between this patient and doctor
    let chat = await Chat.findOne({
      participants: { $all: [doctorId, sender] },
    });

    if (!chat) {
      chat = new Chat({
        participants: [doctorId, sender],
      });
      await chat.save();
      console.log("New chat created with ID:", chat._id);
    } else {
      console.log("Existing chat found with ID:", chat._id);
    }

    res.status(201).json({
      message: "Chat started successfully",
      chatId: chat._id,
    });
  } catch (error) {
    console.error("Error in startChat controller:", error);
    res.status(500).json({
      message: "Error starting chat",
      error,
    });
  }
};



// Send Message in a Chat
// controllers/chatController.js
exports.sendMessage = async (req, res) => {
  const io = require("../utils/socket").getIO();
  const { chatId } = req.params;
  const { content } = req.body;

  if (!chatId || chatId === 'undefined') {
    return res.status(400).json({ message: "Invalid or missing chat ID" });
  }
  if (!content) {
    return res.status(400).json({ message: "Message content is required" });
  }

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const newMessage = await Message.create({
      chat: chatId,
      sender: req.user._id,
      content,
    });

    // Emit the new message to the room
    io.to(chatId).emit("newMessage", newMessage);

    res.status(201).json({
      message: "Message sent successfully",
      messageData: newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Error sending message", error });
  }
};

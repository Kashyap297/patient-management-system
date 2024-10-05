// controllers/chatController.js
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

// Get all chat participants for a user
exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user._id }).populate(
      "participants",
      "firstName lastName"
    );

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

// Start a Chat by Patient
exports.startChat = async (req, res) => {
  const { doctorId, content, sender } = req.body;

  try {
    // Check if both sender and doctor exist in the database
    const doctor = await User.findById(doctorId);
    const patient = await User.findById(sender);

    if (!doctor || !patient) {
      return res.status(404).json({ message: "Doctor or patient not found" });
    }

    // Check if a chat already exists between this patient and doctor
    let chat = await Chat.findOne({
      participants: { $all: [doctorId, sender] },
    });

    // If no chat exists, create a new one
    if (!chat) {
      chat = new Chat({
        participants: [doctorId, sender],
      });
      await chat.save();
    }

    // Now create the first message
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const newMessage = await Message.create({
      chat: chat._id,
      sender,
      content,
    });

    res.status(201).json({
      message: "Chat started and message sent successfully",
      chatId: chat._id,
      message: newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error starting chat",
      error,
    });
  }
};

// Send Message in a Chat
exports.sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { content } = req.body;
  const fileUrl = req.file ? `./src/uploads/${req.file.filename}` : null; // If there's an uploaded file, save its path
  const fileType = req.file ? req.file.mimetype.split("/")[0] : null; // 'image' or 'application' (for PDF)

  try {
    // Ensure the chat exists
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Ensure the user is a participant in the chat
    if (!chat.participants.includes(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not a participant of this chat" });
    }

    // Create the message
    const newMessage = await Message.create({
      chat: chatId,
      sender: req.user._id,
      content,
      fileUrl, // Optional fileUrl if an image or pdf is attached
      fileType, // Optional fileType ('image' or 'pdf')
    });

    res.status(201).json({
      message: "Message sent successfully",
      messageData: newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending message", error });
  }
};

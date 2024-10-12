const socketio = require("socket.io");
const Message = require("../models/messageModel"); // Import Message model

let io;

module.exports = {
  init: (server) => {
    io = socketio(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      // Join chat room
      socket.on("joinChat", ({ chatId }) => {
        socket.join(chatId);
        console.log(`User joined chat ${chatId}`);
      });

      // Handle sending message
      socket.on("sendMessage", async (data) => {
        const { chatId, senderId, messageContent, fileUrl, fileType } = data;

        try {
          const newMessage = await Message.create({
            chat: chatId,
            sender: senderId,
            content: messageContent,
            fileUrl,
            fileType,
          });

          io.to(chatId).emit("newMessage", newMessage); // Emit the new message to the room
        } catch (error) {
          console.error("Error creating message:", error);
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};

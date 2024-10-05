// socket.js
const socketio = require("socket.io");
const Chat = require("./models/Chat");
const Message = require("./models/Message");

let io;

module.exports = {
  init: (server) => {
    io = socketio(server);

    io.on("connection", (socket) => {
      console.log("A user connected");

      // Join chat room
      socket.on("joinChat", async ({ chatId }) => {
        socket.join(chatId);
        console.log(`User joined chat ${chatId}`);
      });

      // Handle sending message
      socket.on("sendMessage", async (data) => {
        const { chatId, senderId, messageContent, fileUrl, fileType } = data;

        const newMessage = await Message.create({
          chat: chatId,
          sender: senderId,
          content: messageContent,
          fileUrl,
          fileType,
        });

        // Send message to the room
        io.to(chatId).emit("newMessage", newMessage);
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

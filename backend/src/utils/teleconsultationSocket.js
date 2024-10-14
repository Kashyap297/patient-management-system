const socketio = require("socket.io");
const Message = require("../models/messageModel"); // Update as needed for your file structure

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

            // Join a teleconsultation room
            socket.on("joinTeleconsultation", ({ roomId, userId }) => {
                socket.join(roomId);
                console.log(`User ${userId} joined teleconsultation room ${roomId}`);

                // Notify others in the room
                socket.broadcast.to(roomId).emit("userJoined", { userId });
            });

            // Toggle audio
            socket.on("toggleAudio", ({ roomId, userId, isMuted }) => {
                io.to(roomId).emit("audioToggled", { userId, isMuted });
            });

            // Toggle video
            socket.on("toggleVideo", ({ roomId, userId, isVideoOff }) => {
                io.to(roomId).emit("videoToggled", { userId, isVideoOff });
            });

            // Raise hand
            socket.on("raiseHand", ({ roomId, userId }) => {
                io.to(roomId).emit("handRaised", { userId });
            });

            // Share screen
            socket.on("startScreenShare", ({ roomId, userId }) => {
                io.to(roomId).emit("screenShareStarted", { userId });
            });

            socket.on("stopScreenShare", ({ roomId, userId }) => {
                io.to(roomId).emit("screenShareStopped", { userId });
            });

            // File upload in chat
            socket.on("sendFile", async (data) => {
                const { roomId, senderId, fileUrl, fileType } = data;

                try {
                    const newMessage = await Message.create({
                        chat: roomId,
                        sender: senderId,
                        fileUrl,
                        fileType,
                    });

                    io.to(roomId).emit("fileReceived", newMessage);
                } catch (error) {
                    console.error("Error sending file:", error);
                }
            });

            // Handle disconnect
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

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import userImage from '../../assets/images/user.png';
import chatIcon from '../../assets/images/chat-icon.png';
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const ChatPage = () => {
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

  const token = localStorage.getItem("token");
  let role, loggedInUserId;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      loggedInUserId = decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      window.location.href = "/login";
    }
  } else {
    window.location.href = "/login";
  }

  // Fetch users based on role
  useEffect(() => {
    if (!role || !token) return;

    const fetchUsers = async () => {
      const endpoint = role === "doctor" ? "/api/users/patients" : "/api/users/doctors";
      try {
        const response = await fetch(`http://localhost:8000${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUserList(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [role, token]);

  // Fetch messages when a chat is selected
  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/chats/${selectedChat}/messages`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setMessages(data.messages || []);
        } catch (error) {
          console.error("Error fetching messages:", error);
          setMessages([]);
        }
      };

      fetchMessages();
      // Join the selected chat room for real-time updates
      socket.emit("joinChat", { chatId: selectedChat });
    }
  }, [selectedChat, token]);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const startChat = async (user) => {
    try {
      const response = await fetch("http://localhost:8000/api/chats/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ doctorId: user._id, sender: loggedInUserId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error details:", errorData);
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setSelectedChat(data.chatId);
      setSelectedChatUser(user);
      setMessages([]); // Reset messages on new chat
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const sendMessageResponse = await fetch(`http://localhost:8000/api/chats/${selectedChat}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newMessage }),
      });

      if (!sendMessageResponse.ok) {
        throw new Error(`Error ${sendMessageResponse.status}: ${sendMessageResponse.statusText}`);
      }

      // socket.emit("sendMessage", {
      //   chatId: selectedChat,
      //   senderId: loggedInUserId,
      //   messageContent: newMessage,
      // });

      setNewMessage(""); // Clear input field after sending the message

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const filteredUserList = userList.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full p-6">
      {/* Sidebar with Users */}
      <div className="w-1/5 bg-white shadow-sm p-4 rounded-s-xl">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Chat</h2>
          <div className="relative mt-2">
            <input
              type="text"
              placeholder={`Search ${role === "doctor" ? "Patient" : "Doctor"}`}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute top-2 right-4 text-gray-500" />
          </div>
        </div>
        <div className="space-y-2 h-full">
          {filteredUserList.length > 0 ? (
            filteredUserList.map((user) => (
              <div
                key={user._id}
                onClick={() => startChat(user)}
                className={`flex items-center p-2 cursor-pointer ${selectedChatUser && selectedChatUser._id === user._id ? "bg-blue-100" : ""}`}
              >
                <img
                  src={user.profileImage || userImage}
                  alt="avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{user.firstName} {user.lastName}</p>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 py-4 h-full">
              <img src={chatIcon} alt="icon" className="h-24 w-24" />
              <p className="py-4">No users found</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-4/5 bg-gray-50 flex flex-col">
        {selectedChatUser ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center p-4 bg-white">
              <img src={selectedChatUser.profileImage || userImage} alt="avatar" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h3 className="font-semibold">{selectedChatUser.firstName} {selectedChatUser.lastName}</h3>
                <p className="text-gray-500">Last seen at 9:00 PM</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner">
              {Array.isArray(messages) && messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === loggedInUserId ? "justify-end" : ""}`}>
                  <div className={`p-2 rounded-lg ${message.sender === loggedInUserId ? "bg-blue-100" : "bg-gray-200"}`}>
                    <p>{message.content}</p>
                    <span className="text-xs text-gray-500">{new Date(message.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="mt-4 flex items-center space-x-2 px-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-4 py-4 rounded-lg bg-gray-100 focus:outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={sendMessage} className="bg-customBlue text-white px-6 font-semibold py-4 rounded-lg">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <img src={chatIcon} alt="No chat" />
            <p className="text-xl text-gray-400 py-6">No chat with someone</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

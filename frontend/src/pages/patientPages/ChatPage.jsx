import React, { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { jwtDecode } from "jwt-decode"; // Correct import
import userImage from "../../assets/images/user.png";
import chatIcon from "../../assets/images/chat-icon.png";
import io from "socket.io-client";
import NoChatWithSomeone from "../../assets/images/NoChatWithSomeone.png";

// Initialize socket connection
const socket = io("http://localhost:8000");

const ChatPage = () => {
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

  // Ref for the messages container
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");
  let role, loggedInUserId;

  // Decode token to get user info
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role; // Doctor or Patient
      loggedInUserId = decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      window.location.href = "/login";
    }
  } else {
    window.location.href = "/login";
  }

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fetch users based on role (doctor or patient)
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
          scrollToBottom(); // Scroll to bottom after messages load
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

  // Listen for new messages via socket and update the UI immediately
  useEffect(() => {
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom(); // Scroll to bottom when a new message is received
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  // Start a chat with the selected user
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

  // Send a new message
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

      setNewMessage(""); // Clear input field after sending the message
      scrollToBottom(); // Scroll to bottom after sending the message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle 'Enter' key for sending message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const filteredUserList = userList.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex h-full p-2 bg-[#ffffff] rounded-xl">
      {/* Sidebar with Users */}
      <div className="w-1/5 bg-white p-4 rounded-s-xl">
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
        <div className="space-y-2 h-[640px] custom-scroll overflow-y-auto">
          {filteredUserList.length > 0 ? (
            filteredUserList.map((user) => (
              <div
                key={user._id}
                onClick={() => startChat(user)}
                className={`flex items-center p-2 cursor-pointer ${selectedChatUser && selectedChatUser._id === user._id ? "bg-blue-100" : ""}`}
              >
                <img
                  src={`http://localhost:8000/${user.profileImage || userImage}`}
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
              <img src={`http://localhost:8000/${selectedChatUser.profileImage || userImage}`} alt="avatar" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h3 className="font-semibold">{selectedChatUser.firstName} {selectedChatUser.lastName}</h3>
                <p className="text-gray-500">Last seen at 9:00 PM</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-2 custom-scroll overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner">
              {Array.isArray(messages) && messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender._id === loggedInUserId ? "justify-end" : "justify-start"}`}>
                  <div className={`p-2 rounded-lg ${message.sender._id === loggedInUserId ? "bg-blue-100 text-right" : "bg-gray-200 text-left"}`}>
                    <p className="font-bold">{message.sender.firstName} {message.sender.lastName}</p> {/* Display sender's name */}
                    <p>{message.content}</p>
                    <span className="text-xs text-gray-500 block mt-1">{new Date(message.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
              {/* This div will always be at the bottom */}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Chat Input */}
            <div className="flex items-center space-x-2 px-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-4 py-4 rounded-lg bg-gray-100 focus:outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress} // Handle 'Enter' key press
              />
              <button onClick={sendMessage} className="bg-customBlue text-white px-6 font-semibold py-4 rounded-lg">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <img src={NoChatWithSomeone} alt="No chat" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

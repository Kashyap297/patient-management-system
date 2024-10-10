import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import user from '../../assets/images/user.png';
import chat from '../../assets/images/chat.png';
import chatIcon from '../../assets/images/chat-icon.png';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Chat", path: "/patient/chat" },
    ]);
  }, [updateBreadcrumb]);

  const chatList = [
    { id: 1, name: "Dr. Monil Patel", lastMessage: "Hello, Esther", time: "12:27" },
    { id: 2, name: "Dr. Vikas Borse", lastMessage: "Hi...", time: "10:27" },
    { id: 3, name: "Dr. Kashyap Chauhan", lastMessage: "Hi...", time: "10:27" },
    { id: 4, name: "Dr. Meet Lakhani", lastMessage: "Hi...", time: "10:27" },
    // Add more chat data as needed
  ];

  const messages = [
    { id: 1, sender: "Dr. Daisy Benjamin", time: "9:00 AM", content: "Hi there, How are you?" },
    { id: 2, sender: "You", time: "10:50 AM", content: "I am coming there in few minutes." },
    // Add more messages as needed
  ];

  // Filter chat list based on search term
  const filteredChatList = chatList.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full p-6">
      {/* Chat List Sidebar */}
      <div className="w-1/5 bg-white shadow-sm p-4 rounded-s-xl">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Chat</h2>
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search Doctor"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
            <FaSearch className="absolute top-2 right-4 text-gray-500" />
          </div>
        </div>
        <div className="space-y-2 h-full">
          {filteredChatList.length > 0 ? (
            filteredChatList.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center p-2 cursor-pointer ${
                  selectedChat?.id === chat.id ? "bg-blue-100" : ""
                }`}
              >
                <img
                  src={user}
                  alt="avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{chat.name}</p>
                  <p className="text-gray-500">{chat.lastMessage}</p>
                </div>
                <span className="ml-auto text-sm text-gray-500">
                  {chat.time}
                </span>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 py-4 h-full">
            <img src={chatIcon} alt="icon" className="h-24 w-24" />
             <p className="py-4">No chat found</p> 
            </div>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-4/5 bg-gray-50 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center p-4 bg-white">
              <img
                src={user}
                alt="avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{selectedChat.name}</h3>
                <p className="text-gray-500">Last seen at 9:00 PM</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "You" ? "justify-end" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      message.sender === "You" ? "bg-blue-100" : "bg-gray-200"
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs text-gray-500">
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="mt-4 flex items-center space-x-2 px-2 ">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-4 py-4 rounded-lg bg-gray-100 focus:outline-none"
              />
              <button className="bg-customBlue text-white px-6 font-semibold py-4 rounded-lg">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <img src={chat} alt="No chat"  />
            <p className="text-xl text-gray-400 py-6">No chat with someone</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;


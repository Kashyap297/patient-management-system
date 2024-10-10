import { useState } from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import chatImage from "../assets/images/chatImage.png"
import { Send } from '@mui/icons-material';

const initialChats = [
  {
    id: 1,
    name: 'Daisy Benjamin',
    time: '12:27 PM',
    message: 'Hello, Esther',
    profile: 'https://randomuser.me/api/portraits/women/50.jpg',
    chat: [
      { sender: 'Samantha', time: '10:48 AM', message: 'Hi there, How are you?' },
      { sender: 'Samantha', time: '10:48 AM', message: 'Waiting for your reply. I have to go back soon.' },
      { sender: 'Samantha', time: '10:57 AM', type: 'image', imageUrl: chatImage },
      { sender: 'You', time: '10:50 AM', message: 'Hi, I am coming there in few minutes.' },
      { sender: 'You', time: '11:05 AM', type: 'file', fileName: 'PDF Documentation', fileSize: '500 kb' },
      { sender: 'Samantha', time: '11:10 AM', message: 'Okay, see you soon!' },
      { sender: 'You', time: '11:15 AM', message: 'Bye!' },
    ],
  },
  {
    id: 2,
    name: 'Samantha Joy',
    time: '9:27 AM',
    message: 'Hi, How are you?',
    profile: 'https://randomuser.me/api/portraits/women/30.jpg',
    chat: [
      { sender: 'Samantha', time: '10:48 AM', message: 'Hi there, How are you?' },
      { sender: 'You', time: '10:50 AM', message: 'I am good, thanks for asking!' },
      { sender: 'Samantha', time: '10:55 AM', message: 'That\'s great!' },
      { sender: 'You', time: '11:00 AM', message: 'What about you?' },
    ],
  },
  {
    id: 3,
    name: 'Emily Chen',
    time: '10:47 AM',
    message: 'Hello, Doctor',
    profile: 'https://randomuser.me/api/portraits/women/20.jpg',
    chat: [
      { sender: 'Emily', time: '10:48 AM', message: 'I have a question about my prescription.' },
      { sender: 'You', time: '10:50 AM', message: 'What is your question?' },
      { sender: 'Emily', time: '10:55 AM', message: 'Can I take it with food?' },
      { sender: 'You', time: '11:00 AM', message: 'Yes, you can take it with food.' },
      { sender: 'Emily', time: '11:05 AM', message: 'Thank you!' },
    ],
  },
  {
    id: 4,
    name: 'Liam Brown',
    time: '11:27 AM',
    message: 'Hi, Doctor',
    profile: 'https://randomuser.me/api/portraits/men/40.jpg',
    chat: [
      { sender: 'Liam', time: '11:28 AM', message: 'I am not feeling well.' },
      { sender: 'You', time: '11:30 AM', message: 'What are your symptoms?' },
      { sender: 'Liam', time: '11:35 AM', message: 'I have a fever and headache.' },
      { sender: 'You', time: '11:40 AM', message: 'I will prescribe you some medication.' },
    ],
  },
  {
    id: 5,
    name: 'Olivia Martin',
    time: '12:17 PM',
    message: 'Hi, Doctor',
    profile: 'https://randomuser.me/api/portraits/women/10.jpg',
    chat: [
      { sender: 'Olivia', time: '12:18 PM', message: 'I need to schedule an appointment.' },
      { sender: 'You', time: '12:20 PM', message: 'What date and time works for you?' },
      { sender: 'Olivia', time: '12:25 PM', message: 'How about tomorrow at 2 PM?' },
      { sender: 'You', time: '12:30 PM', message: 'That works for me.' },
    ],
  },
  {
    id: 6,
    name: 'Ava Lee',
    time: '1:27 PM',
    message: 'Hi, Doctor',
    profile: 'https://randomuser.me/api/portraits/women/60.jpg',
    chat: [
      { sender: 'Ava', time: '1:28 PM', message: 'I have a question about my test results.' },
      { sender: 'You', time: '1:30 PM', message: 'What is your question?' },
      { sender: 'Ava', time: '1:35 PM', message: 'Can you explain the results to me?' },
      { sender: 'You', time: '1:40 PM', message: 'I will explain the results to you.' },
    ],
  },
  {
    id: 7,
    name: 'Ethan Hall',
    time: '2:27 PM',
    message: 'Hi, Doctor',
    profile: 'https://randomuser.me/api/portraits/men/20.jpg',
    chat: [
      { sender: 'Ethan', time: '2:28 PM', message: 'I need to refill my prescription.' },
      { sender: 'You', time: '2:30 PM', message: 'I will refill your prescription.' },
    ],
  },
  {
    id: 8,
    name: 'Sophia Patel',
    time: '3:27 PM',
    message: 'Hi, Doctor',
    profile: 'https://randomuser.me/api/portraits/women/40.jpg',
    chat: [
      { sender: 'Sophia', time: '3:28 PM', message: 'I have a question about my treatment.' },
      { sender: 'You', time: '3:30 PM', message: 'What is your question?' },
      { sender: 'Sophia', time: '3:35 PM', message: 'Can I stop taking the medication?' },
      { sender: 'You', time: '3:40 PM', message: 'No, you should continue taking the medication.' },
    ],
  },
  {
    id: 9,
    name: 'Mia Kim',
    time: '4:27 PM',
    message: 'Hi, Doctor',
    profile: 'https://randomuser.me/api/portraits/women/70.jpg',
    chat: [
      { sender: 'Mia', time: '4:28 PM', message: 'I need to schedule a follow-up appointment.' },
      { sender: 'You', time: '4:30 PM', message: 'What date and time works for you?' },
      { sender: 'Mia', time: '4:35 PM', message: 'How about next week at 10 AM?' },
      { sender: 'You', time: '4:40 PM', message: 'That works for me.' },
    ],
  },
  {
    id: 10,
    name: 'Noah Taylor',
    time: '5:27 PM',
    message: 'Hi, Doctor',
    profile: 'https://randomuser.me/api/portraits/men/30.jpg',
    chat: [
      { sender: 'Noah', time: '5:28 PM', message: 'I have a question about my insurance.' },
      { sender: 'You', time: '5:30 PM', message: 'What is your question?' },
      { sender: 'Noah', time: '5:35 PM', message: 'Does my insurance cover the treatment?' },
      { sender: 'You', time: '5:40 PM', message: 'Yes, your insurance covers the treatment.' },
    ],
  },
  {
    id: 11,
    name: 'Isabella White',
    time: '6:27 PM',
    message: 'Hi, Doctor',
    profile: 'https://randomuser.me/api/portraits/women/80.jpg',
    chat: [
      { sender: 'Isabella', time: '6:28 PM', message: 'I need to cancel my appointment.' },
      { sender: 'You', time: '6:30 PM', message: 'What is the reason for cancellation?' },
      { sender: 'Isabella', time: '6:35 PM', message: 'I have a family emergency.' },
      { sender: 'You', time: '6:40 PM', message: 'I understand. I will cancel your appointment.' },
    ],
  },
  {
    id: 12,
    name: 'Jackson Davis',
    time: '7:27 PM',
    message: 'Hi, Doctor',
    profile: 'https://randomuser.me/api/portraits/men/50.jpg',
    chat: [
      { sender: 'Jackson', time: '7:28 PM', message: 'I have a question about my medication.' },
      { sender: 'You', time: '7:30 PM', message: 'What is your question?' },
      { sender: 'Jackson', time: '7:35 PM', message: 'Can I take it with other medications?' },
      { sender: 'You', time: '7:40 PM', message: 'Yes, you can take it with other medications.' },
    ],
  },
];

const ChatScreen = () => {
  const [selectedChat, setSelectedChat] = useState(initialChats[0]); // Default to first chat
  const [searchTerm, setSearchTerm] = useState('');

  // Handle chat selection
  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  // Filter chat list based on search input
  const filteredChats = initialChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-80px)] p-4 bg-gray-100">
      {/* Chat List (Sidebar) */}
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-4 overflow-auto">
        <div className="mb-4">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search Patient"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <List>
          {filteredChats.map((chat) => (
            <ListItem
              button
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              selected={selectedChat.id === chat.id}
            >
              <ListItemAvatar>
                <Avatar src={chat.profile} alt={chat.name} />
              </ListItemAvatar>
              <ListItemText
                primary={chat.name}
                secondary={chat.message}
                primaryTypographyProps={{ fontWeight: 'bold' }}
                secondaryTypographyProps={{ color: 'textSecondary' }}
              />
              <span>{chat.time}</span>
            </ListItem>
          ))}
        </List>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-white shadow-lg rounded-lg ml-4 p-4 flex flex-col">
        <div className="flex items-center mb-4">
          <Avatar src={selectedChat.profile} alt={selectedChat.name} />
          <div className="ml-4">
            <h2 className="text-lg font-bold">{selectedChat.name}</h2>
            <p className="text-sm text-gray-500">{selectedChat.time}</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-auto mb-4">
          {selectedChat.chat.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
              <div className="inline-block">
                <p className="bg-gray-200 rounded-lg p-2 max-w-xs inline-block text-sm">
                  {msg.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
              </div>
              {/* Show image if it's an image message */}
              {msg.type === 'image' && (
                <div className="my-2">
                  <img src={msg.imageUrl} alt="Chat Image" className="max-w-xs rounded-lg" />
                  <p className="text-xs text-gray-500">{msg.time}</p>
                </div>
              )}
              {/* Show file if it's a file message */}
              {msg.type === 'file' && (
                <div className="my-2 inline-block bg-gray-100 p-2 rounded-lg">
                  <p className="text-blue-500">{msg.fileName}</p>
                  <p className="text-xs text-gray-500">{msg.fileSize}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input box (For future implementation) */}
        <div className="mt-4">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;

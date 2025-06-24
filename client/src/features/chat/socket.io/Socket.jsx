import React, { useState } from 'react';

// change the name 
import UserList from './UserList';
import ChatArea from './ChatArea';
import './Socket.css';

const Socket = () => {


  // get the sockets here  
  const [users, setUsers] = useState([
    {  name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Hey there!', time: '10:30 AM', unread: 2 },
    {  name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2', lastMessage: 'How are you?', time: '9:15 AM', unread: 0 },
    {  name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=3', lastMessage: 'Meeting at 3 PM', time: 'Yesterday', unread: 5 },
    {  name: 'Sarah Williams', avatar: 'https://i.pravatar.cc/150?img=4', lastMessage: 'Please call me', time: 'Yesterday', unread: 0 },
    {  name: 'David Brown', avatar: 'https://i.pravatar.cc/150?img=5', lastMessage: 'Files attached', time: 'Monday', unread: 1 },
  ]);

  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState({
  
    1: [
      { email:"email", text: 'Hey there!', sender: 'them', time: '10:30 AM' },
      { email:"email", text: 'Hi! How are you?', sender: 'me', time: '10:31 AM' },
      { email:"email", text: 'I\'m good, thanks for asking!', sender: 'them', time: '10:32 AM' },
    ],
    2: [
      { id: 1, text: 'How are you?', sender: 'them', time: '9:15 AM' },
    ],
    3: [
      { id: 1, text: 'Meeting at 3 PM', sender: 'them', time: 'Yesterday' },
      { id: 2, text: 'Got it, will be there', sender: 'me', time: 'Yesterday' },
    ],
    4: [
      { id: 1, text: 'Please call me', sender: 'them', time: 'Yesterday' },
    ],
    5: [
      { id: 1, text: 'Files attached', sender: 'them', time: 'Monday' },
      { id: 2, text: 'Thanks! I\'ll check them', sender: 'me', time: 'Monday' },
    ],
  });



  // todo : add there emit method for the private message 

  const handleSendMessage = (text) => {
    const newMessage = {
      id: messages[selectedUser.id].length + 1,
      text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  
    };

    setMessages(prev => ({
      ...prev,
      [selectedUser.email]: [...prev[selectedUser.email], newMessage]
    }));

    // Update last message in user list
    setUsers(prev => prev.map(user => 
      user.email === selectedUser.email 
        ? { ...user, lastMessage: text, time: 'Just now', unread: 0 } 
        : user
    ));
  };

  return (
    <div className="chat-app">
      <UserList 
        users={users} 
        selectedUser={selectedUser} 
        onSelectUser={setSelectedUser} 
      />
      <ChatArea 
        user={selectedUser} 
        messages={messages[selectedUser.id] || []} 
        onSendMessage={handleSendMessage} 
      />
    </div>
  );
};

export default Socket;
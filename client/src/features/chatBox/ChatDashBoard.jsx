import React from 'react';
import Sidebar from './sideBar/Sidebar.jsx';
import ChatBox from './ChatBox/ChatBox.jsx';
import './ChatDashBoard.css';

function ChatDashBoard() {
  return (
    <div className="chat-dashboard">
    <div className="sidebar-container">
      <Sidebar />
    </div>
  
    <div className="main-chat-container">
      <p>hi i am the chatBoard interface</p>
      <ChatBox />
    </div>
  </div>
  
  );
}

export default ChatDashBoard;

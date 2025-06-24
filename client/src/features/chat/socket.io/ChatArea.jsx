import React from 'react';
import MessageInput from './MessageInput';
import './ChatArea.css';

const ChatArea = ({ user, messages, onSendMessage }) => {
  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="chat-user">
          <img src={user?.avatar} alt={user.eamil} className="chat-user-avatar" />
          <div className="chat-user-name">{user.name}</div>
        </div>
      </div>
      <div className="messages">
        {messages.map(message => (
          <div key={message.email} className={`message ${message.sender}`}>
            <div className="message-content">{message.text}</div>
            <div className="message-time">{message.time}</div>
          </div>
        ))}
      </div>
      <MessageInput onSend={onSendMessage} />
    </div>
  );
};

export default ChatArea;
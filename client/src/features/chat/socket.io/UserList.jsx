import React from 'react';
import './UserList.css';

const UserList = ({ users, selectedUser, onSelectUser }) => {
  return (
    <div className="user-list">
      <div className="user-list-header">
        <h2>Chats</h2>
      </div>



      
      <div className="users">
        {users.map(user => (
          <div 
            key={user.id} 
            className={`user-item ${selectedUser.id === user.id ? 'active' : ''}`}
            onClick={() => onSelectUser(user)}
          >
            <img src={user.avatar} alt={user.name} className="user-avatar" />
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-last-message">{user.lastMessage}</div>
            </div>
            <div className="user-meta">
              <div className="message-time">{user.time}</div>
              {user.unread > 0 && <div className="unread-count">{user.unread}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
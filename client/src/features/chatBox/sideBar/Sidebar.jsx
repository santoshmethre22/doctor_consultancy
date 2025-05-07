import React from "react";
import "./Sidebar.css";

const users = [
  { id: 1, name: "Alice", online: true },
  { id: 2, name: "Bob", online: false },
  { id: 3, name: "Charlie", online: true },
];

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Chats</h2>
      {users.map((user) => (
        <div key={user.id} className="user-item">
          <span className={`status-dot ${user.online ? "online" : "offline"}`}></span>
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
}

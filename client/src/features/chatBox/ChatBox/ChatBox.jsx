import React, { useState } from "react";
import "./ChatBox.css";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: "Alice", text: "Hi there!" },
    { sender: "Me", text: "Hello!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "Me", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="chatbox">
      <div className="chat-header">Chat with Alice</div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender === "Me" ? "me" : "them"}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: "Alice", text: "Hi there!" },
    { sender: "Me", text: "Hello!" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "Me", text: input }]);
      try {
        const response = await fetch('http://localhost:8001/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input }),
        });
        const data = await response.json();
        setMessages(prev => [...prev, { sender: "Bot", text: data.response }]);
      } catch (error) {
        setMessages(prev => [...prev, { sender: "Bot", text: "Sorry, I couldn't reply." }]);
      }
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
        <div ref={messagesEndRef} />
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

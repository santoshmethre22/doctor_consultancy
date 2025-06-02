// src/App.jsx
import { useState } from 'react';
import axios from 'axios';

function ChatGemini() {
  const [questions, setQuestions] = useState("");
  const [allQuestion, setAllQuestion] = useState([]);
  const [response, setResponse] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const res = await axios.post("http://localhost:8000/api/v1/chat/chat-gemini", {
        messages: questions
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(res);

      if (!res.data?.success) {
        console.log("the error in the response");
        return;
      }

      setAllQuestion(prev => [...prev, questions]);
      setResponse(prev => [...prev, res.data.data]);
      setQuestions("");

    } catch (error) {
      console.log("Request error:", error);
    }
  };

  return (
    <div>
      <h2>💬 Chat with Gemini</h2>

      {/* Questions */}
      {allQuestion.length > 0 && allQuestion.map((quest, index) => (
        <div key={index}>
          <p><strong>You:</strong> {quest}</p>
        </div>
      ))}

      {/* Responses */}
      {response.length > 0 && response.map((resp, index) => (
        <div key={index}>
          <p><strong>Gemini:</strong> {resp}</p>
        </div>
      ))}

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <label>Add your message:</label>
        <input
          type="text"
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default ChatGemini;
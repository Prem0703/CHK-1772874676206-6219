import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import "./Chatbot.css";

function Chatbot() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  /* ---------- SCROLL ---------- */

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  /* ---------- SEND MESSAGE ---------- */

  const sendMessage = useCallback(async () => {

    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setChat(prev => [...prev, { sender: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    try {

      const res = await axios.post(
        "http://127.0.0.1:5000/chat",
        { message: userMessage },
        { timeout: 10000 }
      );

      setChat(prev => [
        ...prev,
        { sender: "bot", text: res?.data?.reply || "No response received." }
      ]);

    } catch {

      setChat(prev => [
        ...prev,
        {
          sender: "bot",
          text: "⚠ Server unavailable. Please try again later."
        }
      ]);

    } finally {

      setLoading(false);

    }

  }, [message, loading]);

  /* ---------- ENTER KEY ---------- */

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }

  };

  return (

    <div className="chat-container">

      <div className="chat-header">
        AI Medical Assistant
      </div>

      <div className="chat-box">

        {chat.map((msg, index) => (

          <div
            key={index}
            className={`chat-message ${msg.sender}`}
          >
            {msg.text}
          </div>

        ))}

        {loading && (
          <p className="typing">AI is typing...</p>
        )}

        <div ref={chatEndRef} />

      </div>

      <div className="chat-input">

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask medical question..."
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>

      </div>

    </div>

  );

}

export default Chatbot;
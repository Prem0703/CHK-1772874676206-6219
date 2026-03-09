import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import "./Chatbot.css";

/**
 * AI Medical Assistant Chat Component
 * Handles message sending, rendering, and API communication.
 */
function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  /**
   * Scrolls chat to latest message.
   */
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  /**
   * Sends user message to backend and appends bot response.
   */
  const sendMessage = useCallback(async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setChat(prev => [...prev, { sender: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://127.0.0.1:5000/chat",
        { message: userMessage },
        { timeout: 10000 }
      );

      setChat(prev => [
        ...prev,
        { sender: "bot", text: data?.reply ?? "No response received." }
      ]);
    } catch (error) {
      setChat(prev => [
        ...prev,
        { sender: "bot", text: "Server error. Please try again later." }
      ]);
    } finally {
      setLoading(false);
    }
  }, [message, loading]);

  /**
   * Allows sending message via Enter key.
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h2>AI Medical Assistant</h2>

      <div className="chat-box">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender}`}
          >
            <span className="chat-bubble">
              {msg.text}
            </span>
          </div>
        ))}

        {loading && <p className="typing">AI is typing...</p>}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask medical question..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chatbot;

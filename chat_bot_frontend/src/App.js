import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// Simple avatar SVGs (could be replaced with image URLs or actual imported assets)
const USER_AVATAR = (
  <svg viewBox="0 0 40 40" width="36" height="36">
    <circle cx="20" cy="20" r="20" fill="#4F8CFF" />
    <circle cx="20" cy="16" r="8" fill="#fff" />
    <ellipse cx="20" cy="32" rx="12" ry="7" fill="#fff" />
  </svg>
);
const BOT_AVATAR = (
  <svg viewBox="0 0 40 40" width="36" height="36">
    <circle cx="20" cy="20" r="20" fill="#FFC542" />
    <rect x="10" y="12" width="20" height="16" rx="8" fill="#fff" />
    <circle cx="16" cy="20" r="3" fill="#FFC542" />
    <circle cx="24" cy="20" r="3" fill="#FFC542" />
  </svg>
);

// Example: WebSocket connection placeholder. 
// Replace this with your real backend/websocket URL/logic (if available).
// For now, we use setTimeout to mock bot replies.

const initialMessages = [
  {
    id: 1,
    author: 'bot',
    content: 'Hello! How can I help you today?',
    timestamp: new Date().toISOString(),
  },
];

// PUBLIC_INTERFACE
function App() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Automatically scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // PUBLIC_INTERFACE
  /**
   * Handles sending of user message. Adds to UI and triggers bot reply simulation.
   */
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now(),
      author: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((msgs) => [...msgs, newMessage]);
    setInput('');
    // Simulate bot reply with short delay (replace with socket/api call for real)
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          id: Date.now() + 1,
          author: 'bot',
          content: botReply(input),
          timestamp: new Date().toISOString(),
        },
      ]);
    }, 850);
  };

  // PUBLIC_INTERFACE
  /**
   * Simulate a bot reply. Replace this with a real backend or AI response.
   */
  function botReply(userInput) {
    // Simple rules for demonstration; real apps would call backend service
    if (userInput.toLowerCase().includes('hello')) {
      return 'Hi there! 👋';
    }
    if (userInput.toLowerCase().includes('help')) {
      return 'Sure, I\'m here to help. What can I assist you with?';
    }
    return 'You said: ' + userInput;
  }

  return (
    <div className="chatbot-app-bg">
      <div className="chatbot-window">
        <header className="chatbot-header">
          <BOT_AVATAR.type {...BOT_AVATAR.props} />
          <span>AI ChatBot</span>
        </header>
        <main className="chatbot-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chatbot-message-row ${msg.author === 'user' ? 'chatbot-message-user' : 'chatbot-message-bot'}`}
            >
              <div className="chatbot-avatar">
                {msg.author === 'user' ? USER_AVATAR : BOT_AVATAR}
              </div>
              <div className="chatbot-message-bubble">
                <span className="chatbot-message-text">{msg.content}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </main>
        <form className="chatbot-input-area" onSubmit={handleSend} autoComplete="off">
          <input
            className="chatbot-input"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Message input"
          />
          <button className="chatbot-send-btn" type="submit" disabled={!input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

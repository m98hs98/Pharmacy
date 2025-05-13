import { useState } from 'react';

const CHATFLOW_ENDPOINT = "http://localhost:3000/api/v1/prediction/02ff55f5-af41-4a4d-b9de-6f979d052a46 ";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch(CHATFLOW_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();

      setMessages([
        ...newMessages,
        { sender: "bot", text: data.text || "No response received." }
      ]);
    } catch (error) {
        console.error("Flowise API error:", error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Error connecting to Flowise API." }
      ]);
    }
  };

  return (
    <div style={{ marginTop: '2rem', maxWidth: '600px' }}>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        height: '300px',
        overflowY: 'scroll',
        background: '#f9f9f9'
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '1rem' }}>
            <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          style={{ flex: 1, padding: '0.5rem' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} style={{ padding: '0.5rem 1rem' }}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
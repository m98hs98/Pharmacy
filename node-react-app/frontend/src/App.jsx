import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); 

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('message');
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📩 RabbitMQ Messages</h2>
      <div style={{ marginTop: '1rem' }}>
        {messages.map((msg, index) => (
          <div key={`msg-${index}`}>👉 {msg}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
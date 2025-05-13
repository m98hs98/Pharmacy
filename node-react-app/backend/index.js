const amqp = require('amqplib');
const http = require('http');
const { Server } = require('socket.io');

const QUEUE = 'ordersQueue';

(async () => {
  const server = http.createServer();
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST"]
    }
  });

  // Connects to RabbitMQ running on your local machine
  const conn = await amqp.connect('amqp://localhost:5672');
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE);

  

  channel.consume(QUEUE, (msg) => {
    if (msg !== null) {
      const content = msg.content.toString();
      console.log('📨 Raw message from Flowise:', content);

      try {
        const data = JSON.parse(content);
        const message = data.message;

        if (message) {
          console.log('🟢 Emitting message:', message);
          io.emit('message', message);
        } else {
          console.log('⚠️ No "message" field found in payload.');
        }
      } catch (error) {
        console.error('❌ Failed to parse message:', error.message);
      }
     
      channel.ack(msg);
    }
  });

  io.on('connection', (socket) => {
    console.log('✅ Frontend connected');
  });

  server.listen(4000, () => {
    console.log('🚀 Backend WebSocket running at http://localhost:4000');
  });
})();
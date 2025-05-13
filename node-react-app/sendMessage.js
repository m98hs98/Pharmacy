const amqp = require('amqplib');

(async () => {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  const queue = 'messages';

  await channel.assertQueue(queue);

  const message = `Test message - ${new Date().toLocaleTimeString()}`;
  channel.sendToQueue(queue, Buffer.from(message));
  console.log('✅ Sent:', message);

  await channel.close();
  await conn.close();
})();
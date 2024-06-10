import WebSocket from 'ws';

// Set up WebSocket server
const wss = new WebSocket.Server({ port: 8119 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Broadcast received messages to all clients
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString('utf-8'));
      }
    });
  });

  // Log when a client disconnects
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8119');

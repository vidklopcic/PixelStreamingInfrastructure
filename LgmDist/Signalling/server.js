"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
// Set up WebSocket server
const wss = new ws_1.default.Server({ port: 8119 });
wss.on('connection', (ws) => {
    console.log('Client connected');
    // Broadcast received messages to all clients
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === ws_1.default.OPEN) {
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

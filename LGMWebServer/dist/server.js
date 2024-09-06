"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const https_1 = require("https");
const fs_1 = require("fs");
const path_1 = require("path");
const PORT = 443; // Standard HTTPS port
const STATIC_DIR = (0, path_1.join)(__dirname, '..', '..', 'Frontend', 'implementations', 'lgm_metahuman', 'dist');
const CERT_DIR = (0, path_1.join)(__dirname, '..', '..', 'SignallingWebServer', 'certificates');
// Read SSL certificate files
const privateKey = (0, fs_1.readFileSync)((0, path_1.join)(CERT_DIR, 'client-key.pem'), 'utf8');
const certificate = (0, fs_1.readFileSync)((0, path_1.join)(CERT_DIR, 'client-cert.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate };
// Create an HTTPS server
const server = (0, https_1.createServer)(credentials, (req, res) => {
    // Serve static files
    let filePath = (0, path_1.join)(STATIC_DIR, req.url === '/' ? 'index.html' : req.url ?? 'index.html');
    const ext = (0, path_1.extname)(filePath);
    let contentType = 'text/html';
    switch (ext) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }
    (0, fs_1.readFile)(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            }
            else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});
// Set up secure WebSocket server
const wss = new ws_1.default.Server({ server });
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
server.listen(PORT, () => {
    console.log(`Secure server is running on https://localhost:${PORT}`);
    console.log(`Secure WebSocket server is running on wss://localhost:${PORT}`);
});

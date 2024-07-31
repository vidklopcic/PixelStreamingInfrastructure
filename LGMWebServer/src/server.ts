import WebSocket from 'ws';
import {createServer} from 'https';
import {readFile, readFileSync} from 'fs';
import {join, extname} from 'path';

const PORT = 443;  // Standard HTTPS port
const STATIC_DIR = join(__dirname, '..', '..', 'Frontend', 'implementations', 'lgm_metahuman', 'dist');
const CERT_DIR = join(__dirname, '..', '..', 'SignallingWebServer', 'certificates');

// Read SSL certificate files
const privateKey = readFileSync(join(CERT_DIR, 'client-key.pem'), 'utf8');
const certificate = readFileSync(join(CERT_DIR, 'client-cert.pem'), 'utf8');

const credentials = {key: privateKey, cert: certificate};

// Create an HTTPS server
const server = createServer(credentials, (req, res) => {
    // Serve static files
    let filePath = join(STATIC_DIR, req.url === '/' ? 'index.html' : req.url ?? 'index.html');
    const ext = extname(filePath);
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

    readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8');
        }
    });
});

// Set up secure WebSocket server
const wss = new WebSocket.Server({server});

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

server.listen(PORT, () => {
    console.log(`Secure server is running on https://localhost:${PORT}`);
    console.log(`Secure WebSocket server is running on wss://localhost:${PORT}`);
});
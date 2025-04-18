const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, etc.) from "public" folder
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.send("<h1>Welcome to GeeksforGeeks Video Call App</h1>");
});

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = socketIo(server);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('newUser', (id) => {
    console.log('New user joined with ID:', id);
    socket.join('/'); // Default room
    socket.to('/').emit('userJoined', id);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const app = express();
const cors = require('cors');
const socket = require('socket.io');
const port = 8000;
app.use(cors());
 
const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});
 
const io = socket(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", socket => {
  console.log("Nice to meet you.(shake hand)");
  socket.emit("welcome","Welcome to the chat")
  
  socket.on("event_from_client", data => {
      socket.broadcast.emit("event_to_all_other_clients", data);
  });
});




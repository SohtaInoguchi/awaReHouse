const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8000;

// socket io
const socketioPORT = process.env.PORT || 7777;
const originURL = process.env.URL || ['http://localhost:3000'];
const io = require('socket.io')(socketioPORT, {
  cors: {
    origin: originURL
  }
});

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/build"));

app.get("/", (_, res) => {
  res.send("hehehehe");
});

io.on('connection', (socket) => {
  console.log("Socket io connected");
  socket.on('send-message', (text) => {
    io.emit("receive-message", "Please pack in box");
  })
});

app.listen(PORT, () => console.log(`It is really HOOOOT on ${PORT}!!!`));

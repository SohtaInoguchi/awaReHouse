const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8000;
const socketPort = 8001;

// for socket io
// const http = require('http');
// const server = http.createServer(app);
// const io = new Server(server);
// const { Server } = require('socket.io');
const io = require('socket.io')(7777, {
  cors: {
    origin: ['http://localhost:3000']
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
    console.log(text);
  })
});

// server.listen(socketPort, () => {
//   console.log(`listening on ${socketPort}`);
// })

app.listen(PORT, () => console.log(`It is really HOOOOT on ${PORT}!!!`));

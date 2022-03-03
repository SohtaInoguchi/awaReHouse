const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8000;

// socket io
const http = require('http');
const server = http.createServer(app);

// const socketioPORT = server.address.port || 7777;
const socketioPORT = 7777;
// const socketioPORT = PORT;
const originURL = process.env.URL || ['http://localhost:8000'];

// const io = require('socket.io')(7777);
// console.log(io);
const io = require('socket.io')(socketioPORT, {
// const io = require('socket.io')(server.address.port, {
  cors: {
    origin: originURL,
    methods: ["GET", "POST"]
  }
});
// io.configure(function () { 
//   io.set("transports", ["xhr-polling"]); 
//   io.set("polling duration", 10); 
// });


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

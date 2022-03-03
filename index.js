const express = require("express");
// const http = require('http');
// const PORT = process.env.PORT || 8000;
const socketIO = require('socket.io');
// const app = express();
// const server = http.createServer(app);
// const io = socketio(server);
// const cors = require("cors");

const PORT = process.env.PORT || 8000;
const server = express()
  .use(express.static(__dirname + "/build"))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});


// const socketioPORT = server.address.port || 7777;
// const socketioPORT = process.env.PORTTWO || 7777;
// const socketioPORT = 7777;
// const socketioPORT = PORT;
// const originURL = process.env.URL || ['http://localhost:8000'];
// const io = require('socket.io')(7777);
// console.log(io);
// const io = require('socket.io')(socketioPORT, {
// const io = require('socket.io')(server.address.port, {
//   cors: {
//     origin: originURL,
//     methods: ["GET", "POST"]
//   }
// });
// io.configure(function () { 
//   io.set("transports", ["xhr-polling"]); 
//   io.set("polling duration", 10); 
// });


// app.use(express.json());
// app.use(cors());
// app.use(express.static(__dirname + "/build"));

// app.get("/", (_, res) => {
//   res.send("hehehehe");
// });

io.on('connection', (socket) => {
  console.log("Socket io connected");
  socket.on('send-message', (text) => {
    io.emit("receive-message", "Please pack in box");
  })
});

// app.listen(PORT, () => console.log(`It is really HOOOOT on ${PORT}!!!`));

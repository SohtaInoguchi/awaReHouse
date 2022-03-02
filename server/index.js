const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(7777, {
  cors: { origin: ["http://localhost:3000"] },
});
// const socket = require("socket.io");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/build"));

app.get("/", (_, res) => {
  res.send("hehehehe");
});

//const server
app.listen(PORT, () => console.log(`It is really HOOOOT on ${PORT}!!!`));

// const io = socket(server);

io.on("connection", (socket) => {
  console.log(`backend id:${socket.id}`);
  socket.on("send-message", (input) => {
    console.log(input);
  });
  socket.emit("receive-message", "MESSAGE RECEIVED");
});

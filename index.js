const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(7777, {
  cors: { origin: ["http://localhost:3000"] },
});
// const jwt = require("jsonwebtoken");
const db = require("./server/db");
const knex = require("./server/db");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/build"));

app.get("/", (_, res) => {
  res.send("hehehehe");
});

app.post("/login", async (req, res) => {
  const input = {
    firstname: req.body.first_name,
    lastname: req.body.last_name,
    // email: req.body.email,
    password: req.body.password,
  };
  console.log(input.firstname, input.lastname, input.password);
  // // const all = await db.select("*").table("users");
  const user = await db
    .select("password")
    .from("users")
    .where("first_name", req.body.first_name);

  const boolean =
    user.length >= 1 && input.password === user[0].password ? true : false;

  res.json(boolean);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers;

  console.log(authHeader);

  next();
}

app.get("/post", authenticateToken, (req, res) => {
  res.send("hehehehcjodhcnae");
});

app.listen(PORT, () => console.log(`It is really HOOOOT on ${PORT}!!!`));

io.on("connection", (socket) => {
  // console.log(`backend id:${socket.id}`);
  socket.on("send-message", (input) => {
    console.log(input);
  });
  socket.emit("receive-message", "MESSAGE RECEIVED");
});

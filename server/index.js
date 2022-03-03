const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const jwt = require("jsonwebtoken");
const db = require("./db");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/build"));

app.get("/", (_, res) => {
  res.send("hehehehe");
});

app.post("/test", (req, res) => {
  const input = {
    firstname: "Toni",
    lastname: "Peña",
    email: "toni@gmail.com",
    password: "toniTheBest",
  };

  jwt.sign({ user: input }, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
    token && res.json({ token });
  });
});

app.post("/post", authenticateToken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) res.sendStatus(403);
    res.json({
      message: "NOICE HEHEHEHEHEH",
      data,
    });
  });
});

app.post("/login", async (req, res) => {
  try {
    const input = {
      firstname: req.body.first_name,
      lastname: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    };

    // jwt.sign({ user: input }, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
    //   token && res.json({ token });
    // });

    const user = await db
      .select("password", "first_name")
      .from("users")
      .where("email", req.body.email)
      .andWhere("first_name", req.body.first_name);

    const boolean =
      user.length >= 1 && input.password === user[0].password ? true : false;

    res.json({ boolean, first_name: user[0].first_name });
  } catch {
    res.json({ boolean: false, first_name: "User not found" });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    req.token = token;
    next();
  }

  res.sendStatus(403);
}

app.get("/post", authenticateToken, (req, res) => {
  res.send("hehehehcjodhcnae");
});

app.listen(PORT, () => console.log(`It is really HOOOOT on ${PORT}!!!`));

// io.on("connection", (socket) => {
//   // console.log(`backend id:${socket.id}`);
//   socket.on("send-message", (input) => {
//     console.log(input);
//   });
//   socket.emit("receive-message", "MESSAGE RECEIVED");
// });

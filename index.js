const express = require ("express");
const cors = require("cors")
const app = express ();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`It is really HOOOOT on ${PORT}!!!`));


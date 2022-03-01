const dotenv = require("dotenv");
const config = process.env.DB_ENVIRONMENT || "development";
const db = require("./knexfile.js")[config];
module.exports=require("knex")(db);

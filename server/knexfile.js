const dotenv = require("dotenv").config();
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "awarehouse",
<<<<<<< HEAD
      user: "user",
=======
      user: process.env.DB_USER,
>>>>>>> 9b0100d4a60c8781a636c37457a6eba165a79847
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
};

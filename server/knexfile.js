const dotenv = require("dotenv").config();
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "awarehouse",
<<<<<<< HEAD
      user: process.env.DB_USER
=======
      user: process.env.DB_USER,
>>>>>>> d766342f11a22bbe613786345c5d2e65c5def7af
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

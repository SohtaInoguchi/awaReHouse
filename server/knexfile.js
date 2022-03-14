const dotenv = require("dotenv").config();
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "awarehouse",
      user: "postgres",
      password:"postgres"
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

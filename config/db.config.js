const { Sequelize } = require("sequelize");
require("dotenv").config();

// create the connection
const sequelize = new Sequelize(
  process.env.DATABASE__NAME,
  process.env.DATABASE__USER,
  process.env.DATABASE__PASS,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;

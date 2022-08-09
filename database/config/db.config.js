const { Sequelize } = require("sequelize");
require("dotenv").config();

// create the connection
let sequelize;
if (process.env.ENV === "production") {
  sequelize = new Sequelize(
    process.env.DATABASE__NAME,
    process.env.DATABASE__USER,
    process.env.DATABASE__PASS,
    {
      host: "localhost",
      dialect: "mysql",
      logging: false,
    }
  );
} else {
  sequelize = new Sequelize("test", "test", "test", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  });
}

module.exports = sequelize;

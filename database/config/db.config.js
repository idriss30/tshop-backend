const { Sequelize } = require("sequelize");
require("dotenv").config();

const environment = process.env.ENV || "development";
// create the connection
let sequelize;
if (environment === "production") {
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
  sequelize = new Sequelize("dozotest", "root", "rootpassword", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  });
}

module.exports = sequelize;

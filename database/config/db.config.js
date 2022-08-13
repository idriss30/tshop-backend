const { Sequelize } = require("sequelize");
require("dotenv").config();
const mysql = require("mysql2/promise");

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
  (async () => {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "rootpassword",
    });

    const workers = parseInt(process.env.JEST_WORKERS || "1");

    for (let i = 0; i < workers; i++) {
      const databaseName = `dozotest_${i}`;
      await connection.query(`DROP DATABASE IF EXISTS ${databaseName}`);
      await connection.query(`CREATE DATABASE ${databaseName}`);
    }
  })();
}

module.exports = sequelize;

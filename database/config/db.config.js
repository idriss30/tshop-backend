const { Sequelize } = require("sequelize");
require("dotenv").config();
const mysql = require("mysql2");

const environment = process.env.NODE_ENV || "test";
// create the connection

let sequelize;

const makeDatabases = () => {
  const sqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootpassword",
  });
  if (process.env.JEST_WORKER_ID) {
    sqlConnection.query(
      `CREATE DATABASE IF NOT EXISTS test_${process.env.JEST_WORKER_ID}`,
      function (err) {
        if (err) return console.log(err);
        console.log(` created database test_${process.env.JEST_WORKER_ID}`);
      }
    );
    sqlConnection.end(function (err) {
      if (err) return console.log(err);
      console.log("connection closed");
    });
  }
};

const settinUpEnvironment = async () => {
  if (environment === "production") {
    return (sequelize = new Sequelize(
      process.env.DATABASE__NAME,
      process.env.DATABASE__USER,
      process.env.DATABASE__PASS,
      {
        host: "localhost",
        dialect: "mysql",
        logging: false,
      }
    ));
  } else {
    makeDatabases();
  }
};

(() => {
  let item = settinUpEnvironment().then((result) => (sequelize = result));
  if (environment === "production") return item;

  return (sequelize = new Sequelize(
    `test_${process.env.JEST_WORKER_ID}`,
    process.env.DATABASE__USER,
    process.env.DATABASE__PASS,
    {
      host: "localhost",
      dialect: "mysql",
      logging: false,
    }
  ));
})();

module.exports = sequelize;

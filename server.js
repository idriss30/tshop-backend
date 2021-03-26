require("dotenv").config();
const sequelize = require("./config/db.config");
const app = require("./app");

// define the port
let port = process.env | 5000;

// initialise the connection to the database
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`server started  on port ${port}`);
      console.log("database__connected");
    });
  })
  .catch((err) => console.log(err));

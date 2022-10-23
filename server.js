require("dotenv").config();
const sequelize = require("./database/config/db.config");
const app = require("./app");
const User = require("./database/models/User");
const Order = require("./database/models/Orders");
const Product = require("./database/models/Products");
const items = require("./database/productsData");
// define the port
let port = process.env.PORT || 5000;

// define the associations

// initialise the connection to the database
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User);
sequelize
  .sync()
  .then(async () => {
    const products = await Product.findAll();
    if (products.length == 0) await Product.bulkCreate(items);
    app.listen(port, () => {
      console.log(`server started  on port ${port}`);
      console.log("database__connected");
    });
  })
  .catch((err) => console.log(err));

const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/db.config");

// define the Order model
// Order model will belong to Users model. one to many relations

const Order = sequelize.define("orders", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: UUIDV4,
  },
  first: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  zip: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  totalOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  items: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Order;

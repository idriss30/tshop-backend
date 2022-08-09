const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/db.config");

const Stock = sequelize.define(
  "stock",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    smallQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mediumQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    largeQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Stock;

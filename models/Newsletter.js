const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/db.config");

const NewsLetter = sequelize.define("Newsletter", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: UUIDV4,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = NewsLetter;

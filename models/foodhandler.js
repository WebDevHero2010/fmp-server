const { DataTypes } = require("sequelize");
const db = require("../db");

const FoodHandler = db.define("foodhandler", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  certStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports = FoodHandler;

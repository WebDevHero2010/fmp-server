const { DataTypes } = require("sequelize")
const db = require("../db")

const FoodHandler = db.define("foodhandler", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      facility_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
})

module.exports = FoodHandler;
const { DataTypes } = require("sequelize")
const db = require("../db")

const Facility = db.define("facility", {
    facilityName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },
      phonenumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      facilityType: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      menuType: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      operationStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      healthdeptuser_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
})

module.exports = Facility;
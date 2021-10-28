const { DataTypes } = require("sequelize");
const db = require("../db");

const FacilityOwner = db.define("facilityowner", {
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
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  ownerAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  ownerCity: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  ownerState: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  ownerZipcode: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  facility_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = FacilityOwner;

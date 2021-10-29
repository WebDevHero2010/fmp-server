const { DataTypes } = require("sequelize");
const db = require("../db");

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
  ownerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  ownerFirstName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  ownerLastName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  ownerPhoneNumber: {
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
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports = Facility;

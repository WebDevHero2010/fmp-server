const { DataTypes } = require("sequelize");
const db = require("../db");

const Narratives = db.define("narratives", {
  sectionNum: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  violationType: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  violationIMG: {
    type: DataTypes.STRING(1500),
    allowNull: false,
    unique: true,
  },
  repeatedViolation: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  correctedBy: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  facility_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Narratives;

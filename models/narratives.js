const { DataTypes } = require("sequelize");
const db = require("../db");

const Narratives = db.define("narratives", {
  sectionNum: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  violationType: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  violationIMG: {
    type: DataTypes.STRING(1500),
    allowNull: false,
    unique: false,
  },
  repeatedViolation: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  correctedBy: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports = Narratives;

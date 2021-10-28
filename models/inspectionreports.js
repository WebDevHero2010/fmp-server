const { DataTypes } = require("sequelize");
const db = require("../db");

const InspectionReports = db.define("inspectionreports", {
  purpose: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  followUpDate: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  releaseDate: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  violationFindings: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  toBeCorrectedBy: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

module.exports = InspectionReports;

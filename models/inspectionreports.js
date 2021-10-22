const { DataTypes } = require("sequelize")
const db = require("../db")

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
      facility_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
})

module.exports = InspectionReports;
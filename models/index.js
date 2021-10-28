// create individual files for your models and import them here
const User = require("./user");
// const FacilityOwner = require("./facilityowner");
// const FoodHandler = require("./foodhandler");
const Facility = require("./facility");
const InspectionReports = require("./inspectionreports");
// const Narratives = require("./narratives");

// Setup Associations
User.hasMany(Facility);
Facility.belongsTo(User);

// Facility.hasOne(FacilityOwner);
// FacilityOwner.belongsTo(Facility);

// Facility.hasMany(FoodHandler);
// FoodHandler.belongsTo(Facility);

Facility.hasMany(InspectionReports);
// User.hasMany(InspectionReports);
InspectionReports.belongsTo(Facility);
InspectionReports.belongsTo(User);

module.exports = {
  User,
  // FacilityOwner,
  // FoodHandler,
  Facility,
  InspectionReports,
  // Narratives,
};

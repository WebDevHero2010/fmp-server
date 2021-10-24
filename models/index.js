// create individual files for your models and import them here
const User = require("./user");
const FacilityOwner = require("./facilityowner");
const FoodHandler = require("./foodhandler");
const Facility = require("./facility");
const InspectionReports = require("./inspectionreports");
const Narratives = require("./narratives");
// Setup Associations

module.exports = {
  User,
  FacilityOwner,
  FoodHandler,
  Facility,
  InspectionReports,
  Narratives,
};

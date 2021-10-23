// create individual files for your models and import them here
const HealthDeptUser = require("./healthdeptuser");
const FacilityOwner = require("./facilityowner");
const FoodHandler = require("./foodhandler");
const Facility = require("./facility");
const InspectionReports = require("./inspectionreports");
const Narratives = require("./narratives");
// Setup Associations

module.exports = {
  HealthDeptUser,
  FacilityOwner,
  FoodHandler,
  Facility,
  InspectionReports,
  Narratives,
};

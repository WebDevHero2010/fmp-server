const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { InspectionReports } = require("../models/");
const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/create", async function (req, res) {
  try {
    InspectionReports.create({
      purpose: req.body.inspectionreports.purpose,
      followUpDate: req.body.inspectionreports.followUpDate,
      releaseDate: req.body.inspectionreports.releaseDate,
      facility_id: req.body.inspectionreports.facility_id,
    }).then((inspectionreports) => {
      res.status(200).json({
        message: `a new inspectionreports has been added to the Database`,
        log: inspectionreports,
      });
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/delete/:id", validateSession, function (req, res) {
  try {
    const query = {
      where: { id: req.params.id, owner_id: req.healthdeptuser.id },
    };
    InspectionReports.destroy(query).then(() =>
      res
        .status(200)
        .json({ message: "InspectionReports Removed from Database" })
    );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/", validateSession, (req, res) => {
  try {
    let userid = req.healthdeptuser.id;
    InspectionReports.findAll({
      where: { owner_id: userid },
    })
      .then((InspectionReports) => res.status(200).json(InspectionReports))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/update/:entryId", validateSession, function (req, res) {
  try {
    const updateInspectionReports = {
      purpose: req.body.inspectionreports.purpose,
      followUpDate: req.body.inspectionreports.followUpDate,
      releaseDate: req.body.inspectionreports.releaseDate,
      facility_id: req.body.inspectionreports.facility_id,
    };

    const query = {
      where: { id: req.params.entryId, owner_id: req.healthdeptuser.id },
    };

    InspectionReports.update(updateInspectionReports, query)
      .then((inspectionreports) => res.status(200).json(inspectionreports))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

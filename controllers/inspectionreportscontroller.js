const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { InspectionReports, Facility, User } = require("../models/");
const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/create", validateSession, async function (req, res) {
  try {
    console.log(req);
    InspectionReports.create({
      purpose: req.body.inspectionreports.purpose,
      followUpDate: req.body.inspectionreports.followUpDate,
      releaseDate: req.body.inspectionreports.releaseDate,
      violationFindings: req.body.inspectionreports.violationFindings,
      toBeCorrectedBy: req.body.inspectionreports.toBeCorrectedBy,
      userId: req.user.id,
      facilityId: req.body.inspectionreports.facilityId,
    })
      .then((inspectionreports) => {
        Facility.findOne({ where: { id: inspectionreports.facilityId } }).then(
          (facility) => {
            console.log(inspectionreports);
            res.status(200).json({
              message: `a new inspectionreports has been added to the Database`,
              log: { ...inspectionreports.dataValues, facility },
            });
          }
        );
      })
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/delete/:id", validateSession, async function (req, res) {
  try {
    const query = {
      where: { id: req.params.id },
    };
    await InspectionReports.destroy(query).then(() =>
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
    const query = {
      // where: { userId: req.user.id },
      include: ["user", "facility"],
    };

    InspectionReports.findAll(query)
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
      violationFindings: req.body.inspectionreports.violationFindings,
      toBeCorrectedBy: req.body.inspectionreports.toBeCorrectedBy,
    };
    const query = {
      where: { id: req.params.entryId },
    };
    // app.use("/inspectionreports", controllers.InspectionReports);
    InspectionReports.update(updateInspectionReports, query)
      .then((inspectionreports) => res.status(200).json(inspectionreports))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

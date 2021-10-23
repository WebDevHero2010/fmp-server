const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { Facility } = require("../models/");
const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/create", async function (req, res) {
  try {
    Facility.create({
      facilityName: req.body.facility.facilityName,
      address: req.body.facility.address,
      state: req.body.facility.state,
      zipcode: req.body.facility.zipcode,
      phonenumber: req.body.facility.phonenumber,
      facilityType: req.body.facility.facilityType,
      menuType: req.body.facility.menuType,
      operationStatus: req.body.facility.operationStatus,
      healthdeptuser_id: req.healthdeptuser.id,
    }).then((facility) => {
      res.status(200).json({
        message: `a new facility has been added to the Database`,
        log: facility,
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
    Facility.destroy(query).then(() =>
      res.status(200).json({ message: "Facility Removed from Database" })
    );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/", validateSession, (req, res) => {
  try {
    let userid = req.healthdeptuser.id;
    Facility.findAll({
      where: { owner_id: userid },
    })
      .then((Facility) => res.status(200).json(Facility))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/update/:entryId", validateSession, function (req, res) {
  try {
    const updateFacility = {
      facilityName: req.body.facility.facilityName,
      address: req.body.facility.address,
      state: req.body.facility.state,
      zipcode: req.body.facility.zipcode,
      phonenumber: req.body.facility.phonenumber,
      facilityType: req.body.facility.facilityType,
      menuType: req.body.facility.menuType,
      operationStatus: req.body.facility.operationStatus,
      healthdeptuser_id: req.healthdeptuser.id,
    };

    const query = {
      where: { id: req.params.entryId, owner_id: req.healthdeptuser.id },
    };

    Facility.update(updateFacility, query)
      .then((facility) => res.status(200).json(facility))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

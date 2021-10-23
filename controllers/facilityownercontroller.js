const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { FacilityOwner } = require("../models/");
const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/create", async function (req, res) {
  try {
    FacilityOwner.create({
      email: req.body.facilityowner.email,
      firstName: req.body.facilityowner.firstName,
      lastName: req.body.facilityowner.lastName,
      phoneNumber: req.body.facilityowner.phoneNumber,
      ownerAddress: req.body.facilityowner.ownerAddress,
      ownerCity: req.body.facilityowner.ownerCity,
      ownerState: req.body.facilityowner.ownerState,
      ownerZipcode: req.body.facilityowner.ownerZipcode,
      facility_id: req.body.facilityowner.facility_id,
    }).then((facilityowner) => {
      res.status(200).json({
        message: `a new facilityowner has been added to the Database`,
        log: facilityowner,
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
    FacilityOwner.destroy(query).then(() =>
      res.status(200).json({ message: "FacilityOwner Removed from Database" })
    );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/", validateSession, (req, res) => {
  try {
    let userid = req.healthdeptuser.id;
    FacilityOwner.findAll({
      where: { owner_id: userid },
    })
      .then((FacilityOwner) => res.status(200).json(FacilityOwner))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/update/:entryId", validateSession, function (req, res) {
  try {
    const updateFacility = {
      email: req.body.facilityowner.email,
      firstName: req.body.facilityowner.firstName,
      lastName: req.body.facilityowner.lastName,
      phoneNumber: req.body.facilityowner.phoneNumber,
      ownerAddress: req.body.facilityowner.ownerAddress,
      ownerCity: req.body.facilityowner.ownerCity,
      ownerState: req.body.facilityowner.ownerState,
      ownerZipcode: req.body.facilityowner.ownerZipcode,
      facility_id: req.body.facilityowner.facility_id,
    };

    const query = {
      where: { id: req.params.entryId, owner_id: req.healthdeptuser.id },
    };

    FacilityOwner.update(updateFacility, query)
      .then((facilityowner) => res.status(200).json(facilityowner))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

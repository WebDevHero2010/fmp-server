const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { FacilityOwner } = require("../models/");
const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/create", validateSession, async function (req, res) {
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
    })
      .then((facilityowner) => {
        res.status(200).json({
          message: `a new facilityowner has been added to the Database`,
          log: facilityowner,
        });
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
    await FacilityOwner.destroy(query)
      .then(() =>
        res.status(200).json({ message: "FacilityOwner Removed from Database" })
      )
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/", validateSession, (req, res) => {
  try {
    // let userid = req.healthdeptuser.id;
    FacilityOwner.findAll({
      // where: { owner_id: userid },
    })
      .then((FacilityOwner) => res.status(200).json(FacilityOwner))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/update/:entryId", validateSession, async function (req, res) {
  try {
    const updateFacilityOwner = {
      email: req.body.facilityowner.email,
      firstName: req.body.facilityowner.firstName,
      lastName: req.body.facilityowner.lastName,
      phoneNumber: req.body.facilityowner.phoneNumber,
      ownerAddress: req.body.facilityowner.ownerAddress,
      ownerCity: req.body.facilityowner.ownerCity,
      ownerState: req.body.facilityowner.ownerState,
      ownerZipcode: req.body.facilityowner.ownerZipcode,
    };

    const query = {
      where: { id: req.params.entryId },
    };

    await FacilityOwner.update(updateFacilityOwner, query)
      .then((facilityowner) => res.status(200).json(facilityowner))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

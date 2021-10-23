const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { Narratives } = require("../models/");
const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/create", async function (req, res) {
  try {
    Narratives.create({
      sectionNum: req.body.narratives.sectionNum,
      followUpDate: req.body.narratives.followUpDate,
      releaseDate: req.body.narratives.releaseDate,
      facility_id: req.body.narratives.facility_id,
    }).then((narratives) => {
      res.status(200).json({
        message: `a new narratives has been added to the Database`,
        log: narratives,
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
    Narratives.destroy(query).then(() =>
      res.status(200).json({ message: "Narratives Removed from Database" })
    );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/", validateSession, (req, res) => {
  try {
    let userid = req.healthdeptuser.id;
    Narratives.findAll({
      where: { owner_id: userid },
    })
      .then((Narratives) => res.status(200).json(Narratives))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/update/:entryId", validateSession, function (req, res) {
  try {
    const updateNarrative = {
      sectionNum: req.body.narratives.sectionNum,
      followUpDate: req.body.narratives.followUpDate,
      releaseDate: req.body.narratives.releaseDate,
      facility_id: req.body.narratives.facility_id,
    };

    const query = {
      where: { id: req.params.entryId, owner_id: req.healthdeptuser.id },
    };

    Narratives.update(updateNarrative, query)
      .then((narratives) => res.status(200).json(narratives))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

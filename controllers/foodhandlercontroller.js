const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { FoodHandler } = require("../models/");
const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/create", validateSession, async function (req, res) {
  try {
    FoodHandler.create({
      email: req.body.foodhandler.email,
      firstName: req.body.foodhandler.firstName,
      lastName: req.body.foodhandler.lastName,
      certStatus: req.body.foodhandler.certStatus,
    })
      .then((foodhandler) => {
        res.status(200).json({
          message: `a new foodhandler has been added to the Database`,
          log: foodhandler,
        });
      })
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/delete/:id", validateSession, function (req, res) {
  try {
    const query = {
      where: { id: req.params.id },
    };
    FoodHandler.destroy(query)
      .then(() =>
        res.status(200).json({ message: "FoodHandler Removed from Database" })
      )
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/", validateSession, (req, res) => {
  try {
    // let userid = req.healthdeptuser.id;
    FoodHandler.findAll({
      // where: { owner_id: userid },
    })
      .then((FoodHandler) => res.status(200).json(FoodHandler))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/update/:entryId", validateSession, function (req, res) {
  try {
    const updateFoodHandler = {
      email: req.body.foodhandler.email,
      firstName: req.body.foodhandler.firstName,
      lastName: req.body.foodhandler.lastName,
      certStatus: req.body.foodhandler.certStatus,
    };

    const query = {
      where: { id: req.params.entryId },
    };

    FoodHandler.update(updateFoodHandler, query)
      .then((foodhandler) => res.status(200).json(foodhandler))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

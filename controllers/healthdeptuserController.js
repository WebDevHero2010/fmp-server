const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { HealthDeptUser } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/create", async function (req, res) {
  try {
    HealthDeptUser.create({
      email: req.body.healthdeptuser.email,
      firstname: req.body.healthdeptuser.firstname,
      lastname: req.body.healthdeptuser.name,
      password: bcrypt.hashSync(req.body.healthdeptuser.password, 10),
    }).then(function createSuccess(healthdeptuser) {
      let token = jwt.sign({ id: healthdeptuser.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.json({
        healthdeptuser: healthdeptuser,
        message: "User successfully created & added to DB",
        sessionToken: token,
      });
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/login", async function (req, res) {
  try {
    HealthDeptUser.findOne({ where: { email: req.body.healthdeptuser.email } })
      .then(function loginSuccess(healthdeptuser) {
        if (healthdeptuser) {
          bcrypt.compare(
            req.body.healthdeptuser.password,
            healthdeptuser.password,
            function (err, matches) {
              if (matches) {
                let token = jwt.sign(
                  { id: healthdeptuser.id },
                  process.env.JWT_SECRET,
                  {
                    expiresIn: 60 * 60 * 24,
                  }
                );
                res.status(200).json({
                  healthdeptuser: healthdeptuser,
                  message: "Health Department User has successfully logged in!",
                  sessionToken: token,
                });
              } else {
                res.status(502).send({
                  error:
                    "Login failed - Please check email and password and try again",
                });
              }
            }
          );
        } else {
          res.status(500).json({ error: "User does not exist." });
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

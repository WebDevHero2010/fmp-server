const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");
// const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/signup", async function (req, res) {
  try {
    User.create({
      email: req.body.user.email,
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      password: bcrypt.hashSync(req.body.user.password, 10),
    }).then(function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.json({
        user: user,
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
    User.findOne({ where: { email: req.body.user.email } })
      .then(function loginSuccess(user) {
        if (user) {
          bcrypt.compare(
            req.body.user.password,
            user.password,
            function (err, matches) {
              if (matches) {
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                  expiresIn: 60 * 60 * 24,
                });
                res.status(200).json({
                  user: user,
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

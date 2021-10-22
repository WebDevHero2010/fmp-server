const jwt = require("jsonwebtoken");
const { HealthDeptUser } = require("../models");

const validateSession = (req, res, next) => {
  if (!token) {
    return res
      .status(403)
      .send({ auth: false, message: "No Token Provided" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
      if (!err && decodeToken) {
        HealthDeptUser.findOne({
          where: {
            id: decodeToken.id,
          },
        })
          .then((healthDeptUser) => {
            if (!healthDeptuser) throw err;
            req.user = user;
            return next();
          })
          .catch((err) => next(err));
      } else {
        req.errors = err;
        return res.status(500).send("Not Authorized");
      }
    });
  }
};
module.exports = validateSession;

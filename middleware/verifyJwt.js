const db = require("../models");
const jwt = require("jsonwebtoken");
const secret = require("../config/authConfig");
const User = db.user;

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, secret.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
const verifyJwt = {
  verifyToken: verifyToken,
};

module.exports = verifyJwt;

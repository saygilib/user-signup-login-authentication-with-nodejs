const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const secret = require("../config/authConfig");
var jwt = require("jsonwebtoken");
var validator = require("email-validator")

module.exports.signup__post = (req, res) => {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.name ||
    !req.body.surname||
    !req.body.email
  ) {
    res.status(400).send({
      message: "content can not be empty",
    });
  }
 
  if(!validator.validate(req.body.email)){
    res.status(400).send({
      message: "email is not valid"
    })
  }
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        User.create({
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, 8),
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email
        })
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "error ocurred while creating the user",
            });
          });
      } else {
        res.json({
          error: "user already exists",
        });
      }
    })
    .catch((err) => {
      res.send("error" + err);
    });
};
module.exports.login__post = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({email : user.email} , secret.secret, { expiresIn: 86400 });

      res.status(200).send({
        
        username: user.username,
        name: user.name,
        surname: user.surname,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};


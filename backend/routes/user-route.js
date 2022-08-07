const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../db/schemes/userScheme");

const router = express.Router();

router.post("/registration", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        return res.status(409).json({
          message: "E-mail is occupied",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const account = new User({
              username: req.body.username,
              email: req.body.email,
              password: hash,
            });
            account
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "Account successfully created",
                  data: result,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "User is not found",
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (!result) {
            return res.status(401).json({
              message: "auth failed",
            });
          } else {
            return res.status(200).json({
              message: "auth completed",
              data: user[0],
            });
          }
        });
      }
    });
});

module.exports = router;

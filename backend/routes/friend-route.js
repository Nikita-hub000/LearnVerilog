const express = require("express");
const bcrypt = require("bcrypt");
const Friend = require("../db/schemes/friendScheme");
const TokenService = require("../services/token-service");
const router = express.Router();

router.post("/initFriends", async (req, res) => {
    try {
        let userData = await Friend.findOne({ userID: req.body.id });
        if (!userData) {
             userData = await Friend.create({
                userID: req.body.id,
                friends: [],
                requests: [],
                responses: [],
            });
        } 
        return res.status(200).json({friends: {userData}})
    } catch(error) {
        return res.status(500)
    }

  });

  router.post("/check", async (req, res) => {
    try {
      let from = await Friend.findOne({userID: req.body.from})
      let to = await Friend.findOne({userID: req.body.to})
      console.log(from, '/',  to, '/',to.requests)
      if(from.requests.includes(to.userID) || from.requests.includes(from.userID) || to.responses.includes(from.userID) ||  to.responses.includes(to.userID)) {
        return res.status(200).json({message: 1})
      }
      return res.status(200).json({message: 0})
    } catch(error) {
        return res.status(500)
    }

  });

  router.post("/add", async (req, res) => {
    try {
        let from = await Friend.findOne({userID: req.body.from})
        let to = await Friend.findOne({userID: req.body.to})
        if(from.requests.includes(to.id) || to.responses.includes(from.id)) {
          return res.status(200).json({message: 1})
        }
        await Friend.findOneAndUpdate({userID: req.body.from}, {requests: [...from.requests, req.body.to]})
        await Friend.findOneAndUpdate({userID: req.body.to}, {responses: [...to.responses, req.body.from]})
        return res.status(200).json({message: 1})
    } catch(error) {
        return res.status(500)
    }

  });

router.get("/friends", async (req, res) => {
  const userData = await User.findOne({ email: req.body.email });
  if (userData) {
    return res.status(409).json({
      message: "E-mail is occupied",
    });
  }
  if (req.body.password.length === 0 || req.body.username.length === 0) {
    return res.status(400).json({
      message: "E-mail is occupied",
    });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  const tokens = TokenService.generateToken(user);
  await TokenService.saveToken(user._id, tokens.refreshToken);
  try {
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(201).json({
      message: "Account successfully created",
      tokens: tokens,
      data: { username: user.username, email: user.email, id: user._id },
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;

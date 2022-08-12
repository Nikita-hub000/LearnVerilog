const express = require("express");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/auth_middleware");
const User = require("../db/schemes/userScheme");
const TokenService = require("../services/token-service");
const router = express.Router();

router.post("/registration", async (req, res) => {
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
    res.status(201).json({
      message: "Account successfully created",
      tokens: tokens,
      data: { username: user.username, email: user.email, id: user._id },
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      message: "User is not found",
    });
  }
  const passCompare = await bcrypt.compare(req.body.password, user.password);
  if (!passCompare) {
    return res.status(401).json({
      message: "Incorrect Password",
    });
  }
  const tokens = TokenService.generateToken(user);
  await TokenService.saveToken(user._id, tokens.refreshToken);
  try {
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      message: "Auth completed",
      tokens: tokens,
      data: { username: user.username, email: user.email, id: user._id },
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});
router.post("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    await TokenService.removeToken(refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json({
      message: "Successfully logged out",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
router.get("/refresh", async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    res.status(401).json({
      message: "You are not authorized",
    });
  }
  const userData = TokenService.validateRefreshToken(refreshToken);
  const tokenDb = await TokenService.findToken(refreshToken);
  if (!userData || !tokenDb) {
    res.status(401).json({
      message: "You are not authorized",
    });
  }
  const user = await User.findById(userData.id);
  const tokens = TokenService.generateToken(user);
  await TokenService.saveToken(user._id, tokens.refreshToken);

  try {
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      message: "Auth completed",
      tokens: tokens,
      data: { username: user.username, email: user.email, id: user._id },
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});
router.get("/details", authMiddleware, async (req, res) => {
  if (req.user) {
    try {
      console.log(req.user);
      const user = await User.findOne({ _id: req.user.id });
      res.status(200).json({
        message: "Successful Response",
        data: { username: user.username, id: user._id, email: user.email },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "User is not found",
      });
    }
  }
});
router.get("/all", authMiddleware, async (req, res) => {
  if (req.user) {
    try {
      const users = await User.find();
      res.status(200).json({
        message: "Successful Response",
        data: { users },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "User is not found",
      });
    }
  }
});

module.exports = router;

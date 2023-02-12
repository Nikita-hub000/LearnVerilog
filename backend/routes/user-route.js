const express = require("express");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/auth_middleware");
const User = require("../db/schemes/userScheme");
const TokenService = require("../services/token-service");
const router = express.Router();
const nodemailer = require("nodemailer");
const { v4: uuid_v4 } = require("uuid");

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
    return res.status(200).json({
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
    return res.status(200).json({
      message: "Successfully logged out",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error,
    });
  }
});
router.get("/refresh", async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({
      message: "You are not authorized",
      message2: "PROBLEM WITH REFRESH TOKEN",
    });
  }
  const userData = TokenService.validateRefreshToken(refreshToken);
  const tokenDb = await TokenService.findToken(refreshToken);
  if (!userData || !tokenDb) {
    return res.status(401).json({
      message: "You are not authorized",
      message2: "PROBLEM WITH USERDATA OR TOKENDB",
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
    return res.status(200).json({
      message: "Refresh completed",
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
router.post("/details", async (req, res) => {
  if (req.body) {
    try {
      const user = await User.findOne({ _id: req.body.id });
      return res.status(200).json({
        message: "Successful Response",
        data: { username: user.username, id: user.id },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "User is not found",
      });
    }
  }
});

router.post("/recover", async (req, res) => {
  if (req.body) {
    try {
      const user = await User.findOne({ _id: req.body.id });
      const { email } = req.body

      if(email === user.email) {
      const transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
          user: "nodemailer02@mail.ru",
          pass: "9GdRPEtpvKfbkrFYg5bx",
        },
      });
  
      let result = await transporter.sendMail({
        from: '"Смена пароля" <nodemailer02@mail.ru>',
        to: email.toString(),
        subject: "Смена пароля",
        text: `Для смены пароля перейдите по ссылке http://localhost:8080/password/${req.body.jwt}. Никому не сообщайте данную ссылку!`,
      });
      console.log(result);
      return res.status(201).json("ok");
    }
    return res.status(500).json({
      error: "User is not found",
    }); 
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "User is not found",
      });
    }
  }
});
router.get("/all", async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json({
        message: "Successful Response",
        data: { users },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "User is not found",
      });
    }
});

module.exports = router;

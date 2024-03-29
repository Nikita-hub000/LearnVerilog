const TokenService = require("../services/token-service");
module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(401).json({
        message: "You are not authorized",
      });
    }
    const accessToken = authorizationHeader.split(" ")[1];

    if (!accessToken) {
      res.status(401).json({
        message: "You are not authorized",
      });
    }
    
    const userData = TokenService.validateAccessToken(accessToken);
    console.log(accessToken, userData)
    if (!userData) {
      res.status(401).json({
        message: "You are not authorized",
      });
    }
    req.user = userData;
    next();
  } catch (error) {
    res.status(401).json({
      message: "You are not authorized",
    });
  }
};

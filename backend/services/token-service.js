const jwt = require("jsonwebtoken");
const Token = require("../db/schemes/tokenScheme");

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(
      { id: payload._id, username: payload.username },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      { id: payload._id, username: payload.username },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );
    return { accessToken, refreshToken };
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({
      user: userId,
      refreshToken,
    });
    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = Token.deleteOne({ refreshToken });
    return tokenData;
  }
  validateAccessToken(token) {
    try {
      const data = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return data;
    } catch (error) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const data = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return data;
    } catch (error) {
      return null;
    }
  }
  async findToken(refreshToken) {
    const tokenData = Token.findOne({ refreshToken });
    return tokenData;
  }
}
module.exports = new TokenService();

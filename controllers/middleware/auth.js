const jwt = require("jsonwebtoken");
const { decodeToken } = require("../userReusable");
require("dotenv").config();

const checkAuth = async (req, res, next) => {
  const tokenCookie = req.cookies.token;
  if (!tokenCookie)
    return res.status(403).json({ error: new Error("authentication failed") });
  let decodedToken = decodeToken(tokenCookie);
  if (!decodedToken) {
    res.clearCookie("token");
    return res.status(403).json({ error: new Error("authentication failed") });
  }
  req.userId = decodedToken;
  next();
};

module.exports = checkAuth;

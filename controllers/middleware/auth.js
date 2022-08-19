const { decodeToken } = require("../userReusable");
require("dotenv").config();

const checkAuth = async (req, res, next) => {
  try {
    const tokenCookie = req.cookies.token;
    const decodedToken = decodeToken(tokenCookie);
    req.userId = decodedToken;
    return await next();
  } catch (error) {
    error.message = "authentication failed";
    res.status(403).json({ error: error.message });
  }
};

module.exports = checkAuth;

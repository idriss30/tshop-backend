const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkAuth = async (req, res, next) => {
  // check if there is a cookie
  const tokenCookie = req.cookies.token;
  if (!tokenCookie) {
    // no cookies send error

    return res.json({ message: "cookie-fail" });
  }
  // verify the token
  jwt.verify(tokenCookie, process.env.SECRET__JWT, (err, decoded) => {
    if (err) {
      res.clearCookie("token");
      return res.json({ message: "invalid-token" });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = checkAuth;

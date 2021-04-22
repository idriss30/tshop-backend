// import the dependencies
const express = require("express");
const userCtrl = require("../controllers/userCtrl");

// create the router
const router = express.Router();

router.post("/register", userCtrl.postRegister);
router.post("/login", userCtrl.postLogin);
router.get("/profile", userCtrl.getProfile);

module.exports = router;

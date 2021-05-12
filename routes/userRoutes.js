// import the dependencies
const express = require("express");
const userCtrl = require("../controllers/userCtrl");
const checkAuth = require("../middleware/auth");

// create the router
const router = express.Router();

// create the differents endpoint
router.post("/register", userCtrl.postRegister);
router.post("/login", userCtrl.postLogin);
router.get("/profile", checkAuth, userCtrl.getProfile); // use middleware to check access
router.get("/user/:username", userCtrl.findByUsername);
router.put("/update/:username", userCtrl.putUpdateUser);
router.delete("/delete/:username", userCtrl.deleteUser);
router.get("/signout", checkAuth, userCtrl.signout);
module.exports = router;

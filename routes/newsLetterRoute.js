const express = require("express");
const newsCtrl = require("../controllers/newsCtrl");

const router = express.Router();

router.post("/email", newsCtrl.postSubscribeNewsLetter);

module.exports = router;

const express = require("express");
const orderCtrl = require("../controllers/orderCtrl");

const router = express.Router();

router.post("/orders", orderCtrl.postOrders);

router.get("/orders/:first", orderCtrl.getOrder);

module.exports = router;

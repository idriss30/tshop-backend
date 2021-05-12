const express = require("express");
const stripeCtrl = require("../controllers/stripeCtrl");

const router = express.Router();

router.post("/paymentIntent", stripeCtrl.postPaymentIntent);

module.exports = router;

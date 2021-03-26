const express = require("express");
const productCtrl = require("../controllers/productCtrl.js");

// create the router

const router = express.Router();

router.get("/products", productCtrl.getProducts);

module.exports = router;

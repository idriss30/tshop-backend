const express = require("express");
const productCtrl = require("../controllers/productCtrl.js");

// create the router

const router = express.Router();

// define all the shop routes
router.get("/products", productCtrl.getProducts);
router.get("/product/:id", productCtrl.getSingleProduct);
module.exports = router;

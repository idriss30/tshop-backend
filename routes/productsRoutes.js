const express = require("express");
const productCtrl = require("../controllers/productCtrl.js");

// create the router

const router = express.Router();

// define all the shop routes
router.get("/products", productCtrl.getProducts);

router.get("/bestSellers", productCtrl.getBestSellers);

router.get("/coats", productCtrl.getCoats);

router.get("/jackets", productCtrl.getJackets);

router.get("/hoodies", productCtrl.getHoodiesAndSweatshirts);

router.get("/tracksuits", productCtrl.getTracksuitsAndBottoms);

module.exports = router;

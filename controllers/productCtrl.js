// create the get products Ctrollr
const Product = require("../models/Products");

const filteredFunction = (hint) => {
  Product.findAll({
    where: {
      category: hint,
    },
  })
    .then((response) => response)
    .catch((err) => console.log(err));
};

exports.getProducts = async (req, res, next) => {
  // get all the products from the database
  try {
    const products = await Product.findAll();

    res.json({ products });
  } catch (error) {
    res.json({ error });
  }
};

// get the best sellers

exports.getBestSellers = async (req, res, next) => {
  try {
    const bestSellers = await Product.findAll({
      where: {
        bestSeller: true,
      },
    });
    res.json({ bestSellers });
  } catch (error) {
    res.json({ error });
  }
};

// get the coats

exports.getCoats = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        category: "COATS",
      },
    });
    res.json({ products });
  } catch (error) {
    res.json(error);
  }
};

// get jackets

exports.getJackets = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        category: "JACKETS",
      },
    });
    res.json({ products });
  } catch (error) {
    res.json({ error });
  }
};

exports.getHoodiesAndSweatshirts = async (req, res, next) => {
  try {
    const hoodies = await Product.findAll({
      where: {
        category: "hoodies".toUpperCase(),
      },
    });
    if (hoodies) {
      const sweatShirts = await Product.findAll({
        where: {
          category: "sweatshirts".toUpperCase(),
        },
      });
      if (sweatShirts) {
        const products = hoodies.concat(sweatShirts);
        res.json({ products });
      }
    }
  } catch (error) {
    res.json({ error });
  }
};

// get tracksuits and bottoms
exports.getTracksuitsAndBottoms = async (req, res, next) => {
  try {
    const tracksuits = await Product.findAll({
      where: {
        category: "tracksuits".toUpperCase(),
      },
    });
    if (tracksuits) {
      const shorts = await Product.findAll({
        where: {
          category: "shorts".toUpperCase(),
        },
      });

      if (shorts) {
        const products = tracksuits.concat(shorts);
        res.json({ products });
      }
    }
  } catch (error) {
    res.json({ error });
  }
};

// get single Product
exports.getSingleProduct = async (req, res, next) => {
  try {
  } catch (error) {
    res.json(error);
  }
};

// create the get products Ctrollr
const Product = require("../database/models/Products");

exports.getProducts = async (req, res) => {
  // get all the products from the database
  try {
    const products = await Product.findAll();

    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// get single Product
exports.getSingleProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ where: { id } });
  if (!product) {
    const error = new Error("product was not found");
    res.status(500).json({ error: error });
  } else {
    res.status(200).json({ product });
  }
};

// create the get products Ctrollr
const Product = require("../database/models/Products");

exports.getProducts = async (req, res) => {
  // get all the products from the database
  try {
    const products = await Product.findAll();

    res.json({ products });
  } catch (error) {
    res.json({ error });
  }
};

// get single Product
exports.getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      where: {
        id: id,
      },
    });
    if (product) {
      res.json({ product });
    }
  } catch (error) {
    res.json(error);
  }
};

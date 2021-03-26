// create the get products Ctrollr
const Product = require("../models/Products");

exports.getProducts = async (req, res, next) => {
  const products = await Product.findAll({
    where: {
      username: "hellp",
    },
  });
  if (products) {
    res.json({ products });
  } else {
    console.log("there is an error");
  }
};

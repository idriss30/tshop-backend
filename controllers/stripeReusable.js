require("dotenv").config();
const stripe = require("stripe")(process.env.KEY);

exports.total = (products) => {
  const sum = products.reduce((init, product) => {
    return (init = init + product.price * product.qty);
  }, 0);

  return sum;
};

exports.PaymentIntent = async (items) => {
  const secretClient = await stripe.paymentIntents.create(items);
  if (!secretClient) throw Error("can not create stripe charge");
  return secretClient.client_secret;
};

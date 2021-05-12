const stripe = require("stripe")(
  "sk_test_51Hm0j6C4Sgstwpx1gK93aSbrJNpZFIRCgqakyhLE3T0h0fgnutbEyXiaEkOMcXVf7s8D2xk1XIHCi4BOeHa1esre00haix9Pgt"
);

// create a payment intent as recommended by stripe

exports.postPaymentIntent = async (req, res) => {
  // create a function to calculate the total;
  const products = req.body.products;
  if (!products) {
    return res.json({ message: "error" });
  }
  const total = products.reduce((init, product) => {
    return init + product.qty * product.price;
  }, 0);

  // try the send the intent
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    // if successfull
    if (paymentIntent) {
      res.send({ secretClient: paymentIntent.client_secret });
    }
  } catch (error) {
    res.json({ message: "intent-error" });
  }
};

const { PaymentIntent, total } = require("./stripeReusable.js");

exports.postPaymentIntent = async (req, res) => {
  try {
    const products = req.body.products;
    const sum = total(products);
    const finalSum = sum * 100; // from penny to dollar
    const items = {
      amount: finalSum,
      currency: "usd",
      payment_method_types: ["card"],
    };

    const secret_key = await PaymentIntent(items);
    res.status(201).json({ clientSecret: secret_key });
  } catch (error) {
    console.log(error);
    let err = new Error("can't create stripe token");
    res.status(400).json({ error: err.message });
  }
};

const Order = require("../database/models/Orders");

exports.postOrders = async (req, res) => {
  // get the order details
  const { ...orderDetail } = req.body;
  // try to save it to the database and return a message
  // split the arr to turn into a string;

  try {
    const saveOrder = await Order.create({
      first: orderDetail.orderInfo.first,
      last: orderDetail.orderInfo.last,
      email: orderDetail.orderInfo.email,
      address: orderDetail.orderInfo.address,
      city: orderDetail.orderInfo.city,
      state: orderDetail.orderInfo.state,
      zip: orderDetail.orderInfo.zip,
      totalOrder: orderDetail.orderInfo.total,
      items: orderDetail.orderInfo.items,
      userId: orderDetail.orderInfo.id || null,
    });

    if (saveOrder) {
      res.json({ message: "success" });
    }
  } catch (error) {
    res.json({ error });
  }
};

exports.getOrder = async (req, res) => {
  // get the userId
  const userId = req.params.id;
  if (!userId) {
    return res.json({ message: "no-id" });
  }

  // query the database to retrieve the orders
  try {
    const myOrders = await Order.findAll({
      where: {
        userId,
      },
    });

    if (myOrders) {
      res.json({ orders: myOrders });
    }
  } catch (error) {
    res.json({ message: "error" });
  }
};

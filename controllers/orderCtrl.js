const Order = require("../database/models/Orders.js");

exports.postOrders = async (req, res) => {
  try {
    const { ...order } = req.body.order;
    await Order.create({
      first: order.first,
      last: order.last,
      email: order.email,
      address: order.address,
      city: order.city,
      state: order.state,
      zip: order.zip,
      totalOrder: order.total,
      items: order.items,
      userId: order.id || null,
    });
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: "can not create order" });
  }
};

exports.getOrder = async (req, res) => {
  const first = req.params.first;
  const order = await Order.findAll({ where: { first } });
  if (order.length > 0) return res.status(200).json({ orders: order });
  res.status(400).json({ error: "no orders found" });
};

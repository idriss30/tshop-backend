const request = require("supertest");
const app = require("../app.js");
const sequelize = require("../database/config/db.config.js");
const Order = require("../database/models/Orders.js");
const { total } = require("./stripeReusable.js");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

const products = [
  {
    id: 1,
    name: "ZIP MOCK NECK T-SHIRT",
    price: 40,
    size: "medium",
    qty: 4,
  },
  {
    id: 2,
    name: "ZIP MOCK NECK T-SHIRT",
    price: 40,
    qty: 2,
    size: "medium",
  },
  {
    id: 3,
    name: "ZIP MOCK NECK T-SHIRT",
    price: 40,
    qty: 3,
    size: "medium",
  },
];

const productsToSave = JSON.stringify({ ...products });
const sum = total(products);

test("post order route valid order", async () => {
  const orderDetail = {
    first: "test",
    last: "testLast",
    email: "test@email.com",
    address: "1234 apt 3 ",
    city: "boston",
    state: "MA",
    zip: parseInt("01456"),
    total: sum,
    items: productsToSave,
    userId: "12334-943i0-o",
  };

  const orderResponse = await request(app)
    .post("/api/cart/orders")
    .send({ order: orderDetail })
    .expect(201)
    .expect("Content-type", "application/json; charset=utf-8");

  expect(orderResponse.body).toEqual({ message: "success" });
});

test("post order wrong throw error", async () => {
  const it = await request(app)
    .post("/api/cart/orders")
    .expect(400)
    .expect("Content-type", "application/json; charset=utf-8");

  expect(it.body).toEqual({ error: "can not create order" });
});

test("get order route valid order", async () => {
  const products = await Order.findAll();
  const order = await request(app)
    .get(`/api/cart/orders/test`)
    .expect(200)
    .expect("Content-type", "application/json; charset=utf-8");

  expect(order.body.orders[0]["id"]).toEqual(products[0]["id"]);
});

test("get order route wrong order", async () => {
  const wrongOrderRes = await request(app)
    .get(`/api/cart/orders/noname`)
    .expect(400)
    .expect("Content-type", "application/json; charset=utf-8");
  expect(wrongOrderRes.body).toEqual({ error: "no orders found" });
});

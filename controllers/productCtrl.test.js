const request = require("supertest");

const app = require("../app");
const items = require("../database/productsData.js");
const Product = require("../database/models/Products");
const sequelize = require("../database/config/db.config");

beforeEach(async () => {
  await Product.bulkCreate(items);
});
afterEach(async () => {
  await sequelize.sync({ force: true });
});
test("get all products from the database valid request", async () => {
  const getProductsResponse = await request(app)
    .get("/api/shop/products")
    .expect(200)
    .expect("Content-type", "application/json; charset=utf-8");

  expect(getProductsResponse.body.products.length).toBe(items.length);
  expect(getProductsResponse.body).toEqual({ products: [...items] });
});

test("return error with bad get products request", async () => {
  await sequelize.drop(); // force a bad request to throw error
  try {
    await request(app)
      .get("/api/shop/products")
      .expect(400)
      .expect("Content-type", "application/json; charset=utf-8");
  } catch (error) {
    let err = new Error("can't fetch products");
    expect(error.message).toEqual(err.message);
  }
});

test('fetch single products from database "get single route', async () => {
  const secondProductDetail = items[1];
  const getRequestResponse = await request(app)
    .get("/api/shop/product/2")
    .expect(200)
    .expect("Content-type", "application/json; charset=utf-8");

  expect(getRequestResponse.body).toEqual({ product: secondProductDetail });
});

test("fetch incorrect product from single Request", async () => {
  try {
    await request(app)
      .get("/api/shop/product/50")
      .expect(500)
      .expect("Content-type", "application/json; charset=utf-8");
  } catch (error) {
    let myError = new Error("product was not found");
    expect(error.message).toEqual(myError.message);
  }
});

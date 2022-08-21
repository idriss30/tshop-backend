const Product = require("../database/models/Products");
const items = require("../database/productsData.js");
const app = require("../app.js");
const request = require("supertest");

require("dotenv").config();

beforeAll(async () => {
  await Product.bulkCreate(items);
});

jest.mock("stripe", () => {
  return jest.fn(() => ({
    paymentIntents: {
      create: jest.fn(() =>
        Promise.resolve({
          client_secret: "123456",
        })
      ),
    },
  }));
});
require("stripe")(process.env.KEY);
const products = [
  {
    id: 1,
    name: "ZIP MOCK NECK T-SHIRT",
    description: "Mock neck T-shirt with front zip closure and short sleeves",
    price: 40,
    imageName: "zipBlack",
    size: "medium",
    qty: 4,
  },
  {
    id: 2,
    name: "ZIP MOCK NECK T-SHIRT",
    description: "Mock neck T-shirt with front zip closure and short sleeves",
    price: 40,
    qty: 2,
    imageName: "zipBlue",
    size: "medium",
  },
  {
    id: 3,
    name: "ZIP MOCK NECK T-SHIRT",
    description: "Mock neck T-shirt with front zip closure and short sleeves",
    price: 40,
    qty: 3,
    imageName: "zipGreen",
    size: "medium",
  },
];

describe("testing payment intent", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test("stripe payment intent route valid data", async () => {
    const response = await request(app)
      .post("/api/stripe/paymentIntent")
      .send({ products });

    expect(response.body).toEqual({ clientSecret: "123456" });
  });
});

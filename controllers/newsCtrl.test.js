const request = require("supertest");
const app = require("../app");
const sequelize = require("../database/config/db.config");
const { Sequelize } = require("sequelize");
require("dotenv").config();

beforeAll(async () => {
  sequelize = new Sequelize(
    `dozotest_${process.env.JEST_WORKER_ID}`,
    "root",
    "rootpassword",
    {
      host: "localhost",
      dialect: "mysql",
      logging: false,
    }
  );

  await sequelize.sync({ force: true });
});

test("submitting valid post request to newsLetter Route", async () => {
  const postResponse = await request(app)
    .post("/api/news/email")
    .send({ email: "email@test.com" })
    .expect(201)
    .expect("Content-type", "application/json; charset=utf-8");

  expect(postResponse.body).toEqual({ message: "email was saved" });
});

test("submitting existing email  to post request", async () => {
  await request(app).post("/api/news/email").send({ email: "email@test.com" });

  const badResponse = await request(app)
    .post("/api/news/email")
    .send({ email: "email@test.com" })
    .expect(400)
    .expect("Content-type", "application/json; charset=utf-8");

  expect(badResponse.body).toEqual({ error: "email in use" });
});

afterAll(async () => {
  await sequelize.drop();
  await sequelize.close();
});

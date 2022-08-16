const request = require("supertest");
const app = require("../app");

require("dotenv").config();

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

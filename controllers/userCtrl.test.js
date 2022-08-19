const supertest = require("supertest");
const request = require("supertest");
const app = require("../app.js");
const User = require("../database/models/User");

const { getByUsername, createToken } = require("./userReusable");

const user = {
  username: "test",
  firstname: "test",
  lastname: "tester",
  email: "test@email.com",
  password: "test",
  address: "123 my apt",
  city: "boston",
  state: "massachusetts",
  zip: 12345,
};

describe("user features testing routes", () => {
  test("post Register Routes valid user", async () => {
    const registerRequest = await request(app)
      .post("/api/users/register")
      .send(user)
      .expect(201)
      .expect("Content-type", "application/json; charset=utf-8");

    expect(registerRequest.body).toEqual({ message: "user created" });
  });

  test("post register throwing an error", async () => {
    const item = await request(app)
      .post("/api/users/register")
      .send(user)
      .expect(400)
      .expect("Content-type", "application/json; charset=utf-8");

    expect(item.body).toEqual({ error: "can not create user" });
  });

  test("post login route valid user", async () => {
    const loginResponse = await request(app)
      .post("/api/users/login")
      .send({ username: user.username, password: user.password })
      .expect(201)
      .expect("Content-type", "application/json; charset=utf-8");
    expect(loginResponse.body).toEqual({ message: "success" });
  });

  test("bad login Request wrong password or username", async () => {
    const badLoginResponse = await request(app)
      .post("/api/users/login")
      .send({ username: "eddie", password: "hello" })
      .expect(400)
      .expect("Content-type", "application/json; charset=utf-8");

    expect(badLoginResponse.body).toEqual({ message: "can not logged in" });
  });

  test("get profile route valid user", async () => {
    const userDetails = await getByUsername(user.username);
    const token = createToken(userDetails.id);
    const profileRes = await request(app)
      .get("/api/users/profile")
      .set("Cookie", [`token=${token}`])
      .expect(200)
      .expect("Content-type", "application/json; charset=utf-8");

    expect(profileRes.body.user.username).toEqual(userDetails.username);
    expect(profileRes.body.user.email).toEqual(userDetails.email);
  });

  test("get profile routes wrong token ", async () => {
    const response = await request(app)
      .get("/api/users/profile")
      .set("Cookie", [`token='1234'`])
      .expect(403)
      .expect("Content-type", "application/json; charset=utf-8");
    expect(response.body).toEqual({ error: "authentication failed" });
  });

  test("update user route valid user", async () => {
    const newInfo = { ...user };
    newInfo.firstname = "teddie";
    newInfo.email = "teddie@email.test";

    const updateRequest = await request(app)
      .put(`/api/users/update/${user.username}`)
      .send(newInfo)
      .expect(200)
      .expect("Content-type", "application/json; charset=utf-8");

    expect(updateRequest.body).toEqual({ message: "success" });
  });

  test("update user wrong info", async () => {
    const wrongResponse = await request(app)
      .put(`/api/users/update/john`)
      .send(user)
      .expect(403)
      .expect("Content-type", "application/json; charset=utf-8");

    expect(wrongResponse.body).toEqual({ message: "can not update profile" });
  });

  test("delete valid user route", async () => {
    const deleteResponse = await request(app)
      .delete(`/api/users/delete/${user.username}`)
      .expect(200)
      .expect("Content-type", "application/json; charset=utf-8");

    expect(deleteResponse.body).toEqual({ message: "success" });
  });

  test("delete wrong user route", async () => {
    const wrongDelete = await request(app)
      .delete(`/api/users/delete/${user.username}`)
      .expect(400)
      .expect("Content-type", "application/json; charset=utf-8");

    expect(wrongDelete.body).toEqual({ error: "error deleting" });
  });

  test("signout valid user route", async () => {
    let token = createToken("145268985");
    const signoutRequest = await request(app)
      .get("/api/users/signout")
      .set("Cookie", [`token=${token}`])
      .expect(200)
      .expect("Content-type", "application/json; charset=utf-8");

    expect(signoutRequest.body).toEqual({ message: "success" });
  });

  test("signout invalid user route", async () => {
    const signoutRequest = await request(app)
      .get("/api/users/signout")
      .expect(403)
      .expect("Content-type", "application/json; charset=utf-8");

    expect(signoutRequest.body).toEqual({ error: "authentication failed" });
  });
});

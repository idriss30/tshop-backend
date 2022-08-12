const User = require("../database/models/User");

const {
  uniqueUsernameOrEmail,
  creaTePassword,
  createUser,
  checkPassword,
  getByUsername,
  createToken,
  updateUser,
} = require("./userReusable.js");
require("dotenv").config();

exports.postRegister = async (req, res) => {
  const { ...userInfo } = req.body;
  try {
    await uniqueUsernameOrEmail(userInfo.username, userInfo.email);
    await creaTePassword(userInfo.password);
    await createUser(userInfo);
    res.status(201).json({ message: "user created" });
  } catch (err) {
    let mError = new Error("can not create user");
    res.status(400).json({ error: mError });
  }
};

exports.postLogin = async (req, res) => {
  let { loginUsername, loginPassword } = req.body;
  let user = await getByUsername(loginUsername);
  if (!user)
    res.status(400).json({ error: new Error("username was not found") });
  let isPasswordValid = await checkPassword(loginPassword, user.password);
  if (!isPasswordValid)
    res.status(400).json({ error: new Error("wrong password") });
  let token = createToken(user.id);
  if (!token) res.status(400).json({ error: "can not login" });
  res.cookie("token", token, { httpOnly: true, sameSite: "Strict" });
  res.status(201).json({ message: "success" });
};

exports.getProfile = async (req, res) => {
  const userId = req.userId;
  try {
    let user = await User.findByPk(userId);
    res.status(200).json({ user });
  } catch (error) {
    let myErr = new Error("problem getting profile");
    res.status(403).json({ error: myErr });
  }
};

exports.putUpdateUser = async (req, res) => {
  const { ...user } = req.body;
  try {
    let password = await creaTePassword(user.password);
    user.password = password;
    await updateUser({ ...user }, req);
    res.clearCookie("token");
    res.status(204).json({ message: "success" });
  } catch (error) {
    res.status(403).json({ error: new Error("problem updating user") });
  }
};

exports.deleteUser = async (req, res) => {
  const username = req.params.username;
  const deleteRequest = await User.destroy({ where: { username } });
  if (!deleteRequest)
    return res.status(400).json({ error: new Error("error deleting") });
  res.clearCookie("token");
  res.json({ message: "success" });
};

exports.signout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "success" });
  } catch (error) {
    res.json(error);
  }
};

const User = require("../database/models/User");

const {
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
  const createUserResponse = await createUser({ ...userInfo });
  if (createUserResponse === true)
    return res.status(201).json({ message: "user created" });
  res.status(400).json({ error: "can not create user" });
};

exports.postLogin = async (req, res) => {
  let username = req.body.username,
    password = req.body.password;
  try {
    const getUser = await getByUsername(username);
    await checkPassword(password, getUser.password);
    const token = createToken(getUser.id);
    res.cookie("token", token, { httpOnly: true, sameSite: "Strict" });
    res.status(201).json({ user: getUser });
  } catch (error) {
    return res.status(400).json({ message: "can not logged in" });
  }
};

exports.getProfile = async (req, res) => {
  const userId = req.userId;
  try {
    let user = await User.findByPk(userId.userId);
    res.status(200).json({ user });
  } catch (error) {
    let myErr = new Error("problem getting profile");
    res.status(403).json({ error: myErr });
  }
};

exports.putUpdateUser = async (req, res) => {
  const { ...user } = req.body;
  let password = await creaTePassword(user.password);
  user.password = password;
  const canUpdate = await updateUser({ ...user }, req);
  if (canUpdate == true)
    return res.clearCookie("token").status(200).json({ message: "success" });
  res.status(403).json({ message: "can not update profile" });
};

exports.deleteUser = async (req, res) => {
  const username = req.params.username;
  const deleteRequest = await User.destroy({ where: { username } });
  if (!deleteRequest) return res.status(400).json({ error: "error deleting" });
  res.clearCookie("token");
  res.status(200).json({ message: "success" });
};

exports.signout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(403).json({ error });
  }
};

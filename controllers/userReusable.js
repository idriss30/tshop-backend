const bcrypt = require("bcrypt");
const User = require("../database/models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const uniqueUsernameOrEmail = async (username, email) => {
  const isInDatabase = await User.findAll({ where: { username, email } });
  if (!isInDatabase) return true;
  return false;
};

const creaTePassword = async (password) => {
  let saltRounds = 10;
  const encryptedPass = await bcrypt.hash(saltRounds, password);
  if (!encryptedPass) throw new Error("can't encrypt password try later");
  return encryptedPass;
};

const checkPassword = async (submitedPassword, password) => {
  let isValid = await bcrypt.compare(submitedPassword, password);
  isValid ? true : false;
};

const createUser = async ({ ...userInfo }) => {
  const isUnique = await uniqueUsernameOrEmail(
    userInfo.username,
    userInfo.email
  );
  if (!isUnique) return false;
  const encryptedPassword = await creaTePassword(userInfo.password);
  if (!encryptedPassword) return false;
  try {
    await User.create({
      username: userInfo.username,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      password: encryptedPassword,
      address: userInfo.address,
      city: userInfo.city,
      state: userInfo.state,
      zip: userInfo.zip,
    });
    return true;
  } catch (error) {
    let myError = new Error("can not create user");
    return myError;
  }
};

const createToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET_JWT, {
    expiresIn: "1h",
  });
  if (!token) throw new Error("token not created");
  return token;
};

const decodeToken = (token) => {
  let verifiedToken = jwt.verify(
    token,
    process.env.SECRET_JWT,
    (err, decode) => {
      if (err) throw new Error("token verification error");
      return decode;
    }
  );
  if (verifiedToken) return verifiedToken;
};

const getByUsername = async (username) => {
  const user = await User.findOne({ where: { username } });
  if (!user) return false;
  return user;
};

const updateUser = async ({ user }, req) => {
  let putRequest = await User.update(
    {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      city: user.city,
      state: user.state,
      password: user.password,
      zip: user.zip,
    },
    { where: { username: req.params.username } }
  );
  if (!putRequest) throw new Error("problem updating user");
  return true;
};

module.exports = {
  uniqueUsernameOrEmail,
  creaTePassword,
  createUser,
  checkPassword,
  createToken,
  decodeToken,
  getByUsername,
  updateUser,
};

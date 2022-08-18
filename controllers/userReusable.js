const bcrypt = require("bcrypt");
const User = require("../database/models/User");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const uniqueUsernameOrEmail = async (username, email) => {
  const isInDatabase = await User.findAll({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });

  if (isInDatabase.length < 1) return true;
  return false;
};

const creaTePassword = async (password) => {
  let saltRounds = 10;
  try {
    let encryptedPass = await bcrypt.hash(password, saltRounds);
    return encryptedPass;
  } catch (error) {
    error.message = "can't encrypt password try later";
  }
};

const checkPassword = async (submitedPassword, password) => {
  const isItValid = await bcrypt.compare(submitedPassword, password);
  if (isItValid) return true;
  return false;
};

const createUser = async ({ ...userInfo }) => {
  try {
    await uniqueUsernameOrEmail(userInfo.username, userInfo.email);
    const encryptedPassword = await creaTePassword(userInfo.password);
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
  const token = jwt.sign({ userId }, process.env.SECRET__JWT, {
    expiresIn: "1h",
  });
  if (!userId || !token) throw Error("can't create token");
  return token;
};

const decodeToken = (token) => {
  let verifiedToken = jwt.verify(
    token,
    process.env.SECRET__JWT,
    (err, decode) => {
      if (err) throw Error("token verification error");
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

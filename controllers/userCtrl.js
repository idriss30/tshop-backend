const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.postRegister = async (req, res) => {
  // define the userObject
  const { ...userInfo } = req.body;
  try {
    // check email
    let isEmail = await User.findOne({
      where: {
        email: userInfo.email,
      },
    });
    if (isEmail) {
      return res.json({ message: "found" });
    }

    try {
      // check username
      let isUsername = await User.findOne({
        where: { username: userInfo.username },
      });
      if (isUsername) {
        return res.json({ message: "username" });
      }
    } catch (error) {
      console.log(error);
    }

    try {
      // now create encrypt the password
      let encryptedPass = await bcrypt.hash(userInfo.password, 10);
      if (encryptedPass) {
        try {
          let saveUser = await User.create({
            username: userInfo.username,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            email: userInfo.email,
            password: encryptedPass,
            address: userInfo.address,
            city: userInfo.city,
            state: userInfo.state,
            zip: userInfo.zip,
          });
          if (saveUser) return res.json({ message: "success" });
        } catch (error) {
          if (error.code === "ER_DUP_ENTRY") {
            console.log("fuck off");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }

  //
};

exports.postLogin = async (req, res) => {
  // get the data from the body
  let { username, password } = req.body;
  //find the user
  try {
    let isUser = await User.findOne({
      where: {
        username,
      },
    });
    // send request is there is no user
    if (!isUser) {
      return res.json({ message: "user not found" });
    }
  } catch (error) {
    res.json({ message: "error fetching user" });
  }
  // check the password from the body against crypted version
  try {
    let isPasswordVerified = await bcrypt.compare(password, isUser.password);
    if (!isPasswordVerified) {
      res.json({ message: "wrong pass" });
    }
  } catch (error) {
    res.json({ message: "error checking password" });
  }

  // username and pass are verified at this stage,
  // create the token
  let token = jwt.sign({ userId: isUser.id }, process.env.SECRET__JWT, {
    expiresIn: "1h",
  }); // make the token expires in an hour;
  // send the cookie back;
  res.cookie("token", token, { httpOnLy: true });
  res.json({ message: "success" });
};

// make the profile controller
exports.getProfile = async (req, res) => {};

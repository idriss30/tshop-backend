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
          return console.log(error);
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
  let { loginUsername, loginPassword } = req.body;
  //find the user

  try {
    const isUser = await User.findOne({
      where: {
        username: loginUsername,
      },
    });
    // send request is there is no user
    if (!isUser) {
      return res.json({ message: "user not found" });
    } else {
      // compare passwords
      const passwordCheck = await bcrypt.compare(
        loginPassword,
        isUser.password
      );
      if (!passwordCheck) {
        return res.json({ message: "wrong-pass" });
      }
      // create the token
      try {
        const token = jwt.sign({ userId: isUser.id }, process.env.SECRET__JWT, {
          expiresIn: "1h",
        });
        if (token) {
          // send a cookie with the token
          res.cookie("token", token, { httpOnly: true });
          res.json({ message: "success", userId: isUser.username });
        }
      } catch (error) {
        return res.json({ message: "error with signing the token" });
      }
    }
  } catch (error) {
    return res.json({ message: "error fetching user" });
  }
};

// make the profile controller
exports.getProfile = async (req, res) => {
  // get the token from previous middleware
  const userId = req.userId;
  // get the userInfo from the database
  try {
    const userData = await User.findByPk(userId);
    if (!userData) {
      return res.json({ message: "user-not-found" });
    }

    // send the userData.
    res.json({
      user: {
        username: userData.username,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        zip: userData.zip,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.putUpdateUser = async (req, res) => {
  // get the data from the req
  const { ...userData } = req.body;
  // try to update the user
  try {
    const encryptedPass = await bcrypt.hash(userData.password, 10); // encrypt the pass

    const update = await User.update(
      {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        password: encryptedPass,
        zip: userData.zip,
      },
      { where: { username: req.params.username } }
    );

    if (!update) {
      return res.json({ message: "update-error" });
    }
    res.clearCookie("token");
    return res.json({ message: "success" });
  } catch (error) {
    return res.json({ message: "error" });
  }
};

exports.deleteUser = async (req, res) => {
  // get the username from the params;
  const username = req.params.username;
  // now  delete the user
  try {
    const deleteUser = await User.destroy({
      where: {
        username,
      },
    });
    if (deleteUser) {
      res.clearCookie("token");
      return res.json({ message: "success" });
    }
  } catch (error) {
    return res.json({ message: "error" });
  }
};

exports.signout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "success" });
  } catch (error) {
    res.json(error);
  }
};

exports.findByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (user) {
      res.json({ user });
    }
  } catch (error) {
    res.json({ message: "error" });
  }
};

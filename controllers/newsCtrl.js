const NewsLetter = require("../database/models/Newsletter");
// newsLetter
exports.postSubscribeNewsLetter = async (req, res) => {
  // get the email from the body;
  const email = req.body.email;

  //save the email in the database;
  try {
    const saveEmail = await NewsLetter.create({
      email,
    });
    if (!saveEmail) {
      return res.json({ message: "problem" });
    }
    res.json({ success: "success" });
  } catch (error) {
    return res.json();
  }
};

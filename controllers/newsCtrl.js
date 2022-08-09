const NewsLetter = require("../database/models/Newsletter");
// newsLetter
exports.postSubscribeNewsLetter = async (req, res) => {
  // get the email from the body;
  const email = req.body.email;
  const isEmail = await NewsLetter.findOne({ where: { email } });
  if (isEmail) res.status(400).json({ error: "email already in use" });
  //save the email in the database;
  try {
    await NewsLetter.create({
      email,
    });
    res.json({ message: "email was saved" });
  } catch (error) {
    return res.json({ error: "error saving email" });
  }
};

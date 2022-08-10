const NewsLetter = require("../database/models/Newsletter");
// newsLetter
exports.postSubscribeNewsLetter = async (req, res) => {
  // get the email from the body;
  const email = req.body.email;
  const isEmail = await NewsLetter.findOne({ where: { email } });
  if (isEmail) return res.status(400).json({ error: "email in use" });
  await NewsLetter.create({ email });
  res.status(201).json({ message: "email was saved" });
};

const sequelize = require("./config/db.config");

afterAll(async () => {
  await sequelize.drop();
  await sequelize.close();
});

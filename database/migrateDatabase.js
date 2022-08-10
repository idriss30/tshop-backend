const sequelize = require("../database/config/db.config");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

const sequelize = require("./config/db.config");

beforeEach(async () => {
  await sequelize.truncate({ cascade: true });
});

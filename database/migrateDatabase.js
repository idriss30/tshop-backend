let sequelize = require("../database/config/db.config");

const useRecursion = async () => {
  try {
    await sequelize
      .sync({ force: true })
      .then(() => console.log("tables created"));
  } catch (error) {
    await useRecursion();
  }
};

beforeAll(async () => {
  await useRecursion();
});

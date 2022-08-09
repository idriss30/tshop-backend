"use strict";
const data = require("../productsData.js");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};

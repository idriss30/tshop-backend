module.exports = {
  testEnvironment: "node",

  setupFilesAfterEnv: [
    "jest-extended",
    /* "<rootDir>/database/migrateDatabase.js",
    "<rootDir>/database/truncateTables.js",
    "<rootDir>/database/disconnectDb.js", */
  ],
};

module.exports = {
  testEnvironment: "node",
  globalSetup: "<rootDir>/database/globalSetup.js",
  setupFilesAfterEnv: [
    "jest-extended",
    "<rootDir>/database/migrateDatabase.js",
    //"<rootDir>/database/truncateTables.js",
    "<rootDir>/database/disconnectDb.js",
  ],
};

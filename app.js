const express = require("express");
const cors = require("cors");
const productsRoutes = require("./routes/productsRoutes");

// define the app
const app = express();

app.use(cors());
app.use("/api/shop", productsRoutes);

module.exports = app;

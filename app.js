const express = require("express");
const cors = require("cors");
const productsRoutes = require("./routes/productsRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

// define the app
const app = express();
// cors functionnality
app.use(cors());
// get data from browser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// manage cookie
app.use(cookieParser());

//main routes
app.use("/api/shop", productsRoutes);
app.use("/api/users", userRoutes);

module.exports = app;

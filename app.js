const express = require("express");
const cors = require("cors");
const productsRoutes = require("./routes/productsRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const stripeRoutes = require("./routes/stripeRoute");
const orderRoutes = require("./routes/orderRoutes");
const newsLetterRoutes = require("./routes/newsLetterRoute");

// define the app
const app = express();
// cors functionnality
app.use(cors({ origin: true, credentials: true })); // tell the server to allow browsers to expose response to javascript frontend
// get data from browser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// manage cookie
app.use(cookieParser());

//main routes
app.use("/api/shop", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/cart", orderRoutes);
app.use("/api/news", newsLetterRoutes);

module.exports = app;

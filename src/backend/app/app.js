const cors = require("cors");
const restaurantRoutes = require("../endpoints/RestaurantRoutes");
const express = require("express");
const {handleErrors, notFound} = require("../middlewares/errorHandler");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/restaurants/", restaurantRoutes);

//Not found
app.use(notFound);
//Error handler
app.use(handleErrors);

module.exports = app;

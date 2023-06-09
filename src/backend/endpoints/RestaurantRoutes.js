const express = require("express");
const {
    index,
    show,
    deleteRestaurant,
    update,
    store,
} = require("../controllers/RestaurantController");
const uploadImage = require("../helpers/fileUpload");
// const upload = multer({storage});
const restaurantRoutes = express.Router();
restaurantRoutes.get("/", index);
restaurantRoutes.post("/", uploadImage, store);
// restaurantRoutes.post("/", upload.single('image'), store);
restaurantRoutes.get("/:id", show);
restaurantRoutes.delete("/:id", deleteRestaurant);
restaurantRoutes.put("/:id", uploadImage, update);
module.exports = restaurantRoutes;

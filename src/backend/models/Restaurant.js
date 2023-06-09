const mongoose = require("mongoose");
const {isValidPhoneNumber} = require("../Validator");
const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name is required"],
        },
        phone: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "Phone is required"],
            validate: {
                validator: function (v) {
                    return isValidPhoneNumber(v);
                },
                message: `Phone number is invalid`,
            },
        },
        image: {
            type: String,
            trim: true,
            required: [true, "Images is required"],
        },
        cuisine_type: {
            type: String,
            trim: true,
            required: [true, "Cuisine type is required"],
        },
        location: {
            type: String,
            required: [true, "Location is required"],
        },
    },
    {
        timestamps: true,
    }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
// export default Restaurant;

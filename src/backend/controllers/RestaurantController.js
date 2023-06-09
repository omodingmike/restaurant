const Restaurant = require("../models/Restaurant");
const Validator = require("../Validator");

module.exports = {
    index: async (request, response, next) => {
        try {
            response.json(await Restaurant.find());
        } catch (error) {
            next({
                message: error.message,
                statusCode: 404,
            });
        }
    },
    store: async (request, response, next) => {
        request.body.image = request.file.filename;
        try {
            const restaurant = await Restaurant.create(request.body);
            response.json(restaurant);
        } catch (error) {
            next({
                message: Validator.getMongooseValidationErrors(error),
                statusCode: 422,
            });
        }
    },
    show: async (request, response, next) => {
        try {
            response.json(await Restaurant.findOne({_id: request.params.id}));
        } catch (error) {
            next({
                message: error.message,
                statusCode: 404,
            });
        }
    },
    deleteRestaurant: async (request, response, next) => {
        try {
            const deleted = await Restaurant.findByIdAndDelete({_id: request.params.id})
            // const deleted = await Restaurant.deleteMany({})
            response.json(deleted);
        } catch (error) {
            next({
                message: error.message,
                statusCode: 404,
            });
        }
    },
    update: async (request, response, next) => {
        if (request.file.filename) {
            request.body.image = request.file.filename;
        }
        try {
            console.log(request.body);
            const update = await Restaurant.updateOne(
                {_id: request.params.id},
                request.body
            );
            response.json(update);
        } catch (error) {
            next({
                message: error.message,
                statusCode: 404,
            });
        }
    },
};

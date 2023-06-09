// const Validator = require("../helpers/Validator");
// const RandomNumber = require("../helpers/RandomNumber");
const Validator = require("../Validator");
module.exports = {
  phoneExists: (schema) => {
    schema.pre("save", async function (next) {
      try {
        const phoneExists = await this.constructor.findOne({
          phone: this.phone,
        });
        if (phoneExists) {
          next({
            phone: Validator.getMongooseValidationErrors(
              "Phone number already taken"
            ),
            statusCode: 422,
          });
        }
      } catch (error) {
        next({ message: error.message, statusCode: 422 });
      }
    });
  },
  ninExists: (farmerOneSchema) => {
    farmerOneSchema.pre("save", async function (next) {
      try {
        const ninExists = await this.constructor.findOne({ nin: this.nin });
        if (ninExists) {
          next({
            nin: Validator.getMongooseValidationErrors("NIN already taken"),
            statusCode: 422,
          });
        }
      } catch (error) {
        next({ message: error.message, statusCode: 422 });
      }
    });
  },
};

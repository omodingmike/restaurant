const mongoose = require("mongoose");
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Database connected successfully ");
  } catch (error) {
    console.log("Could not connected to database : ", error.message);
  }
};
connect();

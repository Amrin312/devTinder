const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://amrin:@cluster0.yr19snl.mongodb.net/devtinder?retryWrites=true&w=majority"
    );

    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

connectDb();
module.exports = connectDb;

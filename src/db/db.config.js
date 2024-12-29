const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.log("MONGO URI is not present");
  }

  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = { connectDB };

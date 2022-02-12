import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url).then(() => {
    console.log("database connected");
  });
};

export default connectDB;

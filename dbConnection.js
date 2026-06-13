import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/blog-app");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

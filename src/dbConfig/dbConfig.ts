import mongoose from "mongoose";
export const databaseConection = async () => {
  try {
    const mongodb_URL = process.env.MONGODB_URL 
    console.log(mongodb_URL);
    if (!mongodb_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }
    await mongoose.connect(mongodb_URL);
    mongoose.connection.on("connect", () => {
      console.log("database connected successfully");
    });
    mongoose.connection.on("error", () => {
      console.log("error in data base connection");
    });
  } catch (error) {
    console.log(error);
  }
};

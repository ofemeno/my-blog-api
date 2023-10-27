import mongoose from "mongoose";

// function used to connect to database
export async function connectDb(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    throw new Error("Database connection failed");
  }
}

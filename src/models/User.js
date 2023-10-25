import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      min: 4
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      min: 4
    }
  },
  { timeStamp: true }
);

const User = mongoose.model("user", userSchema);

export default User;

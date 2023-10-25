import User from "../models/User.js";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync();

export async function createUser(data) {
  const { username, password, fullName } = data;
  try {
    const user = new User({
      username,
      password: bcrypt.hashSync(password, salt),
      fullName,
    });
    return await user.save();
  } catch (error) {
    console.log("Create User Error ", error);
    throw Error(error);
  }
}

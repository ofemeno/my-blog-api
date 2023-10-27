import User from "../models/User.js";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync();

// user service function used to create a new user
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


// user service function used to create a new user
export async function verifyUser(data) {
  const { username, password } = data;

  try {
    const userDoc = await User.findOne({ username });

    if (userDoc == null) {
      throw Error("Not Found");
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (!passOk) {
      throw Error("Wrong Cridentials");
    }
    return userDoc;
  } catch (error) {
    throw Error(error.message);
  }
}

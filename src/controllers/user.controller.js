import { createUser, verifyUser } from "../services/user.services.js";
import { jwtTokenSign, jwtTokenVerify } from "../utils/tokenGenerator.js";

// user registration controller
export async function register_post(req, res) {
  try {
    // create new user
    res.json(await createUser(req.body));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }
}

// user login controller
export async function login(req, res) {
  try {
    // verify user credentials
    const user = await verifyUser(req.body);

    // generate jsonwebtoken
    const token = jwtTokenSign(user);

    // set user login cookies
    res.cookie("token", token).json({ username: user.username, id: user._id });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

// user profile controller
export async function profile(req, res) {
  try {
    const { token } = req.cookies;
    // decode token
    const decoded = jwtTokenVerify(token);

    res.json(decoded);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export function logout(req, res) {
  res.cookie("token", "");
  return res.json("ok");
}

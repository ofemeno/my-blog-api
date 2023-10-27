import { createUser, verifyUser } from "../services/user.services.js";
import { jwtTokenSign } from "../utils/tokenGenerator.js";

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
    res.cookies("token", token).json("ok");
  } catch (error) {
    res.status(500).json(error.message);
  }
}

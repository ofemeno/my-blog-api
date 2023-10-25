import { createUser } from "../services/user.services.js";

export async function register_post(req, res) {
  try {
    res.json(await createUser(req.body));
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "something went wrong"});
  }
}

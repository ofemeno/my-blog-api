import express from "express";
const router = express.Router();
import {
  login,
  logout,
  profile,
  register_post,
} from "../controllers/user.controller.js";

router.post("/register", register_post);
router.post("/login", login);
router.post('/logout', logout)
router.get("/profile", profile);

export default router;

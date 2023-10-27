import express from "express";
const router = express.Router();
import { login, register_post } from "../controllers/user.controller.js";

router.post("/register", register_post);
router.post("/login", login);

export default router;

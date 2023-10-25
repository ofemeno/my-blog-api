import express from "express";
const router = express.Router();
import { register_post } from "../controllers/user.controller.js";

router.post("/register", register_post);

export default router;

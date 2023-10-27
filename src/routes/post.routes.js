import express from "express";
const router = express.Router();
import multer from "multer";
const uploadMiddleware = multer({ dest: "uploads/" });
import { allPost, post } from "../controllers/post.controller.js";

router.post("/post", uploadMiddleware.single("file"), post)
router.get("/post", allPost)

export default router;

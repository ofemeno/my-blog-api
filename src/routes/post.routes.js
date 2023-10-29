import express from "express";
const router = express.Router();
import multer from "multer";
const uploadMiddleware = multer({ dest: "./uploads/" });
import { allPost, getPost, post } from "../controllers/post.controller.js";

router.post("/post", uploadMiddleware.single("file"), post)
router.get("/post", allPost)
router.get("/post/:id", getPost)

export default router;

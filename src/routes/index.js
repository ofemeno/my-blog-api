import express from "express";
import userRoutes from "./user.routes.js";
const router = express.Router();
import postRoutes from "./post.routes.js";

router.use(userRoutes);
router.use(postRoutes);

export default router;

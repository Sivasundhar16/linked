import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getFeedPost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", protectRoute, getFeedPost);
router.post("/create", protectRoute, createPost);

export default router;

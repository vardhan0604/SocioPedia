import express from "express";
import { 
    getUserPosts,
    getFeedPost,
    likePost,
 } from "../controllers/Post.js";
import { verifyToken } from "../middleware/auth.js"; 

const router=express.Router();

//READ
router.get("/feed",getFeedPost)
router.get("/:userId/posts",verifyToken,getUserPosts)

//UPDATE
router.patch("/:id/like",likePost)

export default router;
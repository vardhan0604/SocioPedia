import express from "express";
import { 
    getUser,
    getUserFriends,
    addRemovefriends,

 } from "../controllers/Users.js";
import { verifyToken } from "../middleware/auth.js"; 


const router=express.Router();

//read
router.get("/:id",getUser)
router.get("/:id/friends",getUserFriends)

//update
router.patch("/:id/:friendId",addRemovefriends)

router.post("/login",getUser);

export default router;
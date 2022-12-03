import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  findUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/find/query", verifyToken, findUser);
router.patch("/:friendId", verifyToken, addRemoveFriend);

export default router;

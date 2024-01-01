import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getUser, verifyUser, updateUser } from "../controllers/user.js";
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getUserPosts,
} from "../controllers/post.js";
const router = express.Router();

router.get("/user/:username", getUser);
router.put("/user/:id", verifyToken, updateUser);
router.get("/user/:id/post", getUserPosts);
router.post("/user/verify", verifyToken, verifyUser);
router.get("/post/:id", getPost);
router.get("/post", getAllPosts);
router.post("/post", verifyToken, createPost);
router.put("/post/:id", verifyToken, updatePost);
router.delete("/post/:id", verifyToken, deletePost);

export default router;

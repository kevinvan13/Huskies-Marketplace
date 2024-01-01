import { PrismaClient } from "@prisma/client";
import { createDeflate } from "zlib";
const prisma = new PrismaClient();

export const createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      email,
      condition,
      category,
      images,
      location,
    } = req.body;
    const authId = req.auth.payload.sub;
    const user = await prisma.user.findUnique({
      where: {
        authId,
      },
    });
    const userId = user.id;
    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        price: parseInt(price),
        email,
        condition,
        category,
        images,
        location,
        userId,
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const authId = req.auth.payload.sub;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    const user = await prisma.user.findUnique({
      where: {
        authId,
      },
    });
    if (post.userId !== user.id) {
      return res.status(403).json({ error: "Unauthorized request." });
    }
    const { title, description, price, email } = req.body;
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...post,
        title,
        description,
        price: parseInt(price),
        email,
      },
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const authId = req.auth.payload.sub;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    const user = await prisma.user.findUnique({
      where: {
        authId,
      },
    });
    if (post.userId !== user.id) {
      return res.status(403).json({ error: "Unauthorized request." });
    }
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    res.status(200).json({ message: "Post deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const posts = await prisma.post.findMany({
      where: {
        userId: id,
      },
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const category = req.query.category;
    const condition = {};
    if (category !== "") {
      condition.category = category;
    }
    const posts = await prisma.post.findMany({
      where: condition,
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

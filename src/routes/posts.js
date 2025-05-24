import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Middleware kiểm tra quyền admin
function isAdmin(req, res, next) {
  const isAdmin = req.headers["x-admin"] === "true";
  if (!isAdmin) return res.status(403).json({ error: "Forbidden: Admin only" });
  next();
}

// Middleware kiểm tra quyền user (chủ sở hữu post hoặc admin)
function isOwnerOrAdmin(req, res, next) {
  const isAdmin = req.headers["x-admin"] === "true";
  const userId = parseInt(req.headers["x-user-id"]);
  const postId = parseInt(req.params.id);
  prisma.post
    .findUnique({ where: { id: postId } })
    .then((post) => {
      if (!isAdmin && post.userId !== userId) {
        return res.status(403).json({ error: "Forbidden: Not owner or admin" });
      }
      next();
    })
    .catch((e) => res.status(400).json({ error: e.message }));
}

// Tạo post
router.post("/", isAdmin, async (req, res) => {
  const { title, content, type, userId } = req.body;
  try {
    const post = await prisma.post.create({
      data: { title, content, type, userId },
    });
    res.json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Sửa post
router.put("/:id", isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, type } = req.body;
  try {
    const post = await prisma.post.update({
      where: { id },
      data: { title, content, type },
    });
    res.json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Xóa post
router.delete("/:id", isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.post.delete({ where: { id } });
    res.json({ message: "Post deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Lấy tất cả posts
router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { user: true },
    });
    res.json(posts);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Lấy post theo ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;

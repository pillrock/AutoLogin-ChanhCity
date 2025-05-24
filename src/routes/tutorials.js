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

// Middleware kiểm tra quyền user (chủ sở hữu tutorial hoặc admin)
function isOwnerOrAdmin(req, res, next) {
  const isAdmin = req.headers["x-admin"] === "true";
  const userId = parseInt(req.headers["x-user-id"]);
  const tutorialId = parseInt(req.params.id);
  prisma.tutorial
    .findUnique({ where: { id: tutorialId } })
    .then((tutorial) => {
      if (!isAdmin && tutorial.authorId !== userId) {
        return res.status(403).json({ error: "Forbidden: Not owner or admin" });
      }
      next();
    })
    .catch((e) => res.status(400).json({ error: e.message }));
}

// Tạo tutorial
router.post("/", isAdmin, async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const tutorial = await prisma.tutorial.create({
      data: { title, content, authorId },
    });
    res.json(tutorial);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Sửa tutorial
router.put("/:id", isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  try {
    const tutorial = await prisma.tutorial.update({
      where: { id },
      data: { title, content },
    });
    res.json(tutorial);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Xóa tutorial
router.delete("/:id", isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.tutorial.delete({ where: { id } });
    res.json({ message: "Tutorial deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Lấy tất cả tutorials
router.get("/", async (req, res) => {
  try {
    const tutorials = await prisma.tutorial.findMany({
      include: { author: true },
    });
    res.json(tutorials);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Lấy tutorial theo ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const tutorial = await prisma.tutorial.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!tutorial) return res.status(404).json({ error: "Tutorial not found" });
    res.json(tutorial);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;

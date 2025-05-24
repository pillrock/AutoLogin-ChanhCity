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

// Middleware kiểm tra quyền user (chủ sở hữu profile hoặc admin)
function isAuthenticated(req, res, next) {
  const userId = req.headers["x-user-id"];
  if (!userId) return res.status(403).json({ error: "Forbidden: User only" });
  next();
}

// Tạo profile
router.post("/", isAuthenticated, async (req, res) => {
  const { fullName, CCCD, phone, roleTag, userId } = req.body;
  try {
    const profile = await prisma.profile.create({
      data: { fullName, CCCD, phone, roleTag, userId },
    });
    res.json(profile);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Sửa profile
router.put("/:userId", isAuthenticated, async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { fullName, CCCD, phone, roleTag } = req.body;
  try {
    const profile = await prisma.profile.update({
      where: { userId },
      data: { fullName, CCCD, phone, roleTag },
    });
    res.json(profile);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Lấy profile theo userId
router.get("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: { user: true },
    });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Xóa profile
router.delete("/:userId", isAdmin, async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    await prisma.profile.delete({ where: { userId } });
    res.json({ message: "Profile deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;

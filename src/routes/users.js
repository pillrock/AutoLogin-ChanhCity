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

// Tạo user
router.post("/", isAdmin, async (req, res) => {
  console.log(req.body);

  const { name, email, IDDevice } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, IDDevice },
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Sửa user
router.put("/:id", isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  console.log(data);

  try {
    const user = await prisma.user.update({ where: { id }, data });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Xóa user
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Lấy tất cả users
router.get("/", isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { profile: true, posts: true, tutorials: true },
    });
    res.json(users);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Lấy user theo ID
router.get("/:id", isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { profile: true, posts: true, tutorials: true },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Kiểm tra user theo email hoặc IDDevice
router.get("/check", async (req, res) => {
  const { email, IDDevice } = req.query;
  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ email }, { IDDevice }] },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// đặt admin cho user
router.post("/setAdmin", isAdmin, async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { isAdmin: true },
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;

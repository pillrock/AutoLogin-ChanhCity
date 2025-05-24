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

// Tạo vai trò mới
router.post("/", isAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    const role = await prisma.rolePeople.create({ data: { name } });
    res.json(role);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Lấy tất cả vai trò
router.get("/", async (req, res) => {
  try {
    const roles = await prisma.rolePeople.findMany();
    res.json(roles);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Xóa vai trò
router.delete("/:id", isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.rolePeople.delete({ where: { id } });
    res.json({ message: "Role deleted" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Gán vai trò cho profile
router.post("/assign", async (req, res) => {
  const { email, roleId } = req.body;
  try {
    // Tìm profile theo email user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.id)
      return res.status(404).json({ error: "User not found" });

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    await prisma.profile.update({
      where: { id: profile.id },
      data: {
        roleTag: { connect: { id: roleId } },
      },
    });
    res.json({ message: "Role assigned to profile" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Xóa vai trò khỏi profile
router.post("/remove", async (req, res) => {
  const { email, roleId } = req.body;
  if (!email.includes("@")) {
    email = email + "@gmail.com"; // Thêm domain mặc định nếu không có
  }
  try {
    await prisma.profile.update({
      where: { id: email },
      data: {
        roleTag: { disconnect: { id: roleId } },
      },
    });
    res.json({ message: "Role removed from profile" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Lấy tất cả vai trò của một profile
router.get("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
    if (!user || !user.profile)
      return res.status(404).json({ error: "User not found" });
    const profileId = user.profile.id;
    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      include: { roleTag: true },
    });
    res.json(profile?.roleTag || []);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;

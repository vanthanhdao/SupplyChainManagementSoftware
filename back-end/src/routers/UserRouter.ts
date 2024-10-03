// src/routes/userRoutes.ts
import express from "express";
import { getAllUsers, addUser } from "../controllers/UserController";

const router = express.Router();

// Route lấy danh sách người dùng
router.get("/users", getAllUsers);

// Route thêm người dùng mới
router.post("/users", addUser);

export default router;

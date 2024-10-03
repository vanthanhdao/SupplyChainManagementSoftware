// src/controllers/userController.ts
import { Request, Response } from "express";
import { connectDB } from "../config/db";
import sql from "mssql";
import { User } from "../models/UserModel";

// Lấy danh sách tất cả người dùng
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query("SELECT * FROM Users");
    const users: User[] = result.recordset;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Thêm người dùng mới
export const addUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const pool = await connectDB();
    await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .query(
        "INSERT INTO Users (name, email, password) VALUES (@name, @email, @password)"
      );

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
};

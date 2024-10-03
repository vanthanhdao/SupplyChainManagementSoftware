// src/index.ts
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routers/UserRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware xử lý JSON
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Bắt đầu server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import weatherRoutes from "./routes/weatherRoutes";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

import cookieParser from "cookie-parser";

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://weather-app-nine-lilac-90.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

import { errorHandler } from "./middleware/errorMiddleware";

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/weather", weatherRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

// Error Middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

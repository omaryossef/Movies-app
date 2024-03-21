import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { router } from "./routes/router.js";
import "dotenv/config.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Security enhancements
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : "https://movie-website-mqnf.onrender.com",
  })
);
app.set("trust proxy", 1);
app.use(cookieParser());

// Database connection with error handling
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch((error) => {
    console.error("Database connection failed", error);
  });

// Routes
app.get("/test", (req, res) => {
  res.send("Hello World");
});
app.use("/", router);

// Server
app.listen(PORT, () => {
  console.log(`
  Server is listening on port http://localhost:${PORT} 
  test>> http://localhost:${PORT}/test`);
});

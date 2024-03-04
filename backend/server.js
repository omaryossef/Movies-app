import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { router } from "./routes/router.js";

const app = express();
const PORT = 3000;
app.use(express());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

await mongoose.connect(
  "mongodb+srv://omar:Jww5nz3lkde8sUOA@cluster0.9krnhbb.mongodb.net/movie-app"
);

app.get("/test", (req, res) => {
  res.send("Hello World");
});
app.use("/", router);

app.listen(PORT, () =>
  console.log(
    "listening in port http://localhost:3000 test>> http://localhost:3000/test"
  )
);
//omaryossef
//

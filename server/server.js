import express from "express";
import dotenv from "dotenv";
import "dotenv/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

import errorHandler from "./middleware/errorMiddleware.js";
import cloudinary from "./config/cloudinary.js";

import indexRouter from "./routes/indexRouter.js";

import connectDB from "./config/db.js";

dotenv.config();
connectDB();

console.log("Cloudinary connected");
console.log(cloudinary.config().cloud_name);

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api", indexRouter);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
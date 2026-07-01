import express from "express";
import dotenv from "dotenv";
const app = express();

import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
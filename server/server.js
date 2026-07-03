import express from "express";
import dotenv from "dotenv";
const app = express();

import errorHandler from "./middleware/errorMiddleware.js";

import stateRouter from "./routes/stateRouter.js";
import cityRouter from "./routes/cityRouter.js";

import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/states", stateRouter);
app.use("/api/cities", cityRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import express from "express";
const router = express.Router();

import authRouter from "./authRouter.js";
import stateRouter from "./stateRouter.js";
import cityRouter from "./cityRouter.js";
import categoryRouter from "./categoryRouter.js";
import touristPlaceRouter from "./touristPlaceRouter.js";

router.use("/auth", authRouter);
router.use("/states", stateRouter);
router.use("/cities", cityRouter);
router.use("/categories", categoryRouter);
router.use("/places", touristPlaceRouter);

export default router;
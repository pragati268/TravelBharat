import express from "express";
const router = express.Router();

import { createState, getAll, getStateBySlug, updateState, deleteState } from "../controllers/stateController.js";


router.post("/create", createState);
router.get("/all", getAll);
router.get("/slug/:slug", getStateBySlug);
router.put("/update/:id", updateState);
router.delete("/delete/:id", deleteState);

export default router;
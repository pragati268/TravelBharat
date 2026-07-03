import express from "express";
const router = express.Router();

import { createState, getAll, getStateBySlug, updateState, deleteState, getCitiesByStateId } from "../controllers/stateController.js";


router.post("/", createState);
router.get("/all", getAll);
router.get("/slug/:slug", getStateBySlug);
router.put("/update/:id", updateState);
router.delete("/delete/:id", deleteState);
router.get("/:stateId/cities", getCitiesByStateId);

export default router;
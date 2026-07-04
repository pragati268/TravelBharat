import express from "express";
const router = express.Router();

import { createState, getAll, getStateBySlug, updateState, deleteState, getCitiesByStateId } from "../controllers/stateController.js";


router.post("/", createState);
router.get("/", getAll);
router.get("/:slug", getStateBySlug);
router.put("/:id", updateState);
router.delete("/:id", deleteState);
router.get("/:stateId/cities", getCitiesByStateId);

export default router;
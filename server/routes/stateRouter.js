import express from "express";
const router = express.Router();

import { createState, getAll, getStateBySlug, updateState, deleteState } from "../controllers/stateController.js";


router.post("/", createState);
router.get("/", getAll);
router.get("/:slug", getStateBySlug);
router.put("/:id", updateState);
router.delete("/:id", deleteState);


export default router;
import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
import upload from "../middleware/uploadMiddleware.js";

import { createState, getAll, getStateBySlug, updateState, deleteState } from "../controllers/stateController.js";

router.post("/", isLoggedIn, isAdmin, upload("states").single("coverImage"), createState);
router.get("/", getAll);
router.get("/:slug", getStateBySlug);
router.put("/:id", isLoggedIn, isAdmin, upload("states").single("coverImage"), updateState);
router.delete("/:id", isLoggedIn, isAdmin, deleteState);


export default router;
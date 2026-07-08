import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";

import { createCategory, getAllCategories, getCategoryBySlug, updateCategory, deleteCategory } from "../controllers/categoryController.js";

router.post("/", isLoggedIn, isAdmin, createCategory);
router.get("/", getAllCategories);
router.get("/:slug", getCategoryBySlug);
router.put("/:id", isLoggedIn, isAdmin, updateCategory);
router.delete("/:id", isLoggedIn, isAdmin, deleteCategory);

export default router;
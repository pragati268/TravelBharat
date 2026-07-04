import express from "express";
const router = express.Router();

import { createCategory, getAllCategories, getCategoryBySlug, updateCategory, deleteCategory } from "../controllers/categoryController.js";

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:slug", getCategoryBySlug);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
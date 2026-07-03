import express from "express";
const router = express.Router();

import { createCategory, getAllCategories, getCategoryBySlug, updateCategory, deleteCategory } from "../controllers/categoryController.js";

router.post("/", createCategory);
router.get("/all", getAllCategories);
router.get("/slug/:slug", getCategoryBySlug);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
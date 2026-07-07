import Category from "../models/category-model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createCategory = asyncHandler(async (req, res) => {
  const existingCategory = await Category.findOne({
    $or: [{ name: req.body.name }, { slug: req.body.slug }],
    _id: { $ne: req.body._id },
  });

  if (existingCategory) {
    return res
      .status(400)
      .json({ message: "Category with the same name or slug already exists" });
  }

  const category = await Category.create(req.body);
  res.status(201).json({ message: "Category created successfully", category });
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res
    .status(200)
    .json({ message: "Categories fetched successfully", categories });
});

export const getCategoryBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const category = await Category.findOne({ slug });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ message: "Category fetched successfully", category });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existingCategory = await Category.findOne({
    $or: [{ name: req.body.name }, { slug: req.body.slug }],
    _id: { $ne: id },
  });

  if (existingCategory) {
    const error = new Error(
      "Category with the same name or slug already exists",
    );
    error.statusCode = 409;
    throw error;
  }

  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ message: "Category updated successfully", category });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ message: "Category deleted successfully" });
});

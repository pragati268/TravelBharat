import State from "../models/state-model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createState = asyncHandler(async (req, res) => {
  const existingState = await State.findOne({
    $or: 
    [
        { name: req.body.name }, 
        { slug: req.body.slug }
    ],
    _id: { $ne: req.body._id } 
  });

  if (existingState) {
    const error = new Error("State already exists");
    error.statusCode = 409;
    throw error;
  }

  const state = await State.create(req.body);

  res.status(201).json({
    success: true,
    message: "State created successfully",
    data: state,
  });
});

export const getAll = asyncHandler(async (req, res) => {
  const states = await State.find().sort({ name: 1 });

  res.status(200).json({
    success: true,
    message: "States fetched successfully",
    data: states,
  });
});

export const getStateBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const state = await State.findOne({ slug });

  if (!state) {
    const error = new Error("State not found");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({
    success: true,
    message: "State fetched successfully",
    data: state,
  });
});

export const updateState = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const state = await State.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!state) {
    const error = new Error("State not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "State updated successfully",
    data: state,
  });
});

export const deleteState = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const state = await State.findByIdAndDelete(id);

  if (!state) {
    const error = new Error("State not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "State deleted successfully",
  });
});



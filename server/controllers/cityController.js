import mongoose from "mongoose";

import cityModel from "../models/city-model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createCity = asyncHandler(async (req, res) => {
  const state = await mongoose.model('State').findById(req.body.state);
  if (!state) {
    const error = new Error("State not found");
    error.statusCode = 404;
    throw error;
  }

  const existingCity = await cityModel.findOne({
    $or: [
        { name: req.body.name }, 
        { slug: req.body.slug }
    ],
    _id: { $ne: req.body._id },
  });

  if (existingCity) {
    const error = new Error("City already exists");
    error.statusCode = 409;
    throw error;
  }

  const city = await cityModel.create(req.body);
  res.status(201).json({
    success: true,
    message: "City created successfully",
    data: city,
  });
});

export const getAllCities = asyncHandler(async (req, res) => {
  const cities = await cityModel.find().sort({ name: 1 });
  res.status(200).json({
    success: true,
    message: "Cities fetched successfully",
    data: cities,
  });
});

export const getCityBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const city = await cityModel.findOne({ slug });
  if (!city) {
    const error = new Error("City not found");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({
    success: true,
    message: "City fetched successfully",
    data: city,
  });
});

export const updateCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const city = await cityModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!city) {
    const error = new Error("City not found");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({
    success: true,
    message: "City updated successfully",
    data: city,
  });
});

export const deleteCity = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const city = await cityModel.findByIdAndDelete(id);
  if (!city) {
    const error = new Error("City not found");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({
    success: true,
    message: "City deleted successfully",
    data: city,
  });
});

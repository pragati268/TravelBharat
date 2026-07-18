import City from "../models/city-model.js";
import State from "../models/state-model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { deleteImageFromCloudinary } from "../utils/cloudinaryHelpers.js";

export const createCity = asyncHandler(async (req, res) => {
  const state = await State.findById(req.body.state);
  if (!state) {
    const error = new Error("State not found");
    error.statusCode = 404;
    throw error;
  }

  const existingCity = await City.findOne({
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

  const cityData = { ...req.body };

  if (req.file) {
    cityData.coverImage = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  const city = await City.create(cityData);
  res.status(201).json({
    success: true,
    message: "City created successfully",
    data: city,
  });
});

export const getAllCities = asyncHandler(async (req, res) => {
  const cities = await City.find().sort({ name: 1 });
  res.status(200).json({
    success: true,
    message: "Cities fetched successfully",
    data: cities,
  });
});

export const getCityBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const city = await City.findOne({ slug }).populate("state", "name slug capital");
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

  const city = await City.findById(id);
  if (!city) {
    const error = new Error("City not found");
    error.statusCode = 404;
    throw error;
  }

  const cityData = { ...req.body };

  if (req.file) {
    if (city.coverImage?.public_id) {
      await deleteImageFromCloudinary(city.coverImage.public_id);
    }
    cityData.coverImage = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  const updatedCity = await City.findByIdAndUpdate(id, cityData, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "City updated successfully",
    data: updatedCity,
  });
});

export const deleteCity = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const city = await City.findById(id);
  if (!city) {
    const error = new Error("City not found");
    error.statusCode = 404;
    throw error;
  }

  if (city.coverImage?.public_id) {
    await deleteImageFromCloudinary(city.coverImage.public_id);
  }

  await City.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "City deleted successfully",
    data: city,
  });
});

export const getCitiesByStateId = asyncHandler(async (req, res) => {
  const { stateId } = req.params;
  const cities = await City.find({ state: stateId }).sort({ name: 1 });
  res.status(200).json({
    success: true,
    message: "Cities fetched successfully",
    data: cities,
  });
});

import mongoose from 'mongoose';

import TouristPlace from "../models/touristPlace-model.js";
import City from "../models/city-model.js";
import Category from "../models/category-model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createTouristPlace = asyncHandler(async (req, res) => {
  // Check if city exists
  const cityExists = await City.findById(req.body.city);

  if (!cityExists) {
    const error = new Error("City not found");
    error.statusCode = 404;
    throw error;
  }

  // Check if category exists
  const categoryExists = await Category.findById(req.body.category);

  if (!categoryExists) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }

  // Check duplicate slug
  const existingSlug = await TouristPlace.findOne({ slug: req.body.slug });

  if (existingSlug) {
    const error = new Error("Slug already exists");
    error.statusCode = 409;
    throw error;
  }

  // Check duplicate place in same city
  const existingPlace = await TouristPlace.findOne({
    name: req.body.name,
    city: req.body.city,
  });

  if (existingPlace) {
    const error = new Error("Tourist place already exists in this city");
    error.statusCode = 409;
    throw error;
  }

  // Create tourist place
  const touristPlace = await TouristPlace.create(req.body);

  res.status(201).json({
    success: true,
    message: "Tourist place created successfully",
    data: touristPlace,
  });
});

export const getAllTouristPlaces = asyncHandler(async (req, res) => {

    const touristPlaces = await TouristPlace.find()
        .populate({
            path: "city",
            populate: {
                path: "state"
            }
        })
        .populate("category")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        message: "Tourist places fetched successfully",
        count: touristPlaces.length,
        data: touristPlaces,
    });

});

export const getTouristPlaceBySlug = asyncHandler(async (req, res) => {

    const touristPlace = await TouristPlace.findOne({
        slug: req.params.slug
    })
    .populate({
        path: "city",
        select: "name slug",
        populate: {
            path: "state",
            select: "name slug"
        }
    })
    .populate({
        path: "category",
        select: "name slug"
    });

    if (!touristPlace) {
        const error = new Error("Tourist place not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({
        success: true,
        message: "Tourist place fetched successfully",
        data: touristPlace
    });

});

export const deleteTouristPlace = asyncHandler(async (req, res) => {

    const touristPlace = await TouristPlace.findByIdAndDelete(req.params.id);

    if (!touristPlace) {
        const error = new Error("Tourist place not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json({
        success: true,
        message: "Tourist place deleted successfully",
    });

});
import TouristPlace from "../models/touristPlace-model.js";
import City from "../models/city-model.js";
import Category from "../models/category-model.js";
import State from "../models/state-model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { deleteImageFromCloudinary, deleteMultipleImages } from "../utils/cloudinaryHelpers.js";

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

  const placeData = { ...req.body };

  if (req.files) {
    if (req.files.coverImage) {
      placeData.coverImage = {
        url: req.files.coverImage[0].path,
        public_id: req.files.coverImage[0].filename,
      };
    }

    if (req.files.gallery) {
      placeData.gallery = req.files.gallery.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }
  }

  // Create tourist place
  const touristPlace = await TouristPlace.create(placeData);

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
      select: "name slug",
      populate: {
        path: "state",
        select: "name slug",
      },
    })
    .populate({
      path: "category",
      select: "name slug",
    })
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json({
    success: true,
    message: "Tourist places fetched successfully",
    count: touristPlaces.length,
    data: touristPlaces,
  });

});

export const getTouristPlaceBySlug = asyncHandler(async (req, res) => {
  const touristPlace = await TouristPlace.findOne({
    slug: req.params.slug,
  })
    .populate({
      path: "city",
      select: "name slug",
      populate: {
        path: "state",
        select: "name slug",
      },
    })
    .populate({
      path: "category",
      select: "name slug",
    });

  if (!touristPlace) {
    const error = new Error("Tourist place not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Tourist place fetched successfully",
    data: touristPlace,
  });
});

export const updateTouristPlace = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const touristPlace = await TouristPlace.findById(id);
  if (!touristPlace) {
    const error = new Error("Tourist place not found");
    error.statusCode = 404;
    throw error;
  }

  // Check city
  if (req.body.city) {
    const city = await City.findById(req.body.city);

    if (!city) {
      const error = new Error("City not found");
      error.statusCode = 404;
      throw error;
    }
  }

  // Check category
  if (req.body.category) {
    const category = await Category.findById(req.body.category);

    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }
  }

  // Duplicate slug
  if (req.body.slug) {
    const existingSlug = await TouristPlace.findOne({
      slug: req.body.slug,
      _id: { $ne: id },
    });

    if (existingSlug) {
      const error = new Error("Slug already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  // Duplicate name inside same city
  if (req.body.name && req.body.city) {

    const existingPlace = await TouristPlace.findOne({
      name: req.body.name,
      city: req.body.city,
      _id: { $ne: id },
    });

    if (existingPlace) {
      const error = new Error("Tourist place already exists in this city");
      error.statusCode = 409;
      throw error;
    }

  }

  const placeData = { ...req.body };

  if (req.files) {
    if (req.files.coverImage) {
      if (touristPlace.coverImage?.public_id) {
        await deleteImageFromCloudinary(touristPlace.coverImage.public_id);
      }
      placeData.coverImage = {
        url: req.files.coverImage[0].path,
        public_id: req.files.coverImage[0].filename,
      };
    }

    if (req.files.gallery) {
      const oldPublicIds = touristPlace.gallery
        .filter((img) => img?.public_id)
        .map((img) => img.public_id);
      if (oldPublicIds.length > 0) {
        await deleteMultipleImages(oldPublicIds);
      }
      placeData.gallery = req.files.gallery.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }
  }

  const updatedPlace = await TouristPlace.findByIdAndUpdate(
    id,
    placeData,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Tourist place updated successfully",
    data: updatedPlace,
  });

});

export const deleteTouristPlace = asyncHandler(async (req, res) => {
  const touristPlace = await TouristPlace.findById(req.params.id);

  if (!touristPlace) {
    const error = new Error("Tourist place not found");
    error.statusCode = 404;
    throw error;
  }

  if (touristPlace.coverImage?.public_id) {
    await deleteImageFromCloudinary(touristPlace.coverImage.public_id);
  }

  const galleryPublicIds = touristPlace.gallery
    .filter((img) => img?.public_id)
    .map((img) => img.public_id);
  if (galleryPublicIds.length > 0) {
    await deleteMultipleImages(galleryPublicIds);
  }

  await TouristPlace.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Tourist place deleted successfully",
  });
});

export const searchTouristPlaces = asyncHandler(async (req, res) => {

  const { q } = req.query;

  if (!q) {
    const error = new Error("Search query is required");
    error.statusCode = 400;
    throw error;
  }

  const touristPlaces = await TouristPlace.find({
    $or: [
      {
        name: {
          $regex: q,
          $options: "i",
        },
      },
      {
        shortDescription: {
          $regex: q,
          $options: "i",
        },
      },
    ],
  })
    .populate({
      path: "category",
      select: "name slug",
    })
    .populate({
      path: "city",
      select: "name slug",
      populate: {
        path: "state",
        select: "name slug",
      },
    })
    .lean();

  res.status(200).json({
    success: true,
    message: "Search completed successfully",
    count: touristPlaces.length,
    data: touristPlaces,
  });

});

export const getFeaturedTouristPlaces = asyncHandler(async (req, res) => {

  const touristPlaces = await TouristPlace.find({
    featured: true,
  })
    .populate({
      path: "category",
      select: "name slug",
    })
    .populate({
      path: "city",
      select: "name slug",
      populate: {
        path: "state",
        select: "name slug",
      },
    })
    .lean();

  res.status(200).json({
    success: true,
    message: "Featured tourist places fetched successfully",
    count: touristPlaces.length,
    data: touristPlaces,
  });

});

export const getUNESCOTouristPlaces = asyncHandler(async (req, res) => {

  const touristPlaces = await TouristPlace.find({
    isUNESCO: true,
  })
    .populate({
      path: "category",
      select: "name slug",
    })
    .populate({
      path: "city",
      select: "name slug",
      populate: {
        path: "state",
        select: "name slug",
      },
    })
    .lean();

  res.status(200).json({
    success: true,
    message: "UNESCO tourist places fetched successfully",
    count: touristPlaces.length,
    data: touristPlaces,
  });

});

export const getTouristPlacesByCategory = asyncHandler(async (req, res) => {

  const touristPlaces = await TouristPlace.find({
    category: req.params.categoryId,
  })
    .populate({
      path: "category",
      select: "name slug",
    })
    .populate({
      path: "city",
      select: "name slug",
      populate: {
        path: "state",
        select: "name slug",
      },
    })
    .lean();

  res.status(200).json({
    success: true,
    message: "Tourist places fetched successfully",
    count: touristPlaces.length,
    data: touristPlaces,
  });

});

export const getTouristPlacesByCity = asyncHandler(async (req, res) => {

  const { cityId } = req.params;

  const city = await City.findById(cityId);

  if (!city) {
    const error = new Error("City not found");
    error.statusCode = 404;
    throw error;
  }

  const touristPlaces = await TouristPlace.find({
    city: cityId,
  })
    .populate({
      path: "category",
      select: "name slug",
    })
    .populate({
      path: "city",
      select: "name slug",
      populate: {
        path: "state",
        select: "name slug",
      },
    })
    .lean();

  res.status(200).json({
    success: true,
    message: "Tourist places fetched successfully",
    count: touristPlaces.length,
    data: touristPlaces,
  });

});

export const getTouristPlacesByState = asyncHandler(async (req, res) => {

  const { stateId } = req.params;

  const state = await State.findById(stateId);

  if (!state) {
    const error = new Error("State not found");
    error.statusCode = 404;
    throw error;
  }

  const cities = await City.find({ state: stateId });

  const cityIds = cities.map((city) => city._id);

  const touristPlaces = await TouristPlace.find({
    city: { $in: cityIds },
  })
    .populate({
      path: "category",
      select: "name slug",
    })
    .populate({
      path: "city",
      select: "name slug",
      populate: {
        path: "state",
        select: "name slug",
      },
    })
    .lean();

  res.status(200).json({
    success: true,
    message: "Tourist places fetched successfully",
    count: touristPlaces.length,
    data: touristPlaces,
  });

});

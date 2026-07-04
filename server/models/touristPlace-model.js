import mongoose from "mongoose";

const touristPlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  shortDescription: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  history: {
    type: String,
  },

  bestTimeToVisit: {
    type: String,
  },

  entryFee: {
    type: String,
  },

  timings: {
    type: String,
  },

  status: {
    type: String,
    enum: ["Open", "Temporarily Closed", "Closed"],
    default: "Open"
  },

  location: {
    type: String,
    required: true,
  },

  coverImage: {
    type: String,
  },

  gallery: [
    {
      type: String,
    },
  ],

  featured: {
    type: Boolean,
    default: false,
  },

  isUNESCO: {
    type: Boolean,
    default: false,
  },

}, {timestamps: true});

const TouristPlace = mongoose.model("TouristPlace", touristPlaceSchema);
export default TouristPlace;

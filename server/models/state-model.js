import mongoose from 'mongoose';
import { imageSchema } from './city-model.js';  

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  coverImage: imageSchema,

  capital: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    // required: true,
  },

  slug: {
    type: String,
    // required: true,
    unique: true,
    lowercase: true,
  },

  tourismTagline: {
    type: String,
    // required: true,
  },

  bestTimeToVisit: {
    type: String,
    // required: true,
  },

  climate: {
    type: String,
    // required: true,
  },

  averageTemperature: {
    type: String,
    // required: true,
  },

  population: {
    type: String,
    // required: true,
  },

  area: {
    type: String,
    // required: true,
  },

  featured: {
    type: Boolean,
    default: false,
  },

}, { timestamps: true });

const State = mongoose.model('State', stateSchema);
export default State;
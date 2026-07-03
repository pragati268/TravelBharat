import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },  

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    bestTimeToVisit: {
        type: String,
        trim: true,
    },

    climate: {
        type: String,
        trim: true,
    },

    averageTemperature: {
        type: String,
        trim: true,
    },

    coverImage: {
        type: String,
        trim: true,
        default: "",
    },

    featured: {
        type: Boolean,
        default: false,
    },

    isPopular: {
        type: Boolean,
        default: false,
    },

}, {timestamps: true});

const City = mongoose.model('City', citySchema);
export default City;



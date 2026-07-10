import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
}, { _id: false });

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

    coverImage: imageSchema,

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
export { imageSchema };

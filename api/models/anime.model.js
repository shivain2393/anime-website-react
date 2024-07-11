import mongoose from "mongoose";

const animeSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
    },

    description : {
        type: String,
        required: true
    },

    genre : {
        type: [String],
        required: true
    },

    releaseDate: {
        type: Date
    },

    coverImage: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        min: 0,
        max: 10
    },

    status: {
        type: String,
        enum: ['ongoing', 'completed'],
    }   

}, {timestamps: true})


export const Anime = mongoose.model('anime', animeSchema);
const {model,Schema} = require("mongoose")

const moviesGhostSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    director:{
        type:String,
        required:true,
    },
    release_date:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    poster_image:{
        type:String,
        required:true,
    }

},{timestamps:true});

const GhostMovies = model("GhostMovies",moviesGhostSchema);

module.exports = GhostMovies;


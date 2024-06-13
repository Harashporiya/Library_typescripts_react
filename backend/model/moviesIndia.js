const {model,Schema} = require("mongoose")

const moviesIndiaSchema = new Schema({
    Title:{
        type:String,
        required:true,
    },
    Director:{
        type:String,
        required:true,
    },
    Release_Date:{
        type:String,
        required:true,
    },
    Rating:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true,
    },
    Poster_Image:{
        type:String,
        required:true,
    }

},{timestamps:true});

const IndiaMovies = model("IndiaMovies",moviesIndiaSchema);

module.exports = IndiaMovies;


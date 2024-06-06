const {model, Schema} = require("mongoose")
const librarySchema = new Schema({
    bookName:{
        type:String,
        required:true,
    },
    authorName:{
        type:String,
        required:true,
    },
    bookImageURL:{
        type: String,
       required:false,
    },
},{timestamps:true});


const Library = model("Library", librarySchema);
module.exports = Library;
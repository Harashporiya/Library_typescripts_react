const Router = require("express")
const router = Router();
const IndiaMovies = require("../model/moviesIndia");

router.post("/add/india",async(req,res)=>{
    try{
        const {Title, Director,Release_Date,Rating,Description,Poster_Image} = req.body;

        const india = await IndiaMovies.create({
            Title:Title, 
            Director:Director,
            Release_Date:Release_Date,
            Rating:Rating,
            Description:Description,
            Poster_Image:Poster_Image,
        })
        return res.status(201).json(india)
    }catch(error){
         return res.status(500).json({Error:"Interval Server Error",error})
    }
})

router.get("/india/all",async(req,res)=>{
    try{
        const Movies = await IndiaMovies.find({});
        return res.status(200).json(Movies);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
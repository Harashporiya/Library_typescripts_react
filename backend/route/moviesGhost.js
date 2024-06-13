const Router = require("express")
const router = Router();
const GhostMovies = require("../model/movieshollwods");

router.post("/add/ghost",async(req,res)=>{
    try{
        const {title, director,release_date,rating,description,poster_image} = req.body;

        const india = await GhostMovies.create({
            title:title, 
            director:director,
            release_date:release_date,
            rating:rating,
            description:description,
            poster_image:poster_image,
        })
        return res.status(201).json(india)
    }catch(error){
         return res.status(500).json({Error:"Interval Server Error",error})
    }
})

router.get("/ghost/all",async(req,res)=>{
    try{
        const Movies = await GhostMovies.find({});
        return res.status(200).json(Movies);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
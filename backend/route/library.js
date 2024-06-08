const express = require("express");
const router = express.Router();
const Library = require("../model/library");

router.post("/add-new", async (req, res) => {
    try {
        const { bookName, authorName, bookImageURL } = req.body;
        const bookCreate = await Library.create({
            bookName: bookName,
            authorName: authorName,
            bookImageURL: bookImageURL,
        });
        // console.log(bookCreate);
        return res.status(201).json(bookCreate);
    } catch (error) {
        // console.error(error);  
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/book/all", async(req,res)=>{
    try{
        const books = await Library.find({});
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
})


router.delete("/delete/:id",async(req,res)=>{
    try{
        const book = await Library.findByIdAndDelete(req.params.id);
        if(!book){
            return res.status(404).json({error:"Not Found!"})
        }
        return res.status(204).end();
    }catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
})

module.exports = router;

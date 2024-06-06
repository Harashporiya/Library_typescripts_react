const express = require("express");
const app = express();
const PORT = 7000;
const mongoose = require("mongoose")
const router = require("./route/user")
const User = require("./model/user")
const bookRouter = require("./route/library")
const cors = require("cors")
mongoose.connect("mongodb://127.0.0.1:27017/Library").
then(()=>console.log("MongoDB Connected"))

app.get("/user",async(req,res)=>{
    return res.send("harash")
})
app.use(cors());
app.use(express.json())
app.use("/user",router);
app.use("/book", bookRouter);
app.listen(PORT,()=>console.log(`Server Started At PORT: ${PORT}`))
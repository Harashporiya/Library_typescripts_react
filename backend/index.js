const express = require("express");
const app = express();
const PORT = 7000;
const mongoose = require("mongoose")
const router = require("./route/user")
const User = require("./model/user")
const bookRouter = require("./route/library")
const cors = require("cors")
const secretkey = "qwertyuioplkjhgfdsazxcvbnm";
const jwt = require("jsonwebtoken")


mongoose.connect("mongodb://127.0.0.1:27017/Library").
then(()=>console.log("MongoDB Connected"))


app.get("/data", async(req,res)=>{
    const token = req.headers.authorization
    // console.log(token)
    if(!token){
        return res.status(401).json({ error: "Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token,secretkey);
        const{name,email} = await User.findOne({_id:decoded.userId})
        res.json({ email: email, name, })
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
})


app.use(cors());
app.use(express.json())
app.use("/user",router);
app.use("/book", bookRouter);
app.listen(PORT,()=>console.log(`Server Started At PORT: ${PORT}`))
const Router = require("express");
const router = Router();
const User = require("../model/user");
const bcyrpt = require("bcryptjs")
const secretkey = "qwertyuioplkjhgfdsazxcvbnm";
const jwt = require("jsonwebtoken")

router.post("/signup", async(req,res)=>{
    const {name, email, password} = req.body;
    try{
        const hashPassword=await bcyrpt.hash(password,10);
        const userCreate = await User.create({
            name:name,
            email:email,
            password:hashPassword,
        })
        const token = jwt.sign({user_id:userCreate._id,},secretkey,{expiresIn:"5d"})
        return res.status(200).json({userCreate,token,message:"Signup Successfully"})

    }catch(error){
        return res.json({message:`Error Creating account ${error}`})
        
    }
})

router.post("/login", async(req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                error:"Invalid username and password",
            })
        }
        const isPasswordValid = await bcyrpt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({error:"Invalid email or password"})
        }

        const token = jwt.sign({userId:user._id},secretkey,{expiresIn:"5d"});

        return res.status(201).json({token,user, message: "Logged In Successfully" });
    }catch(error){
        return res.json({message: "Error during login :" + error.message})
    }
})

module.exports = router;
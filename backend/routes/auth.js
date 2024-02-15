const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Sign Up
router.post("/signup" , async(req,res)=>{
    try {
        const {username,email} = req.body;

        const user = await User.findOne({email});
        if(user){
            res.status(500).json("Account Already Exists! Login Instead");
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hashSync(req.body.password,salt);

            const newUser = new User({username,email,password:hashedPassword});
            const savedUser = await newUser.save();
            const {password, ...userInfoExceptPassword} = savedUser._doc;
            res.status(200).json(userInfoExceptPassword);
        }
    } 
    catch (err) {
        res.status(500).json(err);
    }
})

//Login
router.post("/login" , async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            res.status(404).json("User Not Found");
            return;
        }
        const matchPass = await bcrypt.compare(req.body.password, user.password);
        if(!matchPass){
            res.status(401).json("Wrong Credentials");
            return;
        }
        const token = jwt.sign({_id:user._id,username:user.username,email:user.email}, process.env.SECRETKEY, {expiresIn:"1d"});

        const {password, ...userInfoExceptPassword} = user._doc;
        res.cookie("token",token,{httpOnly:true, 
                                    secure:true, 
                                    sameSite:'None',
                                })
        res.status(200).json(userInfoExceptPassword);
    } 
    catch (err) {
        console.log("here");
        res.status(500).json(err);
    }
})

//Logout
router.get("/logout" , async(req,res)=>{
    try {
        res.clearCookie("token", {sameSite:"none", secure:true}).status(200).json("Logged Out!")
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//On Refresh
router.get("/refresh",(req,res)=>{
    let token = req.header("cookie");
    if (token.startsWith("token=")) {
        token = token.slice(6, token.length).trimLeft();
    }
    jwt.verify(token, process.env.SECRETKEY, {}, async(err,data)=>{
        if(err){
            return res.status(404).json(err);
        }
        res.status(200).json(data);
    })
})


module.exports = router;
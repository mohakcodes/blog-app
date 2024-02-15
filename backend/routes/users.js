const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User.js");
const Post = require("../models/Post.js");
const Comment = require("../models/Comment.js");

const verifyToken = require("../verifyToken.js");

const router = express.Router();

//Update
router.put("/:id", verifyToken, async(req,res)=>{
    try {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hashSync(req.body.password, salt);
        }    
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true});
        res.status(200).json(updatedUser);
    } 
    catch (err) {
        res.status(500).json(err);
    }
})

//Delete
router.delete("/:id", verifyToken, async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        await Post.deleteMany({userId:req.params.id});
        await Comment.deleteMany({userId:req.params.id});
        res.status(200).json("User Has Been Deleted");
    } 
    catch (err) {
        res.status(500).json(err);
    }
})

//Get User
router.get("/:id", async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {password, ...userInfoExceptPassword} = user._doc;
        res.status(200).json(userInfoExceptPassword);
    } 
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;